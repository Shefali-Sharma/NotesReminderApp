import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { Document, Page, PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";

const ShareNote = ({
  subject,
  content,
}: {
  subject: string;
  content: string;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!isClient) {
      setIsClient(true);
    }
  }, []);

  return (
    <Grid
      centered
      textAlign="right"
      style={{ height: "100vh" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ margin: "20px" }}>
        {isClient && (
          <PDFDownloadLink
            style={{fontWeight: "bold", 
                    textDecoration:"none", 
                    backgroundColor:"#EEEEEE", 
                    color:"#333333", 
                    padding:"7px", 
                    border:"1px",
                    borderStyle: "solid",
                    margin:"10px",
                }}
            document={<PdfDocument subject={subject} content={content} />}
            fileName="sharedNote.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Note"
            }
          </PDFDownloadLink>
        )}
        <br/>
        <PdfDocument subject={subject} content={content} />
      </Grid.Column>
    </Grid>
  );
};

export default ShareNote;
