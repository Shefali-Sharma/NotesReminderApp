import React, { SyntheticEvent, useState } from "react";
import { Container, Form, Grid } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";

interface HomeProps {
  user: any;
}

const Home: React.FC<Readonly<HomeProps>> = function Home({ user }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [deleteSubject, setDeleteSubject] = useState("");
  const [notify, setNotify] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8000/api/note", {
      subject: subject,
      content: content,
    });

    if (response.status == 200) {
      setNotify(true);
    } else {
      setNotify(false);
    }
  };

  const submitDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.delete("http://localhost:8000/api/note/"+deleteSubject);

    if (response.status == 200) {
      setNotify(true);
    } else {
      setNotify(false);
    }
  };

  let info;

  if (notify) {
    info = (
      <div className={"alert alert-success"} role="alert">
        Note created successfully!
      </div>
    );
  }

  let message;
  if (user) {
    message = (
      <div className="container-fluid">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <form onSubmit={submitDelete} className="text-center border border-light p-5">
                  <h5 className="card-header info-color white-text text-center py-4">
                    <strong>Delete Note</strong>
                  </h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                    onChange={(e) => setDeleteSubject(e.target.value)}
                  />
                  <br />
                  <button className="btn btn-info btn-block my-4" type="submit">
                    Delete Note
                  </button>
                </form>
              </Grid.Column>
              <Grid.Column>
                <form
                  onSubmit={submit}
                  className="text-center border border-light p-5"
                >
                  <h5 className="card-header info-color white-text text-center py-4">
                    <strong>Create Note</strong>
                  </h5>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <textarea
                    style={{ width: "500px", height: "500px" }}
                    className="form-control"
                    placeholder="Write your note here..."
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <br />
                  <button
                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                    type="submit"
                  >
                    Create Note
                  </button>
                </form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
      </div>
    );
  } else {
    message = "You are not logged in!";
  }

  return <div>{message}</div>;
};

export default Home;
