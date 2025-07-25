import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./OtpVerification.css";
import axios from "axios";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function OtpVerification() {
  const BASE_API_URL = "http://localhost:4000/api/user/verifylogin";
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const color = "#101C03";

  const initialValues = {
    email: sessionStorage.getItem("email") || "",
    code: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    code: Yup.string().required("OTP code is required"),
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    setIsSubmitted(true);
    setMessage("");

    axios
      .post(BASE_API_URL, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status) {
          const userType = sessionStorage.getItem("userType");
          switch (userType) {
            case "voter":
              navigate("/facial-verification");
              break;
            case "candidate":
              navigate("/candidate/dashboard");
              break;
            case "admin":
              navigate("/admin/dashboard");
              break;
            default:
              navigate("/");
              break;
          }
        } else {
          setMessage(response.data.message || "Verification failed. Please try again.");
        }
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitted(false);
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="otp-box-container">
      <div className="card">
        <h2>Email Verification</h2>
        <div className="mobile-text">
          Enter the OTP code we sent to your email: <br />
          <strong>{formik.values.email}</strong>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mt-4">
            <input
              id="email"
              type="email"
              className="form-control mb-3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              disabled
            />

            <input
              id="code"
              type="text"
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
              placeholder="Enter OTP"
            />
          </div>

          {formik.touched.code && formik.errors.code && (
            <div className="error text-danger text-center mt-2">
              {formik.errors.code}
            </div>
          )}

          <div className="text-center mt-4">
            <button type="submit" className="verify-btn" disabled={isLoading}>
              Verify
            </button>
            {message && (
              <div className="error text-danger text-center mt-2">
                {message}
              </div>
            )}
          </div>

          {isSubmitted && (
            <div className="mt-4">
              <RingLoader color={color} loading={isLoading} css={override} size={70} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
