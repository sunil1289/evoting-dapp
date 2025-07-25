import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RiDashboardLine } from 'react-icons/ri';
import { FaUserEdit, FaVoteYea } from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import { IoMdChatboxes } from 'react-icons/io';
import { MdSupportAgent, MdDeveloperMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const MainContainer = styled.div`
  height: auto;
  display: flex;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 400px;
  border: 2px solid #01bf71;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SoonText = styled.h1`
  font-weight: 500;
  font-size: 2.5rem;
  color: #01bf71;
  text-align: center;
  margin-top: 20px;
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #4b5563;
  text-align: center;
  margin-top: 10px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const reverseSpin = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

const LoaderContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const Ring = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 6px solid transparent;
  border-top-color: #01bf71;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

const InnerRing = styled(Ring)`
  top: 20px;
  left: 20px;
  width: 160px;
  height: 160px;
  border: 5px solid transparent;
  border-top-color: #01bf71;
  animation: ${reverseSpin} 1s linear infinite;
`;

const CoreRing = styled(Ring)`
  top: 40px;
  left: 40px;
  width: 120px;
  height: 120px;
  border: 4px solid transparent;
  border-top-color: #01bf71;
  animation: ${spin} 2s linear infinite;
`;

const ComingSoon = () => {
  return (
    <div>
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
          <Container>
            <ContentContainer>
              <LoaderContainer>
                <Ring />
                <InnerRing />
                <CoreRing />
              </LoaderContainer>
              <SoonText>Updates in Progress!</SoonText>
              <SubText>We're working hard to bring you new features. Stay tuned!</SubText>
            </ContentContainer>
          </Container>
        </div>
      </MainContainer>
    </div>
  );
};

export default ComingSoon;