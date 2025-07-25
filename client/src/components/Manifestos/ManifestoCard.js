import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid black;
  width: 95%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const CardImage = styled.img`
  object-fit: cover;
  margin: auto;
  display: block;
  width: 300px;
  height: 300px;
`;

const CardTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ManifestoCard = ({ manifesto }) => {
  console.log(manifesto);
  return (
    <CardContainer>
      <CardTitle>{manifesto.partyName}</CardTitle>
      <span>
        <b>Manifesto Keywords</b> : <i>{manifesto.manifestoWords}</i>
      </span>
      <CardImage src={manifesto.partyImage} alt={`${manifesto.partyName} logo`} />
      <span>{manifesto.manifestoDescription}</span>
    </CardContainer>
  );
};

export default ManifestoCard;