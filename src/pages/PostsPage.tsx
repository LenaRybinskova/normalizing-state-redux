import { useSelector } from "react-redux";
import { Post } from "features/posts/components/Post";
import { AppRootStateType, useAppDispatch } from "features/app/store";
import { useEffect } from "react";
import { fetchPosts } from "features/posts/posts-reducer";
import styled from "styled-components";
import { List } from "../../src/styles/List";
import { Loader } from "../features/posts/components/Loader";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

export const PostsPage = () => {
  const ids = useSelector((state: AppRootStateType) => state.posts.allIds);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (ids.length === 0) {
    return <Loader />;
  }

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

