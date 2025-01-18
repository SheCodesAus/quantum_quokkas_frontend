import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";

function SignupForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      credentials.username &&
      credentials.email &&
      credentials.password &&
      credentials.confirmPassword
    ) {
      // Check if passwords match
      if (credentials.password !== credentials.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      postSignup(
        credentials.username,
        credentials.email,
        credentials.password
      ).then((response) => {
        window.localStorage.setItem("token", response.token);
        navigate("/login"); 
      });
    }
  };

  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;