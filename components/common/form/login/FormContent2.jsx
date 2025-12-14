"use client";
import Link from "next/link";
import LoginWithSocial from "./LoginWithSocial";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { setAccessToken } from "../../../../app/admin/lib/api"; // ⬅ add this import

//new component
import MessageComponent from "../../ResponseMsg";

const FormContent2 = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message_id, setMessageId] = useState(null);
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState(null);

  const [hastoken, setHasToken] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //dont render anything if token exists
 

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError(null);
   setSuccess(null);

   try {
     const response = await axios.post(`${apiurl}/api/auth/login`, formData, {
       withCredentials: true, // 👈 Needed for cookies
     });

     if (!response.data.success) {
       setError(response.data.message);
       setErrorId(Date.now());
       return;
     }

     // success
     setAccessToken(response.data.token); // ⬅ ADD THIS LINE

     setSuccess(response.data.message);
     setMessageId(Date.now());
     router.push("/admin/dashboard");
   } catch (err) {
     setError(err.response?.data?.message || "Login failed. Try again.");
     setErrorId(Date.now());
   } finally {
     setLoading(false);
   }
 };



  const handlecompanyclick = () => {
    handleExternalLink("#");
  };
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="form-inner p-4">
      <div className="mb-3 d-flex justify-content-center pb-4 pt-4">
        <img
          alt="brand"
          src="./imtpilllogo.jpg"
          /* width={200}
          height={60} */
          /*   style={{ height: "200px" }} */
          /* priority */
        />
      </div>
      {/* <h3
        style={{
          textAlign: "center",
        }}
      >
        GLOBAL{" "}
        <span
          className="ms-1"
          style={{
            textDecoration: "underline",
            textDecorationColor: "rgb(40,59,133)", // your custom color
          }}
        >
          EMPLOYABILITY INFORMATION SERVICES
        </span>{" "}
        INDIA LIMITED
      </h3>
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
        Access. Evaluate. Recruit.
      </h4> */}

      <MessageComponent
        error={error}
        success={success}
        message_id={message_id}
        errorId={errorId}
      />
      {/* <!--Login Form--> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-1">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {/* name */}

        <div className="form-group mb-1">
          <label>Password</label>
          <input
            id="password-field"
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* password */}

        <div className="form-group  mb-1">
          <div className="field-outer mt-1">
            <div className="input-group checkboxes square mb-2">
              {/*    <input type="checkbox" name="remember-me" id="remember" /> */}
              {/* <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label> */}
            </div>
            {/* <a href="#" className="pwd">
              Forgot password?
            </a> */}
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group mt-0  mb-1">
          <button
            className="theme-btn btn-style-one mt-0 mb-0"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging..." : "Log in"}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      <div className="bottom-box mt-1">
        {/* <div className="text">
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "blue" }}>
            Signup
          </Link>
        </div> */}

        {/* <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial /> */}
      </div>
      {/* End bottom-box LoginWithSocial */}

      {/* <div className="mt-2 text-center">
        <p className="text-muted small">
          Developed and maintained by{" "}
          <strong
            className="text-dark"
            onClick={handlecompanyclick}
            style={{ cursor: "pointer" }}
          >
            2S Global Technologies Ltd
          </strong>
        </p>
      </div> */}

      {/* <div className="d-flex justify-content-center gap-3 mt-2">
        <button
          onClick={() => handleExternalLink("#")}
          className="btn btn-outline-primary rounded-circle"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </button>
        <button
          onClick={() => handleExternalLink("/images/FoodGo.png")}
          className="btn btn-outline-primary rounded-circle"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </button>
      </div> */}
    </div>
  );
};

export default FormContent2;
