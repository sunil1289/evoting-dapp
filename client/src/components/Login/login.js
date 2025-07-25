import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Container,
  Wrapper,
  FormButton,
  FormContent,
  FormH1,
  FormLabel,
  FormWrap,
  FormInput,
  Form,
  Text,
  ImgWrapper,
  Img,
  SiteLogo,
} from "./LoginElements";
import { RingLoader } from "react-spinners";
import AuthImage from "../Homepage/images/otp.svg";
import vote from "../Homepage/images/vote.png";

const Login = ({ setUser }) => {
  const BASE_API_URL = "http://localhost:4000/api/user/login";
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setIsSubmitted(true);
      setMessage("");

      try {
        const response = await axios.post(BASE_API_URL, values, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data.status) {
          const { data } = response.data; // Use data directly

          // Store values in sessionStorage
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("userType", data.user_type);
          sessionStorage.setItem("pictureURL", data.pictureURL);

          if (setUser) setUser(data);
          navigate("/verify");
        } else {
          setMessage(
            response.data.message || "Login failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Login error:", error.message);
        setMessage(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
      }
    },
  });

  return (
    <Container>
      <Wrapper>
        <FormWrap>
          <FormContent>
            <Form onSubmit={formik.handleSubmit}>
              <SiteLogo to="/">
                <img
                  src={vote}
                  alt="E-Voting Logo"
                  style={{ height: "40px", marginRight: "20px" }}
                />
              </SiteLogo>
              <FormH1>Sign in to your account</FormH1>

              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}

              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}

              {message && <div className="error mt-2">{message}</div>}

              <FormButton type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </FormButton>

              <Text to="/register"> New User? Register Now ❯</Text>
            </Form>
          </FormContent>
        </FormWrap>

        <ImgWrapper>
          {isSubmitted && (
            <RingLoader color="#101C03" loading={isLoading} size={100} />
          )}
          <Img src={AuthImage} alt="Authentication illustration" />
        </ImgWrapper>
      </Wrapper>
    </Container>
  );
};

export default Login;
