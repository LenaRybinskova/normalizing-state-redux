import React from "react";
import { createRoot } from "react-dom/client";
import "app/index.css";
import App from "app/App";
import { store } from "app/store";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);
