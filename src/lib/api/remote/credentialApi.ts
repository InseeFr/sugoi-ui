import { getAuthClient } from '../../configuration/axios-configuration';
import { TemplateProperties } from '../../model/api/TemplateProperties';

export const resetPassword = (
	realm: string,
	userId: string,
	forceResetPwd: boolean,
	templateProperties: TemplateProperties,
	webhooktag?: string,
) =>
	getAuthClient()
		.post(
			'/realms/' + realm + '/users/' + userId + '/reinit-password',
			{ templateProperties: templateProperties },
			{
				params: {
					'webhook-tag': webhooktag,
					'change-password-reset-status': forceResetPwd,
				},
			},
		)
		.then((r) => r.data);

export const resetPasswordUs = (
	realm: string,
	userId: string,
	forceResetPwd: boolean,
	templateProperties: TemplateProperties,
	webhooktag?: string,
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
				'/reinit-password',
			{ templateProperties: templateProperties },
			{
				params: {
					'webhook-tag': webhooktag,
					'change-password-reset-status': forceResetPwd,
				},
			},
		)
		.then((r) => r.data);

export const sendIdentifiant = (
	realm: string,
	userId: string,
	properties: TemplateProperties,
) =>
	getAuthClient()
		.post(
			'/realms/' + realm + '/users/' + userId + '/send-login',
			{
				templateProperties: properties,
			},
			{
				params: {
					'webhook-tag': 'MAIL',
				},
			},
		)
		.then((r) => r.data);

export const sendIdentifiantUs = (
	realm: string,
	userId: string,
	properties: TemplateProperties,
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
			{ templateProperties: properties },
			{
				params: {
					'webhook-tag': 'MAIL',
				},
			},
		)
		.then((r) => r.data);
