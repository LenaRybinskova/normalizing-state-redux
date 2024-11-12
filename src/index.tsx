import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from '../src/App'
import {store} from 'features/app/store';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <App store={store}/>

);