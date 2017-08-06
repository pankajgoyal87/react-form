import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Route} from 'react-router';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './containers/App';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
	<Provider store = {store}>
		<HashRouter>
			<div>
			<Route exact path = "/" component = {App} />
			</div>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);