import {useDispatch} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {PostsActions, postsReducer} from 'features/posts/posts-reducer';
import {authorsReducer} from '../../../src/features/posts/authors-reducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    authors: authorsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, PostsActions>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
