import React from "react";
import { convertTypeAcquisitionFromJson } from "typescript";

const Documentation = () => {
  var createNoteJSON = {
    subject: "my Example Note",
    content: "Content for my note! :D",
  };

  var editNoteJSON = {
    subject: "my Example Note",
    content: "Updated content for the note!",
  };

  var createNoteJSONMessage = JSON.stringify(createNoteJSON, undefined, 2);
  var editNoteJSONMessage = JSON.stringify(editNoteJSON, undefined, 2);

  var createNotebookJSON = {
    name: "NoteBook 1",
    notes: "my Example Note, another Example Note",
  };

  var editNotebookJSON = {
    name: "NoteBook 1",
    notes: "another Example Note",
  };

  var createNotebookJSONMessage = JSON.stringify(createNotebookJSON, undefined, 2);
  var editNotebookJSONMessage = JSON.stringify(editNotebookJSON, undefined, 2);

  var registerJSON = {
    first_name: "Foo",
    last_name: "Fee",
    email: "foo@example.com",
    password: "****",
    password_confirm: "****",
  };

  var loginJSON = {
    email: "foo@example.com",
    password: "****",
  };

  var forgotJSON = {
    email: "foo@example.com",
  };

  var resetJSON = {
    token: "<GeneratedToken>",
    password: "****",
    password_confirm: "****",
  };

  var registerJSONMessage = JSON.stringify(registerJSON, undefined, 2);
  var loginJSONMessage = JSON.stringify(loginJSON, undefined, 2);
  var forgotJSONMessage = JSON.stringify(forgotJSON, undefined, 2);
  var resetJSONMessage = JSON.stringify(resetJSON, undefined, 2);

  return (
    <div className="m-4">
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">Documentation</h1>
        </div>
      </div>
      <div className="jumbotron p-2 p-md-3 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h2 className="cover-heading">Notes APIs</h2>
        </div>
      </div>

      <div className="p-2">
        <h3 className="cover-heading">Create Note</h3>
        <p className="lead border p-2">POST: /api/note</p>
        <p className="border p-2">
          <pre>
            <code>{createNoteJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Edit Note</h3>
        <p className="lead border p-2">PUT: /api/note</p>
        <p className="border p-2">
          <pre>
            <code>{editNoteJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Delete Note</h3>
        <p className="lead border p-2">DELETE: /api/note/:subject</p>

        <h3 className="cover-heading">Get Note</h3>
        <p className="lead border p-2">GET: /api/note/:subject</p>

        <h3 className="cover-heading">Get Filtered Notes</h3>
        <p className="lead border p-2">GET: /api/notefilter/:notes</p>

        <h3 className="cover-heading">Get All Notes</h3>
        <p className="lead border p-2">GET: /api/noteall</p>
      </div>

      <div className="jumbotron p-2 p-md-3 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h2 className="cover-heading">Notebooks APIs</h2>
        </div>
      </div>

      <div className="p-2">
        <h3 className="cover-heading">Create Notebook</h3>
        <p className="lead border p-2">POST: /api/notebook</p>
        <p className="border p-2">
          <pre>
            <code>{createNotebookJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Edit Notebook</h3>
        <p className="lead border p-2">PUT: /api/notebook</p>
        <p className="border p-2">
          <pre>
            <code>{editNotebookJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Delete Notebook</h3>
        <p className="lead border p-2">DELETE: /api/notebook/:name</p>

        <h3 className="cover-heading">Get Notebook</h3>
        <p className="lead border p-2">GET: /api/notebook/:name</p>

        <h3 className="cover-heading">Get All Notebooks</h3>
        <p className="lead border p-2">GET: /api/notebookall</p>
      </div>

      <div className="jumbotron p-2 p-md-3 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h2 className="cover-heading">Authentication APIs</h2>
        </div>
      </div>

      <div className="p-2">
        <h3 className="cover-heading">User Registeration</h3>
        <p className="lead border p-2">POST: /api/register</p>
        <p className="border p-2">
          <pre>
            <code>{registerJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Login</h3>
        <p className="lead border p-2">POST: /api/login</p>
        <p className="border p-2">
          <pre>
            <code>{loginJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Logout</h3>
        <p className="lead border p-2">POST: /api/logout</p>

        <h3 className="cover-heading">Forgot Password</h3>
        <p className="lead border p-2">POST: /api/forgot</p>
        <p className="border p-2">
          <pre>
            <code>{forgotJSONMessage}</code>
          </pre>
        </p>

        <h3 className="cover-heading">Reset Password</h3>
        <p className="lead border p-2">POST: /api/reset</p>
        <p className="border p-2">
          <pre>
            <code>{resetJSONMessage}</code>
          </pre>
        </p>
      </div>
    </div>
  );
};

export default Documentation;
