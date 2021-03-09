import React from "react";
import { convertTypeAcquisitionFromJson } from "typescript";

const Documentation = () => {
  var registerJSON = {
    first_name: "Foo",
    last_name: "Fee",
    email: "foo@example.com",
    password: "****",
    password_confirm: "****",
    subject: "newNote",
    content: "Updated content for the 2nd note! :D",
    name: "NoteBook 1",
    notes: "Second Note,newNote",
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
      <h2 className="cover-heading">Authentication APIs</h2>

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
      <p className="border p-2">
        <pre>Empty Body</pre>
      </p>

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
  );
};

export default Documentation;
