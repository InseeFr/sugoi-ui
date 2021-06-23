import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendIdentifiant } from '../../../hooks/api/credential';
import User from '../../../model/api/user';
import LoadingButton from '../loadingButton';
import SimpleDialog from '../popButton/Dialog';
import { SendPopupContent } from './sendPopupContent';

interface props {
	user: User;
	realm: string;
	userStorage?: string;
}

export const SendUsernameButton = ({ user, realm, userStorage }: props) => {
	const [values, setValues] = useState<any>({
		signature: 'Assistance Insee',
	});
	const { t } = useTranslation();

	const { execute, loading } = useSendIdentifiant();

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
		const pcr = {
			mail: values.email,
			properties: {
				signature: values.signature,
				senderEmail: values.senderEmail,
				application: values.nameApp,
				assistMail: values.assistMail,
			},
		};
		execute(realm, user.username || '', pcr, userStorage).then(
			handleClose,
		);
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
					<LoadingButton
						handleClick={onFinish}
						loading={loading}
					>
						{t('commons.send_password.send_button')}
					</LoadingButton>
				}
			/>
		</>
	);
};

export default SendUsernameButton;
