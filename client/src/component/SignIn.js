import React from "react";
import "../assets/css/layout.css";
function SignIn() {
  return (
    <div>
      <h3 className="name">Sign In</h3>
      <form action="/users/create-session" method="POST">
        <div className="row">
          <div className="col-lg-12">
            <div className="sn-field">
              <i className="fa fa-user"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Username/Email"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="sn-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="sn-but">
              <button type="submit">Sign In</button>
              <a href="/forget/search">Forget Password?</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
