import React, { useEffect } from "react";
import "./App.css";
import { PostsPage } from "../src/pages/PostsPage";
import { useState } from "react";
import { Button } from "../src/features/posts/components/Button";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="AppContainer">
      <Header className="Header">
        <Button text="смена темы" callback={setTheme} theme={theme} />
      </Header>
      <Content className="Content">
        <PostsPage />
      </Content>
    </div>
  );
}

export default App;
