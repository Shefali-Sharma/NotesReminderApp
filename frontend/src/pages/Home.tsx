import React, { SyntheticEvent, useEffect, useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";

interface HomeProps {
  user: any;
}

const Home: React.FC<Readonly<HomeProps>> = function Home({ user }) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [deleteSubject, setDeleteSubject] = useState("");
  const [notes, setNotes] = useState([]);
  const [notebooks, setNotebooks] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isCreateDelete, setIsCreateDelete] = useState(true);

  useEffect(() => {
    if (isCreateDelete == true) {
      (async () => {
        const response = await axios.get("http://localhost:8000/api/noteall");

        console.log(response.data);
        setNotes(response.data);
        setIsCreateDelete(false);
      })();
    }
  });

  const submitCreate = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("http://localhost:8000/api/note", {
      subject: subject,
      content: content,
    });

    setIsNew(false);
    setIsClient(false);
    setIsCreateDelete(true);
  };

  const submitEdit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put("http://localhost:8000/api/note", {
      subject: subject,
      content: content,
    });

    setIsNew(false);
  };

  const submitDelete = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.delete("http://localhost:8000/api/note/" + deleteSubject);
    setIsCreateDelete(true);
  };

  const deleteNote = async () => {
    await axios.delete("http://localhost:8000/api/note/" + subject);
    setIsCreateDelete(true);
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

  const getNote = async (s: string) => {
    const response = await axios.get("http://localhost:8000/api/note/" + s);
    console.log(response.data);
    setSubject(response.data[0].subject);
    setContent(response.data[0].content);
    setIsNew(false);
    setIsClient(false);
  };

  const emptyForm = async () => {
    setSubject("");
    setContent("");
    setIsNew(true);
  };

  const filterNotes = async (n: any[]) => {
    var notelist = "";
    n.map((note) => {
      notelist = notelist + note + "-";
    });
    notelist = notelist.slice(0, -1);

    const response = await axios.get(
      "http://localhost:8000/api/notefilter/" + notelist
    );
    console.log(response.data);

    setNotes(response.data);
  };

  const CallShareNote = () => {
    setIsClient(true);
  };

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
                    <div className="list-group-item list-group-item-dark">
                      Notebooks
                    </div>
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={getAllNotes}
                    >
                      All Notes
                    </button>
                  </div>
                </Grid.Row>
                <Grid.Row>
                  <div style={{ width: "190px", marginLeft: "15px" }} className="list-group">
                    <button
                      type="button"
                      className="btn btn-outline-info btn-rounded btn-block my-2 waves-effect z-depth-0"
                      onClick={getAllNotebooks}
                    >
                      My Notebooks
                    </button>
                    {notebooks.map(
                      ({ name, notes }: { name: string; notes: [] }) => (
                        <button
                          type="button"
                          className="list-group-item list-group-item-action"
                          onClick={() => filterNotes(notes)}
                        >
                          {name}
                        </button>
                      )
                    )}
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
                  <button
                    type="button"
                    className="list-group-item list-group-item-action list-group-item-primary"
                    onClick={() => {
                      emptyForm();
                    }}
                  >
                    Create New Note
                  </button>
                  {notes.map(({ subject }: { subject: string }) => (
                    <button
                      type="button"
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        getNote(subject);
                      }}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </Grid.Column>
              <Grid.Column>

              <div className="text-right border border-light p-1">
                  <h5 className="card-header info-color white-text text-center py-4 m-1">
                    <strong>Note</strong>
                  </h5>
                  
                    <button
                      className="btn btn-outline-info btn-rounded my-1 waves-effect z-depth-0 m-1"
                      onClick={deleteNote}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-outline-info btn-rounded my-1 waves-effect z-depth-0 m-1"
                      onClick={CallShareNote}
                    >
                      Share
                    </button>
                    {isClient && (
                      <PDFDownloadLink
                        style={{
                          fontWeight: "bold",
                          textDecoration: "none",
                          backgroundColor: "#EEEEEE",
                          color: "#333333",
                          padding: "7px",
                          border: "1px",
                          borderStyle: "solid",
                          margin: "10px",
                        }}
                        document={
                          <PdfDocument subject={subject} content={content} />
                        }
                        fileName="sharedNote.pdf"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Loading document..." : "Download Note"
                        }
                      </PDFDownloadLink>
                    )}
                  </div>

                <form
                  onSubmit={isNew ? submitCreate : submitEdit}
                  className="text-center border border-light p-2"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                  />
                  <textarea
                    style={{ width: "900px", height: "500px" }}
                    className="form-control"
                    placeholder="Write your note here..."
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                  <br />
                  <button
                    className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
      </div>
    );
  } else {
    message = (
      <div className="row p-5 m-5">
        <div className="col-md-6 col-md-offset-3 p-5 m-5">
          <main role="main" className="inner cover p-5 m-5">
            <h1 className="cover-heading">Notes Application</h1>
            <p className="lead">
              Capture ideas and accomplish more.
              <br />
              Create, Write, Edit and Share your Notes with others!
              <br />
              <br />
              One place for all your Notes!
            </p>
          </main>
        </div>
      </div>
    );
  }

  return <div>{message}</div>;
};

export default Home;
function len(notes: any) {
  throw new Error("Function not implemented.");
}
