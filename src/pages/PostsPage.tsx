import { useSelector } from "react-redux";
import { Post } from "features/posts/components/Post";
import { AppRootStateType, useAppDispatch } from "features/app/store";
import { useEffect } from "react";
import { fetchPosts } from "features/posts/posts-reducer";
import styled from "styled-components";
import { List } from "../../src/styles/List";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background-color: var(--background-post-color);
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 3px 9px 24px 12px;
`;

export const PostsPage = () => {
  const ids = useSelector((state: AppRootStateType) => state.posts.allIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <PostsContainer>
      <List>
        {ids.map((id) => (
          <Post key={id} postId={id} />
        ))}
      </List>
    </PostsContainer>
  );
};
