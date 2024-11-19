import styled from "styled-components";
import React from "react";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 15px;
`;

type Props = {
  children: React.ReactNode;
};

export const List = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
