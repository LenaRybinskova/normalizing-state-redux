import {Dispatch} from 'redux';
import {api, PostType} from '../../../src/api/api';

const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
//было
/*
const state = {
    items: [
        {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}},
        {id: 2,text: 'React', likes: 11,author: {id: 21, name: 'Valera'}}
    ]
}
*/

//стало
/*
const state = {
    allIds:[1, 2],
    byId:{
      "1": {id: 1, text: 'hello', likes: 10, author: {id: 1, name: 'Dima'}},
      "2": {id: 2,text: 'React', likes: 11,author: {id: 21, name: 'Valera'}}
    }
}
*/

export const initialState = {
    // items: [] as PostType[],
    allIds: [] as number[],
    byId: {} as { [key: string]: PostType }
};
type InitialStateType = typeof initialState;

const mapToLookup = (items: any[]) => {
    return items.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {})
}

export const postsReducer = (
    state: InitialStateType = initialState,
    action: PostsActions
): InitialStateType => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS': {
            return {
                ...state,
                allIds: action.payload.posts.map(p => p.id),
                byId: mapToLookup(action.payload.posts)
            };
        }
        case 'UPDATE_POST_TEXT': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {...state.byId[action.payload.postId], text: action.payload.text}}}}
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

