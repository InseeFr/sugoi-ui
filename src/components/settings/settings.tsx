import { Grid, MenuItem, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetRealms } from '../../hooks/api/realm';
import AsyncEditor from '../commons/jsonEditor';
import Title from '../commons/title/title';

const Settings = () => {
	const { t } = useTranslation();
	const { result: realms } = useGetRealms();
	const [selectedRealm, setSelectedRealm] = useState<string>('');

	const handleChangeRealm = (e: any) => {
		setSelectedRealm(e.target.value);
	};
	return (
		<>
			<Title title={t('settings.title')} />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
				spacing={2}
			>
				<Grid item>
					<TextField
						id="select"
						label="Realm"
						value={selectedRealm}
						select
						fullWidth
						onChange={handleChangeRealm}
					>
						{realms.map((realm) => (
							<MenuItem
								value={realm.name}
								key={'realm-' + realm.name}
							>
								{realm.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item>
					{selectedRealm !== '' ? (
						<AsyncEditor
							json={
								realms.filter(
									(realm) =>
										realm.name ===
										selectedRealm,
								)[0]
							}
							readOnly={false}
						/>
					) : null}
				</Grid>
			</Grid>
		</>
	);
};

export default Settings;
