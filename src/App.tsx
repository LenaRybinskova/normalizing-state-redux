import React from 'react';
import './App.css';
import {PostsPage} from '../src/pages/PostsPage';
import {Provider} from 'react-redux';



function App(props:any) {

    return (
        <Provider store={props.store}>
            <PostsPage/>
        </Provider>
    );
};

export default App;
