import {Dispatch} from 'redux';
import {api, PostType} from '../../../src/api/api';

const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

const state = {
    items: [
        {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}},
        {id: 2,text: 'React', likes: 11,author: {id: 21, name: 'Valera'}}
    ]
}

export const initialState = {
    items: [] as PostType[]
};
type InitialStateType = typeof initialState;


export const postsReducer = (
    state: InitialStateType = initialState,
    action: PostsActions
): InitialStateType => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS': {
            return {...state, items: action.payload.posts};
        }
        case 'UPDATE_POST_TEXT': {
            return {
                ...state,
                items: state.items.map(p => p.id === action.payload.postId ? {...p, text: action.payload.text} : p)
            };
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
export const updatePostSuccess = (postId: number, text: string) => {
    return {
        type: UPDATE_POST_TEXT,
        payload: {
            postId,
            text
        }
    } as const;
};


//TC
export const fetchPosts = () => async (dispatch: Dispatch<any>) => {
    const posts = await api.getPosts();
    dispatch(fetchPostsSuccess(posts));
};

export const updatePost = (postId: number, text: string) => async (dispatch: Dispatch) => {
    const res = await api.updatePost(postId, text);
    dispatch(updatePostSuccess(postId, text));
};

export type PostsActions = ReturnType<typeof fetchPostsSuccess> | ReturnType<typeof updatePostSuccess>;
;

