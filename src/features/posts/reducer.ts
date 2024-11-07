import { Dispatch } from "redux";
import { PostType } from "./../../api/api";
import { api } from "./../../api/api";

const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";

export const initialState = {
  items: [] as PostType[]
};

export const postsReducer = (
  state: InitialStateType = initialState,
  action: FetchPosts
): InitialStateType => {
  switch (action.type) {
    case "FETCH_POSTS_SUCCESS":
      {
        return { ...state, items: action.payload.posts };
      }
    default:
      return state
  }
};
//AC
export const fetchPostsSuccess = (posts: PostType[]) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {
      posts
    }
  } as const;
};

//TC
export const fetchPosts = () => async (dispatch: Dispatch<any>) => {
  const posts = await api.getPosts();
  dispatch(fetchPostsSuccess(posts));
};

export type FetchPosts = ReturnType<typeof fetchPostsSuccess>;
type InitialStateType = typeof initialState;
