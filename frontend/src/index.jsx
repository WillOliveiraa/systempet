import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import promise from 'redux-promise'; // que aguarda a request ser concluida
import multi from 'redux-multi'; //
import thunk from 'redux-thunk'; // ambos para fazerem várias request

// import App from './main/app';
import Routes from './main/routes';
// import AuthOrApp from './main/authOrApp';
import reducers from './main/reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__(); // para funcionar o redux no Chrome
// Aula Integrando Dashboard com redux 2
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);
ReactDOM.render(
    <Provider store={store}>
        {/* <App /> */}
        <Routes />
        {/* <AuthOrApp /> */}
    </Provider>, document.getElementById('app'));
