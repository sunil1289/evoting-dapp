import React from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  background-color: #2e7d32; 
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-right: 3rem;
  align-self: flex-start;  

  &:hover {
    background-color: #5e2e1bff;
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 600px) {
    padding: 0.3rem 0.8rem;
    font-size: 14px;
    margin-right: 0.5rem;
  }
`;


export const AccountButton = styled.div`
  background-color: transparent;
  border: none;
  color: #b0bec5;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    color: #4caf50; 
    transform: translateY(-2px);
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: 0.3rem 0.8rem;
  }
`

const Navbar = ({ account, onBack }) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow-lg">
      <div className="navbar-brand-container">
        <h3 className="navbar-brand">Decentralized E-Voting</h3>
      </div>
      <div className="navbar-actions">
        {onBack && (
          <Button onClick={onBack}>Back</Button>
        )}
        <AccountButton
          onClick={() => {
            window.location.reload()
          }}
        >
          Current Account: {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Not Connected'}
        </AccountButton>
      </div>
    </nav>
  )
}

export default Navbar