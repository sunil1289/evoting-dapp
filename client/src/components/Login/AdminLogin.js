// components/Login/AdminLogin.js
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
import vote from "../Homepage/images/vote.png";
import { RingLoader } from "react-spinners";
import AuthImage from "../Homepage/images/otp.svg";

const AdminLogin = ({ setAdmin }) => {
  const BASE_API_URL = "http://localhost:4000/api/admin/login";
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setMessage("");

      try {
        const response = await axios.post(BASE_API_URL, values, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.data.status) {
          const { data } = response.data;
          sessionStorage.setItem("adminName", data.name);
          sessionStorage.setItem("adminEmail", data.email);
          sessionStorage.setItem("adminType", data.user_type);
          sessionStorage.setItem("adminToken", data.token);

          if (setAdmin) setAdmin(data);
          navigate("/admin/dashboard");
        } else {
          setMessage(
            response.data.message || "Login failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Admin login error:", error.message);
        setMessage(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } finally {
        setIsLoading(false);
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
              <FormH1>Admin Login</FormH1>

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
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.email}
                </div>
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
                <div style={{ color: "red", marginTop: "5px" }}>
                  {formik.errors.password}
                </div>
              )}

              {message && (
                <div style={{ color: "red", marginTop: "10px" }}>{message}</div>
              )}

              <FormButton type="submit" disabled={isLoading}>
                {isLoading ? (
                  <RingLoader color="#ffffff" size={20} />
                ) : (
                  "Log In as Admin"
                )}
              </FormButton>

              <Text to="/">← Back to Home</Text>
            </Form>
          </FormContent>
        </FormWrap>

        <ImgWrapper>
          <Img src={AuthImage} alt="Admin login illustration" />
        </ImgWrapper>
      </Wrapper>
    </Container>
  );
};

export default AdminLogin;
