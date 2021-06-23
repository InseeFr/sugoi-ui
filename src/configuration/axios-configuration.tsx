import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { enqueueSnackbar } from './../redux/actions/notif';
import Store from './store-configuration';
import { configWrapper } from './utils';

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

export const getAuthClient = () => {
	return configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		client.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				Store.dispatch(
					enqueueSnackbar({
						subject:
							'Send request ' +
							(config.method as string).toUpperCase() +
							' ' +
							config.url,
						options: {
							key:
								new Date().getTime() +
								Math.random(),
							variant: 'info',
						},
						debug: true,
					}),
				);

				await new Promise<void>((resolve, reject) => {
					Store.getState()
						.user.auth.updateToken(30)
						.then(() => {
							resolve();
						})
						.catch(() => reject());
				});

				config.headers.Authorization =
					'Bearer ' + Store.getState().user.auth.token;
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
							key:
								new Date().getTime() +
								Math.random(),
							variant: 'success',
						},
						debug: isDebugMethod(
							response.config.method,
						),
					}),
				);
				return response;
			},
			(err) => {
				Store.dispatch(
					enqueueSnackbar({
						subject: err,
						options: {
							key:
								new Date().getTime() +
								Math.random(),
							variant: 'error',
						},
						debug: isDebugError(err),
					}),
				);
				return Promise.reject(err);
			},
		);
		return client;
	});
};

export const getClient = () => {
	return configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		return client;
	});
};
