import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";

const PdfDocument = ({subject, content} : {subject: string, content: string}) => {
  return (
    <Document>
      <Page>
        <View>
          <Text style={{padding: "5px", fontSize:"large", fontWeight:"bold"}}>
              {subject} :
          </Text>
        </View>
        <View>
            <Text style={{margin:"10px"}}>
            {content}
            </Text>
        </View>
      </Page>
      
    </Document>
  );
};

export default PdfDocument;
