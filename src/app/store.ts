import {AppActions, appReducer} from 'app/app-reducer';
import {useDispatch} from 'react-redux';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {PostsActions, postsReducer} from 'features/posts/model/posts-reducer';
import {AuthorActions, authorsReducer} from 'features/authors/model/authors-reducer';
import {commentsReducer} from 'features/comments/model/comments-reducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    authors: authorsReducer,
    comments: commentsReducer,
    app: appReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppAllAction = PostsActions | AuthorActions | AppActions;
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AppAllAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// @ts-ignore
window.store = store;
