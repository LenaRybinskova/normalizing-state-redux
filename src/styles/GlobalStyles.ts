import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

 html {
    font-size: 16px;
}

textarea {
  all: unset; /* Или используйте сброс вручную */
  box-sizing: border-box;
}

:root {
    --font-size: 16px; 
    --primary-font: 'Nunito Sans', sans-serif;
    --base-line-height: 20px;
    --background-color: #edeef0;
    --background-post-color: #ffffff;
    --background-like-color:#f0f2f5;
    --background-like-text-color:#6b6d5d;
    --text-color:#000001;
    --text-color-hover:#5184bf;
}

body {
    font-family: var(--primary-font); 
    font-size: 1rem; 
    line-height: var(--base-line-height); 
    background-color: var(--background-color);
    color:--var(--text-color)
    display:flex;
}

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }
`;

// #ffffff post
// #ebf2fa button
// #5485bc button text
// #f0f2f5 for likes
// box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
