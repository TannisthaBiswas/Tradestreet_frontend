import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { backend_url, admin_url} from "../App";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "", role: "user" }); // Default role is 'user'

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let dataObj;
    await fetch(`${backend_url}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (dataObj = data));

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      if (dataObj.role === "admin") {
        window.location.replace(`${admin_url}`); 
      } else {
        window.location.replace("/");
      }
    } else {
      alert(dataObj.errors);
    }
  };

  const signup = async () => {
    let dataObj;
    await fetch(`${backend_url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => (dataObj = data));

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      if (dataObj.role === "admin") {
        window.location.replace(`${admin_url}`); 
      } else {
        window.location.replace("/");
      }
    } else {
      alert(dataObj.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                type="text"
                placeholder="Your name"
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
              <select
                name="role"
                value={formData.role}
                onChange={changeHandler}
                placeholder="Select role"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button onClick={() => (state === "Login" ? login() : signup())}>
          Continue
        </button>
        {state === "Login" && (
          <p className="loginsignup-login">
            Forgot your password?{" "}
            <span>
              Reset here
            </span>
          </p>
        )}
        {state === "Login" ? (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
