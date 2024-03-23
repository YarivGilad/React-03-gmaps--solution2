import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./styles/global.styles.css";
import App from "./view/App";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
