import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import logo from "../assets/img/logo.jpg";
import login from "../assets/img/login.png";

function Sign() {
  const [active, setactive] = useState(true);
  return (
    <div className="sign-in-up">
      <div className="container sign-popup">
        <div className="row sign-pop">
          <div className="col-lg-6">
            <div className="site-info">
              <img
                src={logo}
                alt="logo"
                style={{ marginBottom: "50px", marginTop: "30px" }}
              />
              <img
                src={login}
                alt="login-logo"
                style={{
                  marginBottom: "30px",
                  marginTop: "50px",
                  padding: "10px",
                }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login-sec">
              <ul className="sign-control">
                <li
                  id="tab-1"
                  className={active ? "active" : "notactive"}
                  onClick={() => setactive(true)}
                >
                  Sign in
                </li>
                <li
                  id="tab-2"
                  className={active ? "notactive" : "active"}
                  onClick={() => setactive(false)}
                >
                  Sign Up
                </li>
              </ul>
              {active && <SignIn />}
              {!active && <SignUp />}
              <div className="social-sn">
                <h4>Login Via Social Account</h4>
                <ul>
                  <li>
                    <a href="/users/auth/google" className="google">
                      <i className="fa fa-google"></i>Login via Google
                    </a>
                  </li>
                  <li>
                    <a href="/users/auth/google" className="fb">
                      <i className="fa fa-facebook-f"></i>Login via Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign;
