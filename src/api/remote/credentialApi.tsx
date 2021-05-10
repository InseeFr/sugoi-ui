import { AxiosInstance } from 'axios';
import { getClient } from '../../configuration/axios-configuration';
import { PasswordChangeRequest } from '../../model/api/passwordChangeRequest';

export const resetPassword = (token?: string) => (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/users/' +
					userId +
					'/reinitPassword',
				pcr,
				{
					params: {
						sendModes: 'MAIL',
					},
					headers: { Authorization: 'bearer ' + token },
				},
			)
			.then((r) => r.data),
	);

export const resetPasswordUs = (token?: string) => (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage?: string,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/storages/' +
					userStorage +
					'/users/' +
					userId +
					'/reinitPassword',
				pcr,
				{
					params: {
						sendModes: 'MAIL',
					},
					headers: { Authorization: 'bearer ' + token },
				},
			)
			.then((r) => r.data),
	);

export const sendIdentifiant = (token?: string) => (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/users/' +
					userId +
					'/reinitPassword',
				pcr,
				{
					params: {
						sendModes: 'MAIL',
					},
					headers: { Authorization: 'bearer ' + token },
				},
			)
			.then((r) => r.data),
	);

export const sendIdentifiantUs = (token?: string) => (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage: string,
) =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/storages/' +
					userStorage +
					'/users/' +
					userId +
					'/reinitPassword',
				pcr,
				{
					params: {
						sendModes: 'MAIL',
					},
					headers: { Authorization: 'bearer ' + token },
				},
			)
			.then((r) => r.data),
	);
