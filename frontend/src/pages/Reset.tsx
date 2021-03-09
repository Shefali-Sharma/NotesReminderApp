import React, { SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Grid } from "semantic-ui-react";

const Reset = ({ match }: { match: any }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const token = match.params.token;
    console.log(token);

    const response = await axios.post("http://localhost:8000/api/reset", {
      token: token,
      password: password,
      password_confirm: confirmPassword,
    });

    setRedirect(true);
    if (response.status === 200 || redirect) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Grid
      centered
      textAlign="right"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please reset your password</h1>

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="form-control"
        placeholder="Confirm Password"
        required
        onChange={(e) => setconfirmPassword(e.target.value)}
      />
      <br/>

      <button className="w-100 btn btn-lg btn-primary" type="submit">
        Reset Password
      </button>
    </form>
    </Grid.Column>
    </Grid>
  );
};

export default Reset;
