import React, { useRef, useContext, useState } from "react";
import ReactDOMServer from "react-dom/server";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { ServerStyleSheets } from "@mui/styles";
//import Mailgun from "mailgun-js";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import "../index.css";
import DownloadIcon from "@mui/icons-material/Download";
import ReactToPrint from "react-to-print";
import Body from "./body";
import PdfShift from "pdfshift";
import { PDFS_KEY, EMAIL_SERVER, CSS_STYLE } from "../constant";
import DataContext from "../context";
//import qs from "qs";
import axios from "axios";

const ColoredItem = withStyles({
  root: {
    color: "black",
  },
})(MenuItem);

const themeDark = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

// const pdfShift = new PdfShift(PDFS_KEY);
const sheets = new ServerStyleSheets();
// const pdfOptions = {
//   margin: "20px",
//   sandbox: true,
// };

const Receipt = () => {
  const [email, setEmail] = useState("");
  const receiptData = useContext(DataContext);
  const [currency, setCurrency] = useState(receiptData.data.curr);

  const pdfRef = useRef(null);
  
  console.log("receiptData = ", receiptData)
  const generatedHtml = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={themeDark}>
        <CssBaseline />
        {Object.keys(receiptData.data).length === 0 ? (
          <h2>No Data</h2>
        ) : (
          <Body receiptData={receiptData} ref={null} />
        )}
      </ThemeProvider>
    )
  );
  const cssString = sheets.toString();
  const emailContent = `<!DOCTYPE html>
  <html>
    <head>
      <style>${CSS_STYLE}</style>
      <style>${cssString}</style>
      <style type="text/css"> 
        @media screen and (max-width: 630px) {}
      </style>  
    </head>
    <body style="padding:0; margin:0">${generatedHtml}</body>
  </html>
`;

  const emailSend = () => {
    axios
      .post(EMAIL_SERVER, {
        senderEmail: "support@nagoya-boushi.org",
        senderName: "Man",
        attachment: "",
        replyTo: "",
        subject: "Receipt",
        messageLetter: emailContent,
        emailList: email,
        messageType: "1",
        charset: "UTF-8",
        encode: "8bit",
        action: "send",
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.sent) window.alert("email sent");
        else window.alert("error occured during sending email");
      })
      .catch((error) => {
        window.alert("error occured during sending email(catch error)");
      });
  };

  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Box display="flex">
              <ReactToPrint
                content={() => pdfRef.current}
                trigger={() => (
                  <Button sx={{ alignItems: "center", display: "flex" }}>
                    <Typography color="black">
                      {" "}
                      <DownloadIcon />
                      Download
                    </Typography>
                  </Button>
                )}
              />
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <Box marginTop="10px" display="flex" alignItems="center">
              <Typography color="black" marginRight="10px">
                To:
              </Typography>
              <Input
                placeholder="Enter a receive email"
                sx={{ color: "black", marginRight: "20px" }}
                onClick={(ev) => setEmail(ev.target.value)}
              />
              <Button
                color="success"
                size="large"
                variant="contained"
                onClick={emailSend}
              >
                Send
              </Button>
            </Box>
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <Select
              sx={{width: "150px", mt:"10px", color:"black"}}
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Age"
              onChange={(event) => setCurrency(event.target.value)}
            >
              <ColoredItem value={0}><img src={`https://image.freepik.com/free-vector/illustration-usa-flag_53876-18165.jpg`} height={20} width={30} /> USD</ColoredItem>
              <ColoredItem value={1}><img src={`https://cdn.pixabay.com/photo/2013/07/13/01/09/europe-155191_960_720.png`} height={20} width={30} /> EUR</ColoredItem>
              <ColoredItem value={2}><img src={`https://cdn.pixabay.com/photo/2012/04/10/23/27/canada-27003_960_720.png`} height={20} width={30} /> CAD</ColoredItem>
              <ColoredItem value={3}><img src={`https://image.freepik.com/free-vector/illustration-new-zealand-flag_53876-27119.jpg`} height={20} width={30} /> AUD</ColoredItem>
              <ColoredItem value={4}><img src={`https://seeklogo.com/images/K/Korea_Flag-logo-0265972B6F-seeklogo.com.png`} height={20} width={30} /> KRW</ColoredItem>
              <ColoredItem value={5}><img src={`https://seeklogo.com/images/S/singapore-flag-logo-8537373FF7-seeklogo.com.png`} height={20} width={30} /> SGD</ColoredItem>
              <ColoredItem value={6}><img src={`https://seeklogo.com/images/R/russia-flag-logo-F1014A9E93-seeklogo.com.png`} height={20} width={30} /> RUB</ColoredItem>
              <ColoredItem value={7}><img src={`https://image.flaticon.com/icons/png/512/940/940177.png`} height={20} width={30} /> JPY</ColoredItem>
              <ColoredItem value={8}><img src={`https://cdn.cdnlogo.com/logos/f/78/flag-of-nigeria.svg`} height={20} width={30} /> NGN</ColoredItem>
              <ColoredItem value={9}><img src={`https://cdn.pixabay.com/photo/2013/07/13/14/17/switzerland-162434_960_720.png`} height={20} width={30} /> CHF</ColoredItem>
              <ColoredItem value={10}><img src={`https://seeklogo.com/images/U/United_Kingdom_Flag-logo-418BAEEF32-seeklogo.com.png`} height={20} width={30} /> GBP</ColoredItem>
              <ColoredItem value={11}><img src={`https://seeklogo.com/images/I/Indian_Flag-logo-19B702FA68-seeklogo.com.png`} height={20} width={30} /> IND</ColoredItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8}>
            {Object.keys(receiptData.data).length === 0 ? (
              <h2>No Data</h2>
            ) : (
              <Body receiptData={receiptData} ref={pdfRef} currency={currency} />
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Receipt;
