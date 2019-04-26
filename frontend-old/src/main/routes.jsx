import React from 'react';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

// import App from './app';
import AuthOrApp from './authOrApp';
import Dashboard from '../dashboard/dashboard';
import Client from '../client/client';
import Product from '../product/product';
import Animal from '../animal/animal';
import Purchase from '../purchase/purchase';
import Sale from '../sale/sale';

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='clients' component={Client} />
            <Route path='products' component={Product} />
            <Route path='animals' component={Animal} />
            <Route path='purchases' component={Purchase} />
            <Route path='sales' component={Sale} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
);
