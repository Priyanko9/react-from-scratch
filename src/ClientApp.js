import React from 'react';
import {hydrate,render} from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

import './App.css';
import App from './App';


hydrate(<App />
,document.getElementById('root'));
