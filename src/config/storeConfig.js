import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

export function configureStore(){
	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
	const store = createStoreWithMiddleware(reducers);
	return store;
}
export const store = configureStore();