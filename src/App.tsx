import React from 'react';
import './App.css';
import {PostsPage} from '../src/pages/PostsPage';
import {Provider} from 'react-redux';
import {store} from './features/app/store';


function App(props: any) {
    return (
        <Provider store={store}>
            <PostsPage/>
        </Provider>
    );
};

export default App;
