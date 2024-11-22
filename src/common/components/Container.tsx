import styled, { css } from "styled-components";

const StyledContainer = styled.li<{ post?: any; comment?: any }>`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    border-radius: 15px;
    
    ${(props) =>
            props.post &&
            css`
                flex-direction: column;
                background-color: var(--background-post-color);
                box-shadow: rgba(149, 157, 165, 0.2) 3px 9px 24px 12px;
            `}

    ${(props) =>
            props.comment &&
            css`
                flex-direction: row;
                align-items: center;
                background-color: var(--background-comment-color);
                gap: 10px;
            `}
`;

type Props = {
  children: React.ReactNode;
  post?: any;
  comment?: any;
};

export const Container = ({ children, post, comment }: Props) => {
  return (
    <StyledContainer post={post} comment={comment}>
      {children}
    </StyledContainer>
  );
};
