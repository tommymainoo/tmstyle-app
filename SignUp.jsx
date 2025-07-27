import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setLoading("Please wait");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);
      data.append("email", email);
      data.append("phone", phone);

      const response = await axios.post(
        "https://tommymainoo.pythonanywhere.com/api/sign_up",
        data
      );
      setLoading("");
      setSuccess(response.data.welcome);
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div className="div row1 ">
      <div className="row justify-content-center ">
        <div className=" col-md-6  ">
          <br />
          <h3 className="text-light mt-5">
            <b>Sign Up</b>
          </h3>
          <form action="" onSubmit={submit}>
            {loading}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="text"
              required
              placeholder="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />{" "}
            <br />
            <input
              type="email"
              required
              className="form-control "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <br />
            <input
              type="password"
              required
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <input
              type="text"
              required
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />{" "}
            <br />
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
            <p>
              <b>Already have an account?</b>
            </p>
            <Link to="/signin">Sign In</Link>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
