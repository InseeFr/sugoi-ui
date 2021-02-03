import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import User from '../../../model/api/user';
import PopButton from '../popButton/popButton';
import { SendPopupContent } from './sendPopupContent';

interface props {
	user: User;
}

export const SendPopupButton = ({ user }: props) => {
	const [values, setValues] = useState({ signature: 'Assistance Insee' });
	const { t } = useTranslation();
	const onFinish = () => {
		console.log({ user: user?.username, ...values });
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
			title={t('commons.send_password.title') + user?.username}
			body={
				<SendPopupContent
					user={user}
					values={values}
					setValues={handleInputChange}
				/>
			}
			text={t('commons.send_password.text')}
			color="default"
			variant="contained"
			actions={
				<Button onClick={onFinish}>
					{t('commons.send_password.send_button')}
				</Button>
			}
		/>
	);
};
