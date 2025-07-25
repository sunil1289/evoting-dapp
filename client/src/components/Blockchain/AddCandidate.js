import React, { useEffect, useState, useRef } from "react";
import {
  BodyContainer,
  FormWrap,
  InputGroupContainer,
  InputGroup,
  FormLabel,
  InputField,
  SubmitButton,
} from "./AddCandidateElements";
import "../../styles/AddCandidate.css";
import Navbar from "../Layouts/Navbar";
import Electionabi from "../../contracts/Election.json";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";

import { RiDashboardLine, RiQuestionnaireFill } from "react-icons/ri";
import { AiFillFileAdd } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Web3 = require("web3");

const AddCandidate = () => {
  const [currentaccount, setCurrentAccount] = useState("");
  const [electionContract, setElectionContract] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageurl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [candidateDOB, setCandidateDOB] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateLocation, setCandidateLocation] = useState("");
  const [candidateCitizenNo, setCandidateCitizenNo] = useState("");
  const [candidatePhoneNo, setCandidatePhoneNo] = useState("");

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.alert("Non-Ethereum browser detected. Please install MetaMask.");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setCurrentAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkId];

    if (networkData) {
      const contract = new web3.eth.Contract(
        Electionabi.abi,
        networkData.address
      );
      setElectionContract(contract);
    } else {
      alert("Smart contract not deployed to detected network.");
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };
    init();
  }, []);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Uploads");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dynbrzezs/image/upload",
          formData
        );
        setImageUrl(res.data.url);
      } catch (err) {
        console.error("Cloudinary upload error:", err);
      }
    };

    uploadImage();

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const addCandidateToBlockchain = async () => {
    try {
      const transaction = await electionContract.methods
        .addCandidates(
          candidateName,
          candidateParty,
          candidateCitizenNo,
          candidateDOB,
          imageurl,
          candidateEmail
        )
        .send({ from: currentaccount });
      return transaction;
    } catch (err) {
      console.error("Blockchain error:", err);
      throw err;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(candidateEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(candidatePhoneNo)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    if (!candidateDOB) {
      alert("Please select a valid date of birth.");
      return;
    }

    const backendURL = "http://localhost:4000/api/candidate/register";
    const formData = new FormData();
    formData.append("name", candidateName);
    formData.append("email", candidateEmail);
    formData.append("location", candidateLocation);
    formData.append("citizenship_no", candidateCitizenNo);
    formData.append("phone_No", candidatePhoneNo);
    formData.append("photo", imageurl);

    try {
      await addCandidateToBlockchain();
      setSuccessMessage("New candidate added");

      await axios.post(backendURL, formData);
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Submit Error:", error);
      setSuccessMessage("Failed to add candidate");
    }
  };

  const presentAccount =
    currentaccount &&
    `${currentaccount.slice(0, 6)}....${currentaccount.slice(-4)}`;

  return (
    <>
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

        {/* Main Content */}
        <div className="col-12 col-lg-9 col-md-7 col-sm-6">
          <BodyContainer>
            <FormWrap onSubmit={handleSubmit}>
              <h3 className="pt-2">New Candidate</h3>
              {successMessage && (
                <div
                  className={`alert ${
                    successMessage === "New candidate added"
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
                  {successMessage}
                </div>
              )}
              <FormLabel htmlFor="candidate-photo">Photo</FormLabel>
              {preview ? (
                <div className="image-preview-wrapper">
                  <img src={preview} className="preview-img" alt="Candidate" />
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                      setImageUrl("");
                      fileInputRef.current.value = null;
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <button
                  className="img-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  Browse
                </button>
              )}

              <input
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith("image/")) {
                    setImage(file);
                  } else {
                    alert("Please select a valid image file.");
                    setImage(null);
                  }
                }}
                required
              />

              <InputGroupContainer>
                <InputGroup>
                  <FormLabel>Name</FormLabel>
                  <InputField
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    required
                  />
                  <FormLabel>Party</FormLabel>
                  <InputField
                    value={candidateParty}
                    onChange={(e) => setCandidateParty(e.target.value)}
                    required
                  />
                  <FormLabel>Email</FormLabel>
                  <InputField
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    required
                  />
                  <FormLabel>Citizenship Number</FormLabel>
                  <InputField
                    value={candidateCitizenNo}
                    onChange={(e) => setCandidateCitizenNo(e.target.value)}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <FormLabel>Date of Birth</FormLabel>
                  <InputField
                    type="date"
                    value={candidateDOB}
                    onChange={(e) => setCandidateDOB(e.target.value)}
                    required
                  />

                  <FormLabel>Phone Number</FormLabel>
                  <InputField
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={candidatePhoneNo}
                    onChange={(e) =>
                      setCandidatePhoneNo(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />

                  <FormLabel>Location</FormLabel>
                  <InputField
                    value={candidateLocation}
                    onChange={(e) => setCandidateLocation(e.target.value)}
                    required
                  />
                </InputGroup>
              </InputGroupContainer>

              <SubmitButton type="submit">Submit</SubmitButton>
            </FormWrap>
          </BodyContainer>
        </div>
      </div>
    </>
  );
};

export default AddCandidate;
