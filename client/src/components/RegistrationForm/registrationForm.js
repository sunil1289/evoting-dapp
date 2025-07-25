import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { RingLoader } from "react-spinners";
import "./registrationForm.css";
import Image from "./456.jpg"; 

const RegistrationForm = () => {
  const BASE_API_URL = "http://localhost:4000/api/user/register";
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    location: "",
    citizenship_no: "",
    password: "",
    phone_No: "",
    user_type: "voter",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    location: Yup.string().required("Location is required"),
    citizenship_no: Yup.string().required("Citizenship number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number and at least 8 characters!"
      )
      .required("Password is required"),
    phone_No: Yup.string().required("Phone number is required"),
  });

  const onSubmit = async (values) => {
    if (!file) {
      setMessage("Please select a profile photo");
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true);
    setMessage("");

    try {
      // Create form data
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("location", values.location);
      formData.append("citizenship_no", values.citizenship_no);
      formData.append("password", values.password);
      formData.append("phone_No", values.phone_No);
      formData.append("user_type", "voter");
      formData.append("photo", file);

      // Send request with proper headers for multipart/form-data
      const response = await axios.post(BASE_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration response:", response.data);

      if (response.data.status) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "An error occurred during registration");
      } else {
        setMessage("Network error or server is down. Please try again later.");
      }
    } finally {
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5000000) {
        setMessage("File size too large. Maximum size is 5MB.");
        return;
      }
      setFile(selectedFile);
      setMessage("");
    }
  };

  return (
    <div id="main-div">
      <div className="container">
        <h1>Registration Form</h1>
        <div className="row">
          <div className="col-5">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label className="m-1">Full Name</label>
                <input
                  type="text"
                  className="form-control m-1"
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label className="m-1">Email address</label>
                <input
                  type="email"
                  className="form-control m-1"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label className="m-1">Location</label>
                <input
                  type="text"
                  className="form-control m-1"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="error">{formik.errors.location}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label className="m-1">Citizenship Number</label>
                <input
                  type="text"
                  className="form-control m-1"
                  id="citizenship_no"
                  name="citizenship_no"
                  placeholder="Enter citizenship number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.citizenship_no}
                />
                {formik.touched.citizenship_no && formik.errors.citizenship_no ? (
                  <div className="error">{formik.errors.citizenship_no}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label className="m-1">Password</label>
                <input
                  type="password"
                  className="form-control m-1"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label className="m-1">Phone Number</label>
                <input
                  type="text"
                  className="form-control m-1"
                  id="phone_No"
                  name="phone_No"
                  placeholder="Enter your phone number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_No}
                />
                {formik.touched.phone_No && formik.errors.phone_No ? (
                  <div className="error">{formik.errors.phone_No}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label className="m-1">Profile Photo</label>
                <div className="custom-file">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control mt-1"
                    id="photo"
                    name="photo"
                    accept="image/*"
                  />
                  {file && <small className="form-text text-success">File selected: {file.name}</small>}
                </div>
              </div>

              {message && (
                <div className={message.includes("successful") ? "alert alert-success" : "alert alert-danger"}>
                  {message}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="btn btn-primary mt-4 mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          <div className="col-7" id="registration-picture">
            <img src={Image} className="w-75" alt="Registration" />
            {isSubmitted && (
              <div className="text-center mt-3">
                <RingLoader color="#101C03" loading={isLoading} size={100} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;