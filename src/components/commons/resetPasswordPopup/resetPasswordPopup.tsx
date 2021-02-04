import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResetPassword } from '../../../hooks/credential/useSendIdentifiant';
import User from '../../../model/api/user';
import PopButton from '../popButton/popButton';
import { ResetPasswordPopupContent } from './resetPasswordPopupContent';

interface props {
	user: User;
	realm: string;
}

export const ResetPasswordPopup = ({ user, realm }: props) => {
	const [values, setValues] = useState({
		email: user.mail,
		senderEmail: undefined,
		signature: 'Assistance Insee',
		nameApp: undefined,
		assistMail: undefined,
	});
	const { t } = useTranslation();
	const { execute } = useResetPassword();
	const onFinish = () => {
		const pcr = {
			mail: values.email,
			properties: {
				signature: values.signature,
				senderEmail: values.senderEmail,
				nameApp: values.nameApp,
				assistMail: values.assistMail,
			},
		};
		console.log(realm, user.username, pcr);
		execute(realm, user.username as string, pcr);
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	return (
		<PopButton
			title={t('commons.reset_password.title') + user?.username}
			body={
				<ResetPasswordPopupContent
					values={values}
					setValues={handleInputChange}
				/>
			}
			text={t('commons.reset_password.text')}
			color="default"
			variant="contained"
			actions={
				<Button onClick={onFinish}>
					{t('commons.reset_password.send_button')}
				</Button>
			}
		/>
	);
};
