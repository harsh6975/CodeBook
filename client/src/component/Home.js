import React from "react";
import "../assets/css/layout.css";
import { Button } from "react-bootstrap";

function Home() {
  return (
    <div className="front">
      <h1>Welcome To CodeBook</h1>
      <a href="/users/sign">
        <Button variant="warning">Get In</Button>
      </a>
    </div>
  );
}

export default Home;
