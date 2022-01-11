import React from "react";

function SignUp() {
  return (
    <div>
      <h3 className="name">Sign Up</h3>
      <form action="/users/createAccount" method="POST">
        <div className="row">
          <div className="col-lg-12">
            <div className="sn-field">
              <i className="fa fa-user"></i>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name *"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="sn-field">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email/Username *"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="sn-field">
              <i className="fa fa-birthday-cake"></i>
              <input
                type="date"
                name="dob"
                id="dob"
                placeholder="Date Of Birth "
                style={{ color: "#666" }}
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
                placeholder="Password *"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="sn-field">
              <i className="fa fa-lock"></i>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm Password *"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="sn-but">
              <button type="submit">Get Started</button>
              <a href="/users/sign-in">Already Account?</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
