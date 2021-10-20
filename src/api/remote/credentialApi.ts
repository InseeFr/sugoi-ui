import { getAuthClient } from '../../configuration/axios-configuration';
import { PasswordChangeRequest } from '../../model/api/passwordChangeRequest';

export const resetPassword = (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
) =>
	getAuthClient()
		.post(
			'/realms/' + realm + '/users/' + userId + '/reinitPassword',
			pcr,
			{
				params: {
					sendModes: 'MAIL',
				},
			},
		)
		.then((r) => r.data);

export const resetPasswordUs = (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
	userStorage?: string,
) =>
	getAuthClient()
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
			},
		)
		.then((r) => r.data);

export const sendIdentifiant = (
	realm: string,
	userId: string,
	properties: any,
) =>
	getAuthClient()
		.post(
			'/realms/' + realm + '/users/' + userId + '/send-login',
			properties,
		)
		.then((r) => r.data);

export const sendIdentifiantUs = (
	realm: string,
	userId: string,
	properties: any,
	userStorage: string,
) =>
	getAuthClient()
		.post(
			'/realms/' +
				realm +
				'/storages/' +
				userStorage +
				'/users/' +
				userId +
				'/send-login',
			properties,
		)
		.then((r) => r.data);
