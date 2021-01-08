import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import User from '../../../model/user';
import PopButton from '../popButton/popButton';
import { ResetPasswordPopupContent } from './resetPasswordPopupContent';

interface props {
	user: User;
}

export const ResetPasswordPopup = ({ user }: props) => {
	const [values, setValues] = useState({ signature: 'Assistance Insee' });

	const onFinish = () => {
		console.log({ user: user.username, ...values });
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
			title={'Réinitialiser le mot de passe de ' + user?.username}
			body={
				<ResetPasswordPopupContent
					user={user}
					values={values}
					setValues={handleInputChange}
				/>
			}
			text="Réinitialiser le mot de passe"
			color="default"
			variant="contained"
			actions={<Button onClick={onFinish}>Envoyer</Button>}
		/>
	);
};
