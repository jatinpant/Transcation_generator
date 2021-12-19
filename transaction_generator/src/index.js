import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Receipt from "./receipt";
import { DataProvider, initValue } from "./context";

const Component = () => {
  const [context, setContext] = useState(initValue);
  const updateContext = (contextUpdates = {}) =>
    setContext((currentContext) => ({ ...currentContext, ...contextUpdates }));

  useEffect(() => {
    updateContext({
      setData: (value) => updateContext({ data: value })
    });
  }, []);

  return (
    <React.StrictMode>
      <DataProvider value={context}>
        <Router>
          <Switch>
            <Route exact path="/receipt">
              <Receipt />
            </Route>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </DataProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Component />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
