import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TemplateProperties } from '../../../lib/model/api/TemplateProperties';
import { useSendIdentifiant, useGetUser } from 'src/lib/hooks/api-hooks';
import LoadingButton from '../loadingButton';
import SimpleDialog from '../popButton/Dialog';
import { SendPopupContent } from './sendPopupContent';

export const SendUsernameButton = () => {
	const { realm, id, userStorage } = useParams<any>();
	const { t } = useTranslation();

	const { user } = useGetUser(id, realm, userStorage);
	const [templateProperties, setTemplateProperties] =
		useState<TemplateProperties>({
			signature: t('commons.send_login.default_signature'),
		});

	const { execute, loading } = useSendIdentifiant();

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
		execute(
			realm,
			user?.username || '',
			templateProperties,
			userStorage,
		).then(handleClose);
	};

	return (
		<>
			<Button onClick={handleOpen} variant="contained">
				{t('commons.send_login.text')}
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={t('commons.send_login.title') + user?.username}
				body={
					<SendPopupContent
						user={user}
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
						{t('commons.send_login.send_button')}
					</LoadingButton>
				}
			/>
		</>
	);
};

export default SendUsernameButton;
