import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TemplateProperties } from 'src/lib/model/api/TemplateProperties';
import { useResetPassword, useGetUser } from 'src/lib/hooks/api-hooks';
import LoadingButton from '../loadingButton';
import SimpleDialog from '../popButton/Dialog';
import { ResetPasswordPopupContent } from './resetPasswordPopupContent';

export const ResetPasswordPopup = () => {
	const { realm, id, userStorage } = useParams<any>();

	const { user } = useGetUser(id, realm, userStorage);
	const { t } = useTranslation();

	const [templateProperties, setTemplateProperties] =
		useState<TemplateProperties>({
			signature: t('commons.send_login.default_signature'),
		});
	const { execute, loading } = useResetPassword();

	const changeATemplateProperty = (e: any) => {
		const { name, value } = e.target;
		setTemplateProperties({
			...templateProperties,
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
		execute(realm, id, templateProperties, userStorage).then(
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
					/>
				}
				actions={
					<LoadingButton
						handleClick={onFinish}
						loading={loading}
					>
						{t('commons.reset_password.send_button')}
					</LoadingButton>
				}
			/>
		</>
	);
};

export default ResetPasswordPopup;
