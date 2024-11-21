import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "features/app/store";
import {
  CommentType,
  deletePostComment
} from "features/posts/comments-reducer";
import { AuthorAPIType } from "api/apiPosts";
import styled from "styled-components";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/basket.svg";
import {Container} from "../../../styles/Container"



const AvatarAuthor = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  transition-duration: 0.9s;
  color: var(--text-color);

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: none;
    color: var(--background-like-text-color);
    background: none;
    padding: 0;
  }

  & svg {
    width: 16px;
    height: 16px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  & svg:hover {
    opacity: 0.5;
  }
`;

const CommentContentText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-star;
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.5;

  & span {
    font-weight: 700;
  }
`;

type Props = {
  id: number;
  postId: number;
};

export const Comment = ({ id, postId }: Props) => {
  const comment = useSelector<AppRootStateType, CommentType>(
    (state) => state.comments.byId[id]
  );
  const authorComment = useSelector<AppRootStateType, AuthorAPIType>(
    (state) => state.authors.byId[comment.authorId]
  );
  const dispatch = useAppDispatch();

  return (
    <>
      <Container comment>
        <AvatarAuthor src={authorComment.avatar} />
        <CommentContent>
          <CommentContentText>
            <span>{authorComment.name}</span>
            <p> {comment.text}</p>
          </CommentContentText>
          <button onClick={() => dispatch(deletePostComment(postId, id))}>
            <DeleteIcon />
          </button>
        </CommentContent>
      </Container>
    </>
  );
};
