import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import User from '../../../model/api/user';
import SimpleDialog from '../popButton/Dialog';
import { SendPopupContent } from './sendPopupContent';

interface props {
	user: User;
}

export const SendUsernameButton = ({ user }: props) => {
	const [values, setValues] = useState({ signature: 'Assistance Insee' });
	const { t } = useTranslation();

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onFinish = () => {
		console.log({ user: user?.username, ...values });
		handleClose();
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				color="default"
				variant="contained"
			>
				{t('commons.send_password.text')}
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={
					t('commons.send_password.title') + user?.username
				}
				body={
					<SendPopupContent
						user={user}
						values={values}
						setValues={handleInputChange}
					/>
				}
				actions={
					<Button onClick={onFinish}>
						{t('commons.send_password.send_button')}
					</Button>
				}
			/>
		</>
	);
};

export default SendUsernameButton;
