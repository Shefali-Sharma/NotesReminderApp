import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: "",
  });

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/forgot", {
        email: email,
      });
      setNotify({
        show: true,
        error: false,
        message: "Email was sent!",
      });
    } catch (e) {
      setNotify({
        show: true,
        error: true,
        message: "Email does not exist!",
      });
    }
  };

  let info;

  if (notify.show) {
    info = (
      <div
        className={notify.error ? "alert alert-danger" : "alert alert-success"}
        role="alert"
      >
        {notify.message}
      </div>
    );
  }

  return (
    <Grid
      centered
      textAlign="right"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <form onSubmit={submit}>
          {info}

          <h1 className="h3 mb-3 fw-normal">Please set your email</h1>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            required
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Reset
          </button>
        </form>
      </Grid.Column>
    </Grid>
  );
};

export default Forgot;
