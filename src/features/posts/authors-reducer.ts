import {api, AuthorAPIType} from '../../../src/api/api';
import {fetchPostsSuccess, mapToLookup} from './posts-reducer';
import {Dispatch} from 'redux';


const UPDATE_AUTHORS_SUCCESS = 'UPDATE_AUTHORS_SUCCESS';

export const initialState = {
    allIds: [] as number[], // [idAuthor, idAuthor]
    byId: {} as { [key: string]: AuthorAPIType } // { ["idAuthor"]: {{ idAuthor: number; name: string }}}
};
type InitialStateType = typeof initialState;


export const authorsReducer = (state: InitialStateType = initialState, action: ReturnType<typeof fetchPostsSuccess> | AuthorActions): InitialStateType => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS': {
            return {
                ...state,
                allIds: action.payload.posts.map(p => p.author.id),
                byId: mapToLookup(action.payload.posts.map(p => p.author)),
            };
        }
        case 'UPDATE_AUTHORS_SUCCESS': {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.authorId]: {
                        ...state.byId[action.payload.authorId],
                        name: action.payload.newName
                    }
                }
            };
        }
        default:
            return state
    }
};

//AC
export const updateAuthorsSuccess = (authorId: number, newName: string) => {
    return {
        type: UPDATE_AUTHORS_SUCCESS, payload:{authorId, newName}
    } as const
}

//TC

export const updateAuthor=(authorId: number, newName: string)=>async (dispatch:Dispatch)=>{
    await api.updateAuthor(authorId,newName)
    dispatch(updateAuthorsSuccess(authorId,newName ))
}

export type UpdateAuthors = ReturnType<typeof updateAuthorsSuccess>;
export type AuthorActions = UpdateAuthors;
