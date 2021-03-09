import React, { SyntheticEvent, useState } from "react";
import axios from "axios";

const Documentation = () => {
  return (
    <div>
      <h1 className="h3 mb-3 fw-normal">Please set your email</h1>

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        required
        autoFocus
      />

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Reset
      </button>
    </div>
  );
};

export default Documentation;
