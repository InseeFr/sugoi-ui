import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { enqueueSnackbar } from './../redux/actions/notif';
import Store from './store-configuration';

const isDebugMethod = (method: string | undefined) => {
	if (typeof method === 'undefined') {
		return true;
	}
	return ![
		'delete',
		'DELETE',
		// 'head',
		// 'HEAD',
		'post',
		'POST',
		'put',
		'PUT',
		'patch',
		'PATCH',
		// 'purge',
		// 'PURGE',
		// 'link',
		// 'LINK',
		// 'unlink',
		// 'UNLINK',
	].includes(method);
};

const isDebugError = (a: AxiosError) => {
	if (a.message === 'Operation canceled due to new request.') {
		return true;
	}
	return false;
};

export const getAuthClient = (accessToken?: string) => {
	const client = axios.create({
		baseURL: Store.getState().app.config.api,
	});
	client.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			Store.dispatch(
				enqueueSnackbar({
					subject:
						'Send request ' +
						(config.method as string).toUpperCase() +
						' ' +
						config.url,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'info',
					},
					debug: true,
				}),
			);
			config.headers['Authorization'] = 'Bearer ' + accessToken;
			return config;
		},
		(err) => {
			return Promise.reject(err);
		},
	);
	client.interceptors.response.use(
		async (response: AxiosResponse) => {
			Store.dispatch(
				enqueueSnackbar({
					subject: response,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'success',
					},
					debug: isDebugMethod(response.config.method),
				}),
			);
			return response;
		},
		(err) => {
			Store.dispatch(
				enqueueSnackbar({
					subject: err,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'error',
					},
					debug: isDebugError(err),
				}),
			);
			return Promise.reject(err);
		},
	);
	return client;
};
