import React, { useEffect } from "react";
import "./App.css";
import { PostsPage } from "../src/pages/PostsPage";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useState } from "react";
import { Button } from "../src/features/posts/components/Button";

function App(props: any) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Provider store={props.store}>
      <GlobalStyles />
      <div className="AppContainer">
        <Button text="смена темы" callback={setTheme} theme={theme}></Button>
        <PostsPage />
      </div>
    </Provider>
  );
}

export default App;
