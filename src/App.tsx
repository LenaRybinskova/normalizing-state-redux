import React, { useEffect } from "react";
import "./App.css";
import { PostsPage } from "../src/pages/PostsPage";
import { Provider } from "react-redux";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useState } from "react";


function App(props: any) {
  const [theme, setTheme] = useState("light");

  const toggletheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Provider store={props.store}>
      <GlobalStyles />
      <div className="AppContainer">
        <PostsPage />
        <button onClick={toggletheme}>смена темы</button>
      </div>
    </Provider>
  );
}

export default App;
