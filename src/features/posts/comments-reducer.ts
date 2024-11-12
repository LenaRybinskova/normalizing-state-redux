import {apiPosts, CommentAPIType} from '../../api/apiPosts';
import {fetchPostsSuccess, mapToLookup} from './posts-reducer';
import {Dispatch} from 'redux';
import {apiComment} from '../../../src/api/apiComment';

export type CommentType = Omit<CommentAPIType, 'author'> & {
    authorId: number
}


const UPDATE_AUTHORS_SUCCESS = 'UPDATE_AUTHORS_SUCCESS';
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
const DElETE_COMMENTS_SUCCESS = 'DElETE_COMMENTS_SUCCESS';

export const initialState = {
    allIds: [] as number[], // [idAuthor, idAuthor]
    byId: {} as { [key: string]: CommentType } // { ["idComm"]: {{ idComm: number; name: string, authorId:number }}}
};
type InitialStateType = typeof initialState;


export const commentsReducer = (state: InitialStateType = initialState, action: ReturnType<typeof fetchPostsSuccess> | AuthorActions): InitialStateType => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS': {

            const lookupTable = mapToLookup(action.payload.posts.map(p => p.lastComments).flat().map(c => {
                const comment: CommentType = {
                    id: c.id, text: c.text,
                    authorId: c.author.id,
                }
                return comment
            }))

            return {
                ...state,
                //allIds: action.payload.posts.map(p => p.author.id), //этот ключ можно не создавать
                byId: {...state.byId, ...lookupTable},
            };
        }
        case 'FETCH_COMMENTS_SUCCESS': {

            const lookupTable = mapToLookup(action.payload.comments.map(c => {
                const comment: CommentType = {
                    id: c.id, text: c.text,
                    authorId: c.author.id,
                }
                return comment
            }))

            return {...state, byId: {...state.byId, ...lookupTable}};
        }
        case 'DElETE_COMMENTS_SUCCESS': {
            const coptState={...state.byId}
            delete coptState[action.payload.commentId]

            return {...state,
                allIds: state.allIds.filter(id => id !== action.payload.commentId),
                byId: coptState
            }
        }
        default:
            return state
    }
};

//AC
export const updateAuthorsSuccess = (authorId: number, newName: string) => {
    return {
        type: UPDATE_AUTHORS_SUCCESS, payload: {authorId, newName}
    } as const
}

export const fetchPostCommentSuccess = (postId: number, comments: CommentAPIType[]) => {
    return {
        type: FETCH_COMMENTS_SUCCESS, payload: {postId, comments}
    } as const
}

export const deletePostCommentSuccess = (postId: number, commentId: number) => {
    return {
        type: DElETE_COMMENTS_SUCCESS, payload: {postId, commentId}
    } as const
}

//TC
export const fetchPostComment = (postId: number) => async (dispatch: Dispatch) => { //запросить все комментарии
    const res = await apiPosts.getComments(postId)
    dispatch(fetchPostCommentSuccess(postId, res))
}

export const deletePostComment = (postId: number, commentId: number) => async (dispatch: Dispatch) => {
    const res = await apiComment.deleteComment(postId, commentId)
    dispatch(deletePostCommentSuccess(postId, commentId))
}


export type UpdateAuthorsSuccess = ReturnType<typeof updateAuthorsSuccess>;
export type FetchCommentSuccess = ReturnType<typeof fetchPostCommentSuccess>;
export type DeletePostCommentSuccess = ReturnType<typeof deletePostCommentSuccess>;
export type AuthorActions = UpdateAuthorsSuccess | FetchCommentSuccess | DeletePostCommentSuccess
