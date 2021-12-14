import { combineReducers, createStore, applyMiddleware } from 'redux';
import AppReducer from '../redux/reducers/app';
import UserReducer from '../redux/reducers/user';
import NotifsReducer from '../redux/reducers/notifs';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
	app: AppReducer,
	user: UserReducer,
	notif: NotifsReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
