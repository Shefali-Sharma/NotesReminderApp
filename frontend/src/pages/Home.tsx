import React, { SyntheticEvent, useState } from "react";
import { Container, Form, Grid } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router";

interface HomeProps {
  user: any
}

const Home:React.FC<Readonly<HomeProps>> = function Home({user}){
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8000/api/note", {
      subject: subject,
      content: content,
    });

    let info;

    if(response.status == 200){
      info = (
        <div
          className={"alert alert-success"}
          role="alert"
        >
          Note created successfully!
        </div>
      );
    }

    setSubject("");
    setContent("");
  };

  let message;
  if (user) {
    message = (
      <div className="container-fluid">
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Container>
                  <Form onSubmit={submit}> 
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                    onChange={(e) => setSubject(e.target.value)}
                  />
                    <textarea 
                      style={{width: "500px", height: "500px"}} 
                      className="form-control" 
                      placeholder='Write your note here...' 
                      onChange={(e) => setContent(e.target.value)} />
                    <br/>
                  <button className="w-20 btn btn-outline-dark" type="submit">
                    Create Note
                  </button>
                  </Form>
                </Container>
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
