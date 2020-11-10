import { combineReducers } from 'redux';
import AppReducer from '../redux/reducers/app';
import { roleReducer } from '../redux/reducers/app';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	app: AppReducer,
	role: roleReducer,
});

const Store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default Store;
