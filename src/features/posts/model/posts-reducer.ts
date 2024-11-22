import {Dispatch} from 'redux';
import {apiPosts, PostAPIType} from 'features/posts/api/apiPosts';
import {DeletePostCommentSuccess, FetchCommentSuccess} from 'features/comments/model/comments-reducer';

const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
const HIDE_COMMENTS = 'HIDE_COMMENTS';


export type PostType = {
    id: number;
    text: string;
    likes: number;
    authorId: number;
    commentsIds: number[];
};

export const initialState = {
    allIds: [] as number[],
    byId: {} as { [key: string]: PostType }
};
type InitialStateType = typeof initialState;

type LookupTableType<T> = { [key: string]: T };

export const mapToLookup = <T extends { id: number }>(
    items: T[]
): LookupTableType<T> => {
    const acc: LookupTableType<T> = {};
    return items.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, acc);
};

export const postsReducer = (
    state: InitialStateType = initialState,
    action: PostsActions
): InitialStateType => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS': {
            return {
                ...state,
                allIds: action.payload.posts.map((p) => p.id),
                byId: mapToLookup(
                    action.payload.posts.map((p) => {
                        const copy: PostType = {
                            id: p.id,
                            likes: p.likes,
                            text: p.text,
                            authorId: p.author.id,
                            commentsIds: p.lastComments.map((c) => c.id)
                        };

                        return copy;
                    })
                )
            };
        }
        case 'UPDATE_POST_TEXT': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        text: action.payload.text
                    }
                }
            };
        }
        case 'FETCH_COMMENTS_SUCCESS': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        commentsIds: action.payload.comments.map((c) => c.id)
                    }
                }
            };
        }

        case 'DElETE_COMMENTS_SUCCESS': {
            const post = state.byId[action.payload.postId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...post,
                        commentsIds: post.commentsIds.filter(
                            (id) => id !== action.payload.commentId
                        )
                    }
                }
            };
        }

        case 'HIDE_COMMENTS': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        commentsIds: []
                    }
                }
            };
        }
        default:
            return state;
    }
};

//AC
export const fetchPostsSuccess = (posts: PostAPIType[]) => {
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

export const hideAllComments = (postId: number) => {
    return {
        type: HIDE_COMMENTS,
        payload: {postId}
    } as const;
};

//TC
export const fetchPosts = () => async (dispatch: Dispatch<any>) => {
    const posts = await apiPosts.getPosts();
    dispatch(fetchPostsSuccess(posts));
};

export const updatePost =
    (postId: number, text: string) => async (dispatch: Dispatch) => {
        const res = await apiPosts.updatePost(postId, text);
        dispatch(updatePostSuccess(postId, text));
    };

export type hideAllCommentsType = ReturnType<typeof hideAllComments>;
export type PostsActions =
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof updatePostSuccess>
    | FetchCommentSuccess
    | DeletePostCommentSuccess
    | hideAllCommentsType;


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