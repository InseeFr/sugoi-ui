import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TemplateProperties } from 'src/lib/model/api/TemplateProperties';
import { useResetPassword, useGetUser } from 'src/lib/hooks/api-hooks';
import LoadingButton from '../loadingButton';
import SimpleDialog from '../popButton/Dialog';
import { ResetPasswordPopupContent } from './resetPasswordPopupContent';

export const ResetPasswordPopup = () => {
	const { realm, id, userStorage } = useParams() as {
		realm: string;
		id: string;
		userStorage?: string;
	};

	const { user } = useGetUser(id, realm, userStorage);
	const { t } = useTranslation();

	const [templateProperties, setTemplateProperties] =
		useState<TemplateProperties>({
			signature: t('commons.send_login.default_signature'),
		});
	const { execute, loading } = useResetPassword();

	const changeATemplateProperty = (name: string, value?: string) => {
		value
			? setTemplateProperties({
					...templateProperties,
					[name]: value,
			  })
			: setTemplateProperties({
					...templateProperties,
					[name]: null,
			  });
	};
	const [forceResetPwd, setForceResetPwd] = useState(true);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onFinish = () => {
		execute(
			realm,
			id,
			forceResetPwd,
			templateProperties,
			userStorage,
		).then(handleClose);
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				variant="contained"
				color="secondary"
			>
				{t('commons.reset_password.text')}
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={
					t('commons.reset_password.title') + user?.username
				}
				body={
					<ResetPasswordPopupContent
						templateProperties={templateProperties}
						changeATemplateProperty={
							changeATemplateProperty
						}
						forceResetPwd={forceResetPwd}
						setForceResetPwd={setForceResetPwd}
					/>
				}
				actions={
					<LoadingButton
						handleClick={onFinish}
						loading={loading}
						variant="contained"
						color="primary"
					>
						{t('commons.reset_password.send_button')}
					</LoadingButton>
				}
			/>
		</>
	);
};

export default ResetPasswordPopup;
