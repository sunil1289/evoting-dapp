import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Electionabi from "../../contracts/Election.json";
import Navbar from "./Navbar";
import Body from "./Body";
import "./body.css";

const Web3 = require("web3");

const Vote = () => {
  const navigate = useNavigate();

  useEffect(() => {
    loadWeb3();
    LoadBlockchaindata();
  }, []);

  const [currentaccount, setcurrentaccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [Electionsm, SetElectionsm] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum Browser Detected. Please install MetaMask");
    }
  };

  const LoadBlockchaindata = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setcurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      const totalCandidates = await election.methods.candidatesCount().call();
      let candidate = [];
      for (let i = 1; i <= totalCandidates; i++) {
        const { id, name, votecount, party, citizenshipNo, dob, img, email } =
          await election.methods.candidates(i).call();
        candidate[i - 1] = {
          id,
          name,
          votecount,
          party,
          citizenshipNo,
          dob,
          img,
          email,
        };
      }
      setCandidates(candidate);
      SetElectionsm(election);
    } else {
      window.alert("The smart contract is not deployed in the current network");
    }
  };

  const votecandidate = async (candidateid) => {
    try {
      await Electionsm.methods
        .Vote(candidateid)
        .send({ from: currentaccount })
        .on("transactionhash", () => {
          console.log("Vote submitted successfully.");
        });
      window.location.reload();
    } catch (error) {
      console.error("Vote error:", error);
      if (
        error?.message?.includes("revert") &&
        error?.message?.toLowerCase().includes("already voted")
      ) {
        alert("!! You have already voted.");
      } else {
        alert("!! Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="vote-container">
      <Navbar
        account={currentaccount}
        onBack={() => navigate("/voter/dashboard")}
      />
      <Body candidates={candidates} voteCandidate={votecandidate} />
    </div>
  );
};

export default Vote;
