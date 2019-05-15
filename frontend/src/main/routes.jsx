import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Dashboard from '../dashboard/dashboard';
import Client from '../client/client';
import Provider from '../provider/provider';
import Product from '../product/product';
import Animal from '../animal/animal';
import Purchase from '../purchase/purchase';
import Sale from '../sale/sale';

export default props => (
    <div className='content-wrapper'>
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/clients' component={Client} />
            <Route path='/providers' component={Provider} />
            <Route path='/products' component={Product} />
            <Route path='/animals' component={Animal} />
            <Route path='/purchases' component={Purchase} />
            <Route path='/sales' component={Sale} />
            <Redirect from='*' to='/' />
        </Switch>
    </div>
);
