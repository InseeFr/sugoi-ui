import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppReducer from '../redux/reducers/app';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
	app: AppReducer,
});

const Store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;

export default Store;
