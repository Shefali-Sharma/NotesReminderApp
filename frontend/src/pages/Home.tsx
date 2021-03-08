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
  const [notes, setNotes] = useState([]);
  const [notebooks, setNotebooks] = useState([]);

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

    const response = await axios.delete(
      "http://localhost:8000/api/note/" + deleteSubject
    );

    if (response.status == 200) {
      setNotify(true);
    } else {
      setNotify(false);
    }
  };

  const getAllNotes = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8000/api/noteall");

    console.log(response.data);
    setNotes(response.data);
  };

  const getAllNotebooks = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8000/api/notebookall");

    console.log(response.data);
    setNotebooks(response.data);
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
              <Grid>
                <Grid.Row>
                  <div style={{ width: "220px" }} className="list-group p-3">
                    <div className="list-group-item info-color waves-effect">
                      Notebooks
                    </div>
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={getAllNotes}
                    >
                      All Notes
                    </button>
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      Notebook1
                    </button>
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      NoteBook2
                    </button>
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <form
                    onSubmit={submitDelete}
                    className="text-center border border-light p-3"
                  >
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
                    <button
                      className="btn btn-info btn-block my-4"
                      type="submit"
                    >
                      Delete Note
                    </button>
                  </form>
                </Grid.Row>
              </Grid>
              <Grid.Column>
                <div style={{ width: "220px" }} className="list-group p-3">
                  <div className="list-group-item list-group-item-dark">
                    Notes
                  </div>
                  {notes.map(({ subject }: { subject: string }) => (
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </Grid.Column>
              <Grid.Column>
                <form
                  onSubmit={submit}
                  className="text-center border border-light p-2"
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
