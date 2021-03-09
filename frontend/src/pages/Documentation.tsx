import React from "react";
import { convertTypeAcquisitionFromJson } from "typescript";

const Documentation = () => {
  var registerJSON = {
    "first_name": "Foo",
    "last_name": "Fee",
    "email": "foo@example.com",
    "password": "****",
    "password_confirm": "****",
    "subject": "newNote",
    "content": "Updated content for the 2nd note! :D",
    "name": "NoteBook 1",
    "notes": "Second Note,newNote"
};

var loginJSON = {
  "email": "foo@example.com",
  "password": "****",
};


var registerJSONMessage = JSON.stringify(registerJSON, undefined, 2);

  return (
    <div className="m-4">
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">Documentation</h1>
        </div>
      </div>
      <h2 className="cover-heading">Authentication APIs</h2>
      <h3 className="cover-heading">User Registeration</h3>
      <p className="lead border p-2">
        POST: /api/register
      </p>
      <p className="border p-2">
      <pre>
        <code>
          {registerJSONMessage}
        </code>
      </pre>
      </p>

      
    </div>
  );
};

export default Documentation;
