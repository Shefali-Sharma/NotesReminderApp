import React, { SyntheticEvent, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Grid } from "semantic-ui-react";
import axios from "axios";

const Login = ({ setLogin }: { setLogin: Function }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("http://localhost:8000/api/login", {
      email: email,
      password: password,
    });

    setRedirect(true);
    setLogin();
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid
      centered
      textAlign="right"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mb-3">
            <Link to="/forgot">Forgot Password?</Link>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
