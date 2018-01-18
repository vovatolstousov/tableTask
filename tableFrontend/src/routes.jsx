import React from 'react';
import Route from 'react-router/es/Route';
import {Switch} from 'react-router-dom';
import Index from './pages/Index';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store from './store';


const history = createBrowserHistory();

export default () =>
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={Index}/>
            </Switch>
        </ConnectedRouter>
    </Provider>

