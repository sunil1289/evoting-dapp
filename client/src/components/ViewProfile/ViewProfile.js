import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import styled from "styled-components";
import axios from "axios";
import Navbar from "../Layouts/Navbar";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { FaUserEdit, FaVoteYea } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { IoMdChatboxes } from "react-icons/io";
import { MdSupportAgent, MdDeveloperMode } from "react-icons/md";
import {
  Container,
  FormContent,
  FormLabel,
  FormWrap,
  Icon,
  ImageWrapper,
  PreviewImage,
  InputWrapper,
  InputCol1,
  InputCol2,
  FormInput,
  Form,
} from "../Blockchain/EditCandidateElements";

const MainContainer = styled.div`
  height: auto;
  display: flex;
`;

const ContentsContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ViewProfile = () => {
  const [fetching, setFetching] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const color = "#00995a";
  const override = css`
    display: block;
    margin: auto;
    border-color: red;
  `;

  const fetchUserData = async () => {
    setFetching(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/email",
        {
          email: sessionStorage.getItem("email"),
        }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <div className="sidebar col-12 col-lg-3 col-md-5 col-sm-6">
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/voter/dashboard" className="link d-block">
                <RiDashboardLine />
                <span className="mx-3 py-2">Dashboard</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/voter/profile" className="link d-block">
                <FaUserEdit />
                <span className="mx-3 py-2">User</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/voter/vote" className="link d-block">
                <FaVoteYea />
                <span className="mx-3 py-2">Vote</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/walletid" className="link d-block">
                <ImStatsBars />
                <span className="mx-3 py-2">Wallet Id</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/voter/chat" className="link d-block">
                <IoMdChatboxes />
                <span className="mx-3 py-2">Message</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/voter/support" className="link d-block">
                <MdSupportAgent />
                <span className="mx-3 py-2">Support</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/developers" className="link d-block">
                <MdDeveloperMode />
                <span className="mx-3 py-2">Developers</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-9 col-md-7 col-sm-6 py-3">
          <ContentsContainer>
            {fetching ? (
              <RingLoader color={color} css={override} size={100} />
            ) : (
              <Container>
                <FormWrap>
                  <Icon to="#">Your Details</Icon>
                  <FormContent>
                    <Form action="#">
                      <ImageWrapper>
                        <FormLabel htmlFor="photo">Photo:</FormLabel>
                        <PreviewImage
                          src={userData.pictureURL || "default-profile.jpg"}
                          alt="User profile"
                        />
                      </ImageWrapper>
                      <InputWrapper>
                        <InputCol1>
                          <FormLabel htmlFor="full-name">Full Name:</FormLabel>
                          <FormInput
                            type="text"
                            value={userData.name || ""}
                            readOnly
                          />
                          <FormLabel htmlFor="email">E-mail:</FormLabel>
                          <FormInput
                            type="email"
                            value={userData.email || ""}
                            readOnly
                          />
                          <FormLabel htmlFor="location">Location:</FormLabel>
                          <FormInput
                            type="text"
                            value={userData.location || ""}
                            readOnly
                          />
                        </InputCol1>
                        <InputCol2>
                          <FormLabel htmlFor="citizenship-no">
                            Citizenship No.:
                          </FormLabel>
                          <FormInput
                            type="text"
                            value={userData.citizenship_no || ""}
                            readOnly
                          />
                          <FormLabel htmlFor="phone-no">Phone No:</FormLabel>
                          <FormInput
                            type="text"
                            value={userData.phone_No || ""}
                            readOnly
                          />
                          <FormLabel htmlFor="candidate-id">
                            Candidate Id:
                          </FormLabel>
                          <FormInput
                            type="text"
                            value={userData._id || ""}
                            readOnly
                          />
                        </InputCol2>
                      </InputWrapper>
                    </Form>
                  </FormContent>
                </FormWrap>
              </Container>
            )}
          </ContentsContainer>
        </div>
      </MainContainer>
    </>
  );
};

export default ViewProfile;
