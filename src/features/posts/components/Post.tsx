import React, { useEffect, useState } from "react";
import { PostType, updatePost } from "features/posts/posts-reducer";
import { AppRootStateType, useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { updateAuthor } from "features/posts/authors-reducer";
import { Comment } from "features/posts/components/Comment";
import { fetchPostComment } from "features/posts/comments-reducer";
import styled from "styled-components";

type Props = {
  postId: number;
};

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  //   background-color: bisque;
`;

const CommnetsPost = styled.div`
  display: flex;
  //   background-color: red;
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;

  & img {
    width: 50px;
    border-radius: 50%;
  }
`;

const PostText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 3px;
`;

const Line = styled.div`
  border-bottom: 1px solid var(--background-like-color);
`;

export const Post = ({ postId }: Props) => {
  const post = useSelector<AppRootStateType, PostType>(
    (state) => state.posts.byId[postId]
  );
  const author = useSelector<AppRootStateType, any>(
    (state) => state.authors.byId[post.authorId]
  );

  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState<string>(post.text);
  const [name, setName] = useState<string>(author.name);

  useEffect(() => {
    setName(author.name);
  }, [author]);

  const dispatch = useAppDispatch();

  return (
    <>
      <PostHeader>
        <PostTitle>
          <img src={author.avatar} />
          {!editMode ? (
            <b
              onClick={() => {
                setEditMode(true);
              }}
            >
              {name}
            </b>
          ) : (
            <textarea
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                dispatch(updateAuthor(author.id, name));
                setEditMode(false);
              }}
            ></textarea>
          )}
        </PostTitle>

        <PostText>
          {!editMode && (
            <span onDoubleClick={() => setEditMode(true)}>{text}</span>
          )}
        </PostText>
      </PostHeader>
      <Line></Line>
      <CommnetsPost>
        {editMode && (
          <textarea
            value={text}
            onChange={(event) => {
              setText(event.currentTarget.value);
            }}
            onBlur={() => {
              dispatch(updatePost(post.id, text));
              setEditMode(false);
            }}
          >
            {text}
          </textarea>
        )}
        <br />
        likes:{post.likes}
        <div>Comments:</div>
        <ul>
          {post.commentsIds.map((id) => (
            <Comment key={id} id={id} postId={postId} />
          ))}
        </ul>
        <button onClick={() => dispatch(fetchPostComment(postId))}>
          all comments
        </button>
      </CommnetsPost>

      <hr />
    </>
  );
};
