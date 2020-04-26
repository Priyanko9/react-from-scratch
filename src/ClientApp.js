import React from 'react';
import {hydrate,render} from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

import './App.css';
import App from './App';
import { store } from './utilities/store';

render(<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter>,document.getElementById('root'));
