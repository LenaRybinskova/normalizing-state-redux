import React from "react";
import "./App.css";
import { PostsPage } from "../src/pages/PostsPage";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";



function App(props: any) {
  return (
    <Provider store={props.store}>
      <GlobalStyles />
      <div className="AppContainer">
        <PostsPage />
      </div>
    </Provider>
  );
}

export default App;
