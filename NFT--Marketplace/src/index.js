import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from "recoil"

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
        <App/>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);

