import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
`
type Props = {
  children: React.ReactNode;
};

export const List = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
