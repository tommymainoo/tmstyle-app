import React, { useState  } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  //hook for redirection
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please Wait");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);

      const response = await axios.post(
        "https://tommymainoo.pythonanywhere.com/api/signin",
        data
      );
      setLoading("");
      setSuccess(response.data.welcome);

      if (response.data.user) {
        // if user is found store details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        //redirect the get product page
        navigate("/");
        setSuccess(response.data.welcome);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setLoading("");
      setError(error.response.data.message);
    }
  };
  return (
   
      <div className="div row1">
        <div className="row justify-content-center  ">
          <div className="col-md-6   ">
            <br />
            <h3 className='text-light mt-5'>
              <b>Sign In</b>
            </h3>
            <form action="" onSubmit={submit}>
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {loading}
              <input
                type="text"
                required
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />{" "}
              <br />
              <input
                type="password"
                required
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button className="btn btn-primary" type="submit">
                Sign In
              </button>
              <p>
                <b>Dont have an account ?</b>
              </p>
              <Link to="/signup">Sign Up</Link>
              <br />
            </form>
            <br />
          </div>
        </div>
      </div>
    
  );
}

export default SignIn;