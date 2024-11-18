import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "features/app/store";
import {
  CommentType,
  deletePostComment
} from "features/posts/comments-reducer";
import { AuthorAPIType } from "api/apiPosts";
import styled from "styled-components";

const CommentContainer = styled.li`
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
    <CommentContainer>
      <b>{authorComment.name}</b>
      <div>Comments: {comment.text}</div>
      <button onClick={() => dispatch(deletePostComment(postId, id))}>
        удалить пост
      </button>
    </CommentContainer>
  );
};
