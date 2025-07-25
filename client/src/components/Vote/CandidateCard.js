import React from 'react';
import './candidateCard.css';

const CandidateCard = ({ candidate, voteCandidate }) => {
  const voteHandler = (e) => {
    e.preventDefault();
    voteCandidate(Number(e.target.value));
  };

  return (
    <div className="main_card shadow-lg m-4">
      <img
        src={candidate.img || 'default-candidate.jpg'}
        className="candidate-img"
        alt={`${candidate.name}'s profile`}
      />
      <hr className="divider" />
      <div className="body-container">
        <p className="candidate-name">Name: {candidate.name}</p>
        <p className="candidate-party">Party: {candidate.party}</p>
        <p className="candidate-dob">DOB: {candidate.dob}</p>
        <p className="candidate-votecount">Vote Count: {candidate.votecount}</p>
        <button value={candidate.id} onClick={voteHandler} className="vote-btn">
          VOTE
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;