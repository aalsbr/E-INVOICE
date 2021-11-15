import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import myStore from "./reducers/store";
import InvoiceContiner from "./components/InvoiceContiner";
import Search from "./components/Search";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./components/Login";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}>
 <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
