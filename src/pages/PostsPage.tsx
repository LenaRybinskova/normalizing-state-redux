import { useDispatch, useSelector } from "react-redux";
import { Post } from "../features/posts/components/Post";
import { AppRootStateType, useAppDispatch } from "../features/app/store";
import { useEffect } from "react";
import { fetchPosts } from "../features/posts/reducer";

export const PostsPage = () => {
  const items = useSelector((state: AppRootStateType) => state.posts.items);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      {items.map((i) => (
        <Post key={i.id} post={i} />
      ))}
    </div>
  );
};
