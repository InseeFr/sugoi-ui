import { Grid, MenuItem, TextField } from '@material-ui/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Realm } from 'src/model/api/realm';
import { useGetRealms } from '../../hooks/realm';
import AsyncEditor from '../commons/jsonEditor';
import Title from '../commons/title/title';
import { UpdateRealm } from './update-realm';

const Settings = () => {
	const { t } = useTranslation();
	const { realms } = useGetRealms();
	const [selectedRealm, setSelectedRealm] = useState<string>('');

	const handleChangeRealm = (e: any) => {
		setSelectedRealm(e.target.value);
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="stretch"
			spacing={2}
		>
			<Grid item>
				<Title title={t('settings.title')} />
			</Grid>
			<Grid item>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="stretch"
					spacing={5}
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
							{realms?.map((realm) => (
								<MenuItem
									value={realm.name}
									key={
										'realm-' +
										realm.name
									}
								>
									{realm.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item>
						<Grid
							container
							direction="row"
							justifyContent="flex-end"
							alignItems="flex-end"
							spacing={3}
						>
							<UpdateRealm
								disabled={
									realms?.filter(
										(realm) =>
											realm.name ===
											selectedRealm,
									).length !== 1
								}
								realm={
									realms?.filter(
										(realm) =>
											realm.name ===
											selectedRealm,
									)[0] as Realm
								}
							/>
						</Grid>
					</Grid>
					<Grid item>
						{selectedRealm !== '' && (
							<AsyncEditor
								value={
									realms?.filter(
										(realm) =>
											realm.name ===
											selectedRealm,
									)[0]
								}
								onChange={(o) => console.log(o)}
								readOnly={true}
							/>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Settings;
