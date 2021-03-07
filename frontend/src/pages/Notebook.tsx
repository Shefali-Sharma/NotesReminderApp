import React from "react";
import { Container, Grid, Table } from "semantic-ui-react";

const tableData = [
  { subject: "Note1" },
  { subject: "Note 2" },
  { subject: "First Note" },
  { subject: "Second Note" },
];

const Notebook = () => {
  var data = tableData;

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-1 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <span data-feather="home"></span>
                  All Notes
                </a>
              </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>NoteBooks</span>
              <a
                className="link-secondary"
                href="#"
                aria-label="Add a new report"
              >
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              {data.map(({ subject }: { subject: string }) => (
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    {subject}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <h2>Notes</h2>
                <div className="table-responsive">
                  <Table sortable celled fixed>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Note Subjects</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {data.map(({ subject }: { subject: string }) => (
                        <Table.Row key={subject}>
                          <Table.Cell>{subject}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              </Grid.Column>
              <Grid.Column>
                <h2>Note 1</h2>
                <Container>Hello World!</Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </main>
      </div>
    </div>
  );
};

export default Notebook;
