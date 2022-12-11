import React from "react";
import "./style.css";

const Confirmation = () => {
  return (
    <div className="confirmation-box">
      <div className="conf-message">
        <p>Are you sure you want to delete?</p>
      </div>
      <div className="confirmation-button">
        <button className="conf-cancel">Cancel</button>
        <button className="conf-delete">Delete</button>
      </div>
    </div>
  );
};

export default Confirmation;
