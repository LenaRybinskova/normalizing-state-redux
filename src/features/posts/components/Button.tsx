import styled from "styled-components";

const StyledButton = styled.button`
  padding: 7px;
  border-radius: 15px;
  border: 1px solid var(--text-color);
  background-color: var(--background-comment-color);
  cursor: pointer;
  font-famiy: var(--primary-font);
  color: var(--text-color);
  position: absolute;
  top: 30px;

  &: hover {
    background-color: var(--text-color-hover);
    outline: 2px solid var(--background-like-color);
    outline-offset: -1px;
  }
`;

type Props = {
  callback: (theme: string) => any;
  text: string;
  theme: string;
};

export const Button = ({ callback, text, theme }: Props) => {
  const handler = () => {
    callback(theme === "light" ? "dark" : "light");
  };

  return <StyledButton onClick={handler}>{text}</StyledButton>;
};
