import React, { useEffect, useState } from "react";
import Electionabi from "../../contracts/Election.json";
import { MDBDataTable } from "mdbreact";
import Navbar from "../Layouts/Navbar";
import "../../screens/Voter/voterDashboard.css";
import EditCandidate from "./EditCandidate";
import { Link } from "react-router-dom";
import { RiDashboardLine, RiQuestionnaireFill } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import NotFound from "../Layouts/NotFound";
import { FaClipboardList } from "react-icons/fa";
import Web3 from "web3";

const ManageCandidates = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [electionContract, setElectionContract] = useState(null);
  const [editCandidate, setEditCandidate] = useState(false);
  const [editCandidateObj, setEditCandidateObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };
    initialize();
  }, []);

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        throw new Error(
          "Non-Ethereum browser detected. Please install MetaMask."
        );
      }
    } catch (err) {
      setError(err.message);
      console.error("Web3 initialization failed:", err);
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    setError(null);
    try {
      const web3 = window.web3;
      if (!web3) throw new Error("Web3 not initialized.");

      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0] || "");

      const networkId = await web3.eth.net.getId();
      const networkData = Electionabi.networks[networkId];

      if (!networkData) {
        throw new Error("Smart contract not deployed on the current network.");
      }

      const election = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      setElectionContract(election);

      const totalCandidates = await election.methods.candidatesCount().call();
      const candidateList = [];

      for (let i = 1; i <= totalCandidates; i++) {
        const candidate = await election.methods.candidates(i).call();
        candidateList.push({
          id: candidate.id,
          name: candidate.name,
          votecount: candidate.votecount,
          party: candidate.party,
          citizenshipNo: candidate.citizenshipNo,
          dob: candidate.dob,
          img: candidate.img,
          email: candidate.email,
        });
      }

      setCandidates(candidateList);
    } catch (err) {
      setError(err.message || "Failed to load blockchain data.");
      console.error("Error loading blockchain data:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCandidates = async (id) => {
    setLoading(true);
    setError(null);
    try {
      if (!electionContract)
        throw new Error("Election contract not initialized.");
      await electionContract.methods
        .delCandidates(id)
        .send({ from: currentAccount })
        .on("transactionHash", () => {
          console.log("Successfully deleted candidate:", id);
          window.location.reload();
        });
    } catch (err) {
      setError("Failed to delete candidate.");
      console.error("Error deleting candidate:", err);
    } finally {
      setLoading(false);
    }
  };

  const editCandidates = async (id, name, party, citizenshipNo, dob, email) => {
    setLoading(true);
    setError(null);
    try {
      if (!electionContract)
        throw new Error("Election contract not initialized.");
      await electionContract.methods
        .editCandidates(id, name, party, citizenshipNo, dob, email)
        .send({ from: currentAccount })
        .on("transactionHash", () => {
          console.log("Successfully edited candidate:", id);
          setEditCandidate(false);
          window.location.reload();
        });
    } catch (err) {
      setError("Failed to edit candidate.");
      console.error("Error editing candidate:", err);
    } finally {
      setLoading(false);
    }
  };

  const editHandler = (candidate = {}) => {
    setEditCandidate(true);
    setEditCandidateObj(candidate);
  };

  const candidateData = () => ({
    columns: [
      { label: "Candidate Id", field: "id", sort: "asc", width: 50 },
      { label: "Name", field: "name", sort: "asc", width: 100 },
      { label: "Email", field: "email", sort: "asc", width: 150 },
      { label: "Citizenship No.", field: "citizenno", sort: "asc", width: 100 },
      { label: "Party", field: "party", sort: "asc", width: 50 },
      { label: "DOB", field: "dob", sort: "asc", width: 100 },
      { label: "Actions", field: "actions", sort: false },
    ],
    rows: candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      citizenno: candidate.citizenshipNo,
      party: candidate.party,
      dob: candidate.dob,
      actions: (
        <>
          <button
            className="btn btn-success mx-1"
            onClick={() => editHandler(candidate)}
            disabled={loading}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteCandidates(candidate.id)}
            disabled={loading}
          >
            Del
          </button>
        </>
      ),
    })),
  });

  return (
    <div>
      <Navbar />
      <div className="row dashboard-container">
        {/* Sidebar */}
        <div className="sidebar col-12 col-lg-3 col-md-5 col-sm-6">
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/admin/dashboard" className="link d-block">
                <RiDashboardLine />
                <span className="mx-3 py-2">Dashboard</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/admin/addCandidate" className="link d-block">
                <AiFillFileAdd />
                <span className="mx-3 py-2">Add Candidate</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/admin/manageCandidates" className="link d-block">
                <FaUserEdit />
                <span className="mx-3 py-2">Manage Candidate</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/admin/chatbotManager" className="link d-block">
                <RiQuestionnaireFill />
                <span className="mx-3 py-2">Manage Chatbot Questions</span>
              </Link>
            </div>
          </div>

          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/admin/manifesto" className="link d-block">
                <FaClipboardList />
                <span className="mx-3 py-2">Manage Manifestos</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="dashboard col-12 col-lg-9 col-md-7 col-sm-6 p-0">
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading candidates...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger m-4" role="alert">
              {error}
            </div>
          ) : currentAccount ? (
            editCandidate ? (
              <EditCandidate
                candidate={editCandidateObj}
                editFunction={editCandidates}
                onCancel={() => setEditCandidate(false)}
              />
            ) : (
              <div className="row m-4 py-2 overflow-hidden">
                <h1>CANDIDATES LIST</h1>
                <hr />
                {candidates.length === 0 ? (
                  <p>No candidates found.</p>
                ) : (
                  <MDBDataTable striped data={candidateData()} />
                )}
              </div>
            )
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCandidates;
