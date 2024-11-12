import {useDispatch} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {PostsActions, postsReducer} from 'features/posts/posts-reducer';
import {AuthorActions, authorsReducer} from 'features/posts/authors-reducer';
import {commentsReducer} from 'features/posts/comments-reducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    authors: authorsReducer,
    comments: commentsReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppAction=PostsActions | AuthorActions
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AppAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();


// @ts-ignore
window.store=store