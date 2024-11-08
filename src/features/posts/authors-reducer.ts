import {AuthorAPIType} from '../../../src/api/api';
import {mapToLookup, PostsActions} from './posts-reducer';


const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';

export type PostType = {
    id: number;
    text: string;
    likes: number;
    author: number;
};

export const initialState = {
    allIds: [] as number[], // [idAuthor, idAuthor]
    byId: {} as { [key: string]: AuthorAPIType } // { ["idAuthor"]: {{ idAuthor: number; name: string }}}
};
type InitialStateType = typeof initialState;


export const authorsReducer = (state: InitialStateType = initialState, action: PostsActions): InitialStateType => {
    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS': {
            return {
                ...state,
                allIds: action.payload.posts.map(p => p.author.id),
                byId: mapToLookup(action.payload.posts.map(p => p.author)),
            };
        }

        default:
            return state
    }
};


