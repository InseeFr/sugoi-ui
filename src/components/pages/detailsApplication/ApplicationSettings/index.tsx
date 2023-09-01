import Application from 'src/lib/model/api/application';
import Title from 'src/components/shared/title/title';
import { FormControlLabel, Switch, FormGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePutApplication } from 'src/lib/hooks/applications';

export const ApplicationSettings = ({
	application,
	realm,
}: {
	application: Application;
	realm: string;
}) => {
	const { t } = useTranslation();
	const [enabledSelfManagedGroupsApp, setEnabledSelfManagedGroupsApp] =
		useState(application.isSelfManagedGroupsApp);
	const { execute: updateApplication } = usePutApplication();

	const handleChangeSelfManagedGroup = (
		_event: React.ChangeEvent<HTMLInputElement>,
	) => {
		application &&
			updateApplication(realm, {
				...application,
				isSelfManagedGroupsApp: !enabledSelfManagedGroupsApp,
			});
		setEnabledSelfManagedGroupsApp(!enabledSelfManagedGroupsApp);
	};

	return (
		<>
			<Title
				title={t(
					'detail_application.button_manage_application_settings.title',
				)}
			/>
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={
								enabledSelfManagedGroupsApp ??
								false
							}
							name="selfmanaged-toggle"
							color="primary"
							onChange={
								handleChangeSelfManagedGroup
							}
						/>
					}
					label={t(
						'detail_application.button_manage_application_settings.selfmanaged',
					)}
				/>
			</FormGroup>
		</>
	);
};
