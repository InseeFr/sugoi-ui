import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { PasswordChangeRequest } from '../../model/api/passwordChangeRequest';

export const resetPassword = (
	realm: string,
	userId: string,
	pcr: PasswordChangeRequest,
) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post(
				'/' + realm + '/users/' + userId + '/reinitPassword',
				pcr,
				{
					params: {
						sendModes: 'MAIL',
					},
				},
			)
			.then((r) => r.data),
	);
