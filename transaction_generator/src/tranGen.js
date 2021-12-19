import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ReactCountryFlag from "react-country-flag"
import ReactDOMServer from "react-dom/server";
import CssBaseline from "@mui/material/CssBaseline";
import Body from "./receipt/body";
import { ServerStyleSheets } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Input,
  textArea,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Flag, TextArea } from "semantic-ui-react";
import axios from "axios";
import { formatEther } from "@ethersproject/units";
import { COV_URI, API_KEY, NET_ITEMS, EMAIL_SERVER, CUR_NAME, OTHER_USD, CSS_STYLE } from "./constant";
import DataContext from "./context";
import Icon from "react-crypto-icons";
import { useEffect } from "react";

const FlowCell = withStyles({
  root: {
    overflowWrap: "anywhere",
  },
})(TableCell);
const ColoredItem = withStyles({
  root: {
    color: "black",
  },
})(MenuItem);

export default function TranGen() {
  const history = useHistory();
  const receiptData = useContext(DataContext);
  const [txHash, setTxHash] = useState("");
  const [txData, setTxData] = useState(null);
  const [date, setDate] = useState("");
  const [netId, SetNetId] = useState(1);
  const [currency, setCurrency] = useState(1)
  const [logoApi, setLogoApi] = useState([])
  const [email, setEmail] = useState("")
  const [desclaimer, setDesclaimer] = useState(`You are receiving this email because you made at purchase at
  covalent. Covalent partners with covalent to provide secure
  invoicing and payments processing.`);

  console.log("receiptData: ", receiptData)



  const handleView = () => {
    axios
      .get(`${COV_URI}/${netId}/transaction_v2/${txHash}/?key=${API_KEY}`)
      .then((res) => {
        //console.log("data", res.data.data)
        if (
          res.data.data.items[0].log_events.length > 0 &&
          res.data.data.items[0].log_events[0].sender_contract_ticker_symbol ==
            null
        )
          window.alert("Wrong Coin");
        else {
          setTxData(res.data.data.items[0]);
          setDate(res.data.data.updated_at);
          receiptData.setData({
            ...res.data.data.items[0],
            date: res.data.data.updated_at,
            net: netId,
            curr: currency,
            desclaimer: desclaimer,
          });
        }
      })
      .catch((err) => window.alert("Unable to get data"));
  };

  useEffect(() => {
    axios
      .get(`https://api.covalenthq.com/v1/chains/status/?key=ckey_docs`)
      .then((res) => {
        console.log("response:",res.data.data.items)
        setLogoApi(res.data.data.items)
      })
  }, [])

  useEffect(() => {
    let rData = JSON.parse(JSON.stringify(receiptData.data))
                rData.curr = currency
                receiptData.setData(
                  rData
                )
  }, [currency])

  const sheets = new ServerStyleSheets();

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
        senderEmail: " " ,
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
    <Box p={1}>
      <Box mb={4}>
        <Typography variant="h3">
          View information about a specific transaction hash
        </Typography>
      </Box>

      <Box display="flex" mb={2}>
        <Input
          fullWidth
          sx={{ mr: 1, border: 1, borderRadius: 2 }}
          placeholder="enter transaction hash"
          onChange={(ev) => setTxHash(ev.target.value)}
        />
        <Box sx={{ width: 100, mr: 1 }} borderRadius={2} border={1}>
          <Select
            fullWidth
            value={netId}
            defaultValue={1}
            onChange={(ev) => SetNetId(ev.target.value)}
          >
            {logoApi.map((item, i) => (
              <ColoredItem key={item.chain_id} value={item.chain_id}>
                {i % 2 === 0 && <img src={item.logo_url} height={20} width={20}></img>}
              </ColoredItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: 300, mr: 1 }} borderRadius={2} border={1}>
            <Select
              // sx={{width: "150px", mt:"10px", color:"white"}}
              fullWidth
              id="demo-simple-select"
              value={currency}
              onChange={(event) => {
                setCurrency(event.target.value)
              }}
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
        </Box>
        <Button
          size="large"
          variant="contained"
          color="success"
          onClick={handleView}
        >
          View
        </Button>
      </Box>
      <Box marginTop="10px" display="flex" alignItems="center">
          <Typography color="white" marginRight="10px">
            To:
          </Typography>
          <Input
            placeholder="Enter a receive email"
            sx={{ color: "white", marginRight: "20px" }}
            onClick={(ev) => setEmail(ev.target.value)}
          />
          <Button
            color="success"
            size="large"
            variant="contained"
            onClick={emailSend}
            style={{marginRight: "20px"}}
          >
            Send
          </Button>
            <TextArea
            fullWidth
            sx={{ border: 1, borderRadius: 2}}
            placeholder="Enter your Desclaimer"
            style={{ width: "100%", backgroundColor: "#05182b", color: "white" }}
            value={desclaimer}
            onChange={(ev) => setDesclaimer(ev.target.value)}
          />
        </Box>

      <Box mb={4}>
        {txData && (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 4, md: 8 }}
          >
            <Grid item xs={12} sm={4}>
              <Typography
                color="yellow"
                sx={{ overflowWrap: "anywhere" }}
                vairant="h6"
              >
                {txData.from_address}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              alignItems="center"
              sx={{ overflowWrap: "anywhere" }}
            >
              <ArrowForwardIcon fontSize="large" />
              <Typography color="yellow" textOverflow="clip" vairant="h6">
                {txData.log_events.length == 0
                  ? txData.to_address
                  : txData.log_events[0].decoded.params[1].value}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              display="flex"
              justifyContent="flex-end"
              sx={{ overflowWrap: "anywhere" }}
              alignItems="center"
            >
              <Typography
                color="yellow"
                textOverflow="clip"
                vairant="h6"
                mr={1}
              >
                {txData.log_events.length == 0
                  ? parseFloat(formatEther(txData.value)).toFixed(3) + " ETH"
                  : txData.log_events[0].decoded.params[2].value.slice(
                      0,
                      -1 * txData.log_events[0].sender_contract_decimals
                    ) +
                    "." +
                    txData.log_events[0].decoded.params[2].value.slice(
                      -1 * txData.log_events[0].sender_contract_decimals,
                      -1 * txData.log_events[0].sender_contract_decimals + 3
                    ) +
                    " " +
                    txData.log_events[0].sender_contract_ticker_symbol}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  history.push("/receipt")
                  let rData = JSON.parse(JSON.stringify(receiptData.data))
                    rData.curr = currency
                    receiptData.setData(
                    rData
                  )
              }}
              >
                View Receipt
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>

      <Box>
        <Box textAlign="center">
          <Typography variant="h4">Summary</Typography>
        </Box>
        {txData && (
          <Grid container columnSpacing={4}>
            <Grid item xs={12} sm={6}>
              <TableContainer
                component={Paper}
                style={{ backgroundColor: "#05182b" }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <FlowCell>Property</FlowCell>
                      <FlowCell>Value</FlowCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <FlowCell>Received Time</FlowCell>
                      <FlowCell>{new Date(date).toLocaleString()}</FlowCell>
                    </TableRow>
                    <TableRow>
                      <FlowCell>Symbol</FlowCell>
                      <FlowCell>
                        {txData.log_events.length == 0 ? (
                          <Icon name="eth" size={25} />
                        ) : (
                          <Icon
                            name={txData.log_events[0].sender_contract_ticker_symbol?.toLowerCase()}
                            size={25}
                          />
                        )}
                      </FlowCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TableContainer
                component={Paper}
                style={{ backgroundColor: "#05182b" }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <FlowCell>Property</FlowCell>
                      <FlowCell>Value</FlowCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <FlowCell>Transaction Fee</FlowCell>
                      <FlowCell>
                        {parseFloat(
                          formatEther(
                            (txData.gas_spent * txData.gas_price).toString()
                          )
                        ).toFixed(3)}
                        ETH
                      </FlowCell>
                    </TableRow>
                    <TableRow>
                      <FlowCell>Transaction Fee({CUR_NAME[currency]})</FlowCell>
                      <FlowCell>{txData.gas_quote.toFixed(2) * OTHER_USD[currency]} {CUR_NAME[currency]}</FlowCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
