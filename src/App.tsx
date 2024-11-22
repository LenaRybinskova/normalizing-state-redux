import React, { useEffect } from "react";
import "./App.css";
import { PostsPage } from "../src/pages/PostsPage";

import { useState } from "react";
import { Button } from "../src/features/posts/components/Button";
import styled from "styled-components";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <div className="AppContainer">
        <Button text="смена темы" callback={setTheme} theme={theme}></Button>
        <PostsPage />
      </div>
    </>
  );
}

export default App;

