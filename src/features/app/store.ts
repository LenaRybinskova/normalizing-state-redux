import {useDispatch} from 'react-redux';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {postsReducer} from '../posts/reducer';

const rootReducer = combineReducers({
    posts: postsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
