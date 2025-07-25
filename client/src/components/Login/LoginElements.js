import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Main container
export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0;
  font-family: 'Encode Sans Expanded', sans-serif;
  background: linear-gradient(
    180deg,
    rgba(1, 147, 86, 1) 0%,
    rgba(10, 201, 122, 1) 100%
  );

  @media screen and (max-width: 900px) {
    padding: 3rem 0;
  }
`

// Wrapper for image and form
export const Wrapper = styled.div`
  width: 68%;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19);

  @media screen and (max-width: 900px) {
    width: 90%;
    flex-direction: column;
    padding: 1.5rem;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    width: 95%;
  }
`

// Left image section
export const ImgWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`

export const Img = styled.img`
  width: 90%;
  max-width: 300px;
  height: auto;
  object-fit: contain;

  @media screen and (max-width: 900px) {
    padding: 1rem;
  }
`


export const FormWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 900px) {
    width: 100%;
    align-items: center;
  }
`

export const FormContent = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 900px) {
    width: 95%;
    margin: 0 auto;
  }
`

export const Form = styled.form`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
`

// Branding / logo
export const SiteLogo = styled(Link)`
  font-size: 2.5rem;
  color: #01bf71;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  text-decoration: none;
`

export const FormH1 = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
`

export const FormLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
`

export const FormInput = styled.input`
  padding: 12px;
  margin-bottom: 24px;
  border: 0.5px solid #ccc;
  border-radius: 4px;
  height: 45px;
  font-size: 16px;
`

export const FormButton = styled.button`
  background: #01bf71;
  padding: 14px 0;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #019f61;
  }
`

export const Text = styled(Link)`
  text-align: start;
  margin-top: 24px;
  color: #333;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: #01bf71;
    font-weight: bold;
  }
`

export const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  margin-bottom: 1rem;
`
