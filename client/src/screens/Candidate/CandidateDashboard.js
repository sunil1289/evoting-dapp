import React from 'react';
import '../Voter/voterDashboard.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Layouts/Navbar';
import { RiDashboardLine } from 'react-icons/ri';
import { FaUserEdit } from 'react-icons/fa';
import { RiLiveFill } from 'react-icons/ri';
import { ImStatsBars } from 'react-icons/im';
import { IoMdChatboxes } from 'react-icons/io';
import { MdSupportAgent, MdDeveloperMode } from 'react-icons/md';

const CandidateDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="row dashboard-container">
        <div className="sidebar col-12 col-lg-3 col-md-5 col-sm-6">
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/candidate/dashboard" className="link d-block">
                <RiDashboardLine />
                <span className="mx-3 py-2">Dashboard</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/profile" className="link d-block">
                <FaUserEdit />
                <span className="mx-3 py-2">User</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/comingsoon" className="link d-block">
                <RiLiveFill />
                <span className="mx-3 py-2">Go Live</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/livedata" className="link d-block">
                <ImStatsBars />
                <span className="mx-3 py-2">Analytics</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/comingsoon" className="link d-block">
                <IoMdChatboxes />
                <span className="mx-3 py-2">Message</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/comingsoon" className="link d-block">
                <MdSupportAgent />
                <span className="mx-3 py-2">Support</span>
              </Link>
            </div>
          </div>
          <div className="sidebar-items">
            <div className="sidebar-titles py-3 px-1">
              <Link to="/comingsoon" className="link d-block">
                <MdDeveloperMode />
                <span className="mx-3 py-2">Developers</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="dashboard col-12 col-lg-9 col-md-7 col-sm-6">
          <div className="row m-3">
            <h1 className="dashboard-title mb-4">CANDIDATE DASHBOARD</h1>
            <div className="vote-div">
              <div className="card card-vote w-100 h-100">
                <div className="card-body text-center">
                  <h1 className="text-white py-3">VIEW LIVE RESULTS</h1>
                </div>
                <Link className="card-footer text-white" to="/livedata">
                  <span className="float-left">View Realtime Results</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="row m-3 row-features">
            <div className="col-12 col-lg-3 col-md-12 col-sm-12 sub-col-first my-3">
              <div className="card card-result w-100 h-100">
                <div className="card-body text-center">
                  <h2 className="text-white py-3">GO LIVE</h2>
                </div>
                <Link className="card-footer text-white" to="/comingsoon">
                  <span className="float-left">Go live to voters</span>
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-12 col-sm-12 my-3">
              <div className="card card-chat w-100 h-100">
                <div className="card-body text-center">
                  <h2 className="text-white py-3">CHAT</h2>
                </div>
                <Link className="card-footer text-white" to="/comingsoon">
                  <span className="float-left">Message with voters</span>
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-12 col-sm-12 my-3">
              <div className="card card-info w-100 h-100">
                <div className="card-body text-center">
                  <h2 className="text-white py-3">VIEW INFO</h2>
                </div>
                <Link className="card-footer text-white" to="/profile">
                  <span className="float-left">View & Edit Info</span>
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-3 col-md-12 col-sm-12 my-3 sub-col-last">
              <div className="card card-live w-100 h-100">
                <div className="card-body text-center">
                  <h2 className="text-white py-3">MANIFESTO</h2>
                </div>
                <Link className="card-footer text-white" to="/candidate/manifesto">
                  <span className="float-left">Post manifesto</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateDashboard;