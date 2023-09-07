import React from "react";
import { useAuth } from "../AuthContext"; // Import the context

const Validation = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Use the context

  setIsLoggedIn(true); // Set the state to true

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Validation Page</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>You have successfully logged in!</p>
        </div>
      </div>
    </div>
  );
};

export default Validation;
