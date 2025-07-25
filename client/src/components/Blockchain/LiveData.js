import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Web3 from "web3";
import Electionabi from "../../contracts/Election.json";
import Navbar from "../../screens/Admin/Navbar";
import {
  AccountInfo,
  LiveContainer,
  AccountInfoBtn,
  Wrapper,
  Header,
  PageTitle,
  HeaderButtons,
  ButtonsContainer,
  FirstRow,
  LongColumn,
  ShortColumn,
  SecondRow,
  LastFetech,
  LastRow,
  SectionTitle,
  BarGraphContainer,
  Card,
  CardImg,
  CardText,
  CardsContainer,
  LeadingSectionContainer,
  LineCardContainer,
} from "./LiveDataElements";
import PieChart from "../../screens/Voter/Voter-Components/PieChart";
import BarGraph from "../../screens/Voter/Voter-Components/BarGraph";
import LineChart from "../../screens/Voter/Voter-Components/LineChart";

const LiveData = () => {
  const navigate = useNavigate();

  const [currentaccount, setCurrentAccount] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask.");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      const totalCandidates = await election.methods.candidatesCount().call();
      const loadedCandidates = [];

      for (let i = 1; i <= totalCandidates; i++) {
        const data = await election.methods.candidates(i).call();
        loadedCandidates.push(data);
      }

      setCandidates(loadedCandidates);
    } else {
      alert("Smart contract not deployed to current network.");
    }
  };

  const presentAccount = currentaccount
    ? `${currentaccount.slice(0, 6)}....${currentaccount.slice(-5)}`
    : "";

  const sortedCandidates = [...candidates].sort(
    (a, b) => Number(b.votecount) - Number(a.votecount)
  );

  const now = new Date();
  const dateTime = `${now.getFullYear()}/${
    now.getMonth() + 1
  }/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  const fetchDataHandler = () => {
    window.location.reload();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <AccountInfoBtn onClick={fetchDataHandler}>
        <AccountInfo>Current Account: {presentAccount}</AccountInfo>
      </AccountInfoBtn>
      <LiveContainer>
        <Wrapper>
          <Header>
            <PageTitle>View Realtime Results</PageTitle>
            <ButtonsContainer>
              <HeaderButtons onClick={fetchDataHandler}>
                Fetch Latest Data
              </HeaderButtons>
              <HeaderButtons onClick={goBack}>Go Back</HeaderButtons>
            </ButtonsContainer>
          </Header>

          <FirstRow>
            <ShortColumn>
              <SectionTitle>Doughnut Chart</SectionTitle>
              <PieChart candidates={candidates} />
            </ShortColumn>
            <LongColumn>
              <SectionTitle>Bar Graph</SectionTitle>
              <BarGraphContainer>
                <BarGraph candidates={candidates} />
              </BarGraphContainer>
            </LongColumn>
          </FirstRow>

          <SecondRow>
            <LastFetech>Last Update: {dateTime}</LastFetech>
          </SecondRow>

          <LastRow>
            <LongColumn>
              <SectionTitle>Top 3 Candidates</SectionTitle>
              <CardsContainer>
                {[0, 1, 2].map(
                  (i) =>
                    sortedCandidates[i] && (
                      <Card key={i}>
                        <CardImg src={sortedCandidates[i].img} alt="no-img" />
                        <CardText>
                          <p>Name: {sortedCandidates[i].name}</p>
                          <p>Party: {sortedCandidates[i].party}</p>
                          <p>Vote Count: {sortedCandidates[i].votecount}</p>
                          <p>DOB: {sortedCandidates[i].dob}</p>
                        </CardText>
                      </Card>
                    )
                )}
              </CardsContainer>
            </LongColumn>
            <ShortColumn>
              <LeadingSectionContainer>
                <SectionTitle>Leading Party</SectionTitle>
                <LineCardContainer>
                  <LineChart candidates={candidates} />
                </LineCardContainer>
              </LeadingSectionContainer>
            </ShortColumn>
          </LastRow>
        </Wrapper>
      </LiveContainer>
    </>
  );
};

export default LiveData;
