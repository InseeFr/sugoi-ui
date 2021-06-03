import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { configWrapper } from './utils';
import Store from './store-configuration';
import { enqueueSnackbar, closeSnackbar } from './../redux/actions/notif';
import React from 'react';
import { Button } from '@material-ui/core';

export const getAuthClient = () => {
	return configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		client.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				Store.dispatch(
					enqueueSnackbar({
						message:
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
					}),
				);
				config.headers.Authorization =
					'Bearer ' + Store.getState().user.access_token;
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
						message:
							"Votre demande à été prise en compte par l'api",
						options: {
							key:
								new Date().getTime() +
								Math.random(),
							variant: 'success',
						},
						properties: {
							method: response.config.method,
							url: response.config.url,
						},
					}),
				);
				return response;
			},
			(err) => {
				Store.dispatch(
					enqueueSnackbar({
						message:
							"Erreur sur la requetes à l'api " +
							err,
						options: {
							key:
								new Date().getTime() +
								Math.random(),
							variant: 'error',
						},
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
