import React from "react";
import "./App.css";
import { PostsPage } from "../src/pages/PostsPage";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";

function App(props: any) {
  return (
    <Provider store={props.store}>
      <GlobalStyles />
      <PostsPage />
    </Provider>
  );
}

export default App;
