import {
	createStyles,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	makeStyles,
	TextField,
	Theme,
	Toolbar,
} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../../configuration/store-configuration';
import { useGetRealms } from '../../../hooks/realm/useGetRealms';
import { saveRealms } from '../../../redux/actions/app';
import GrainIcon from '@material-ui/icons/Grain';
const useStyle = makeStyles((theme: Theme) =>
	createStyles({
		nested: {
			paddingLeft: theme.spacing(4),
		},
		nestedUS: {
			paddingLeft: theme.spacing(6),
		},
	}),
);

const SiderBody = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const { push } = useHistory();
	const location = useLocation();
	const { t } = useTranslation();
	const user = useSelector((state: RootState) => state.user);
	const [realmSelected, setRealmSelected] = useState<string | undefined>();
	const [userStorageSelected, setStorageSelected] = useState<
		string | undefined
	>();

	const { result: realms } = useGetRealms();

	useEffect(() => {
		dispatch(saveRealms(realms));
	}, [realms, dispatch]);

	useEffect(() => {
		const match = matchPath(location.pathname, [
			'/realm/:realm/us/:userStorage',
			'/realm/:realm/',
		]);
		if (realms.length > 0 && match) {
			if (
				realms
					.map((realm) => realm.name)
					.includes((match?.params as any)?.realm)
			) {
				setRealmSelected((match?.params as any)?.realm);
				let possibleUserStorage = realms
					.filter(
						(realm) =>
							realm.name ===
							(match?.params as any).realm,
					)[0]
					.userStorages.map((us) => us.name);
				if ((match.params as any)?.userStorage) {
					if (
						possibleUserStorage.includes(
							(match?.params as any)?.userStorage,
						)
					) {
						setStorageSelected(
							(match?.params as any)?.userStorage,
						);
					} else {
						push(
							'/realm/' +
								(match?.params as any)?.realm,
						);
					}
				}
			} else {
				push('/');
			}
		} else {
			setRealmSelected(undefined);
			setStorageSelected(undefined);
		}
	}, [location.pathname, push, realms]);

	return (
		<>
			<Toolbar />

			<List component="nav">
				<ListItem
					button
					key="home"
					onClick={() => push('/')}
					selected={location.pathname === '/'}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={t('sider.home')} />
				</ListItem>
				<Divider />
				{user.role.isAdmin ||
				user.role.isReader ||
				user.role.isWriter ? (
					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader
								component="div"
								id="nested-list-subheader"
							>
								{t('sider.manage.title')}
							</ListSubheader>
						}
					>
						<ListItem className={classes.nested}>
							<Autocomplete
								id="realm choice"
								options={realms.map(
									(realm) => realm.name,
								)}
								style={{ width: 300 }}
								value={realmSelected || null}
								onChange={(
									_event: any,
									newRealm: string | null,
								) => {
									setRealmSelected(
										newRealm ||
											undefined,
									);
									setStorageSelected(
										undefined,
									);
									push(
										'/realm/' +
											newRealm,
									);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Realm"
										variant="filled"
									/>
								)}
							/>
						</ListItem>
						<ListItem className={classes.nestedUS}>
							<Autocomplete
								id="userStorage choice"
								disabled={
									realmSelected
										? false
										: true
								}
								options={realms
									?.filter(
										(realm) =>
											realm.name ===
											realmSelected,
									)[0]
									?.userStorages.map(
										(us) => us.name,
									)}
								style={{ width: 300 }}
								value={
									userStorageSelected ||
									null
								}
								onChange={(
									_event: any,
									newUserStorage:
										| string
										| null,
								) => {
									setStorageSelected(
										newUserStorage ||
											undefined,
									);
									push(
										'/realm/' +
											realmSelected +
											'/us/' +
											newUserStorage,
									);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="User Storage"
										variant="filled"
									/>
								)}
							/>
						</ListItem>
						<ListItem
							button
							key="search_users"
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								userStorageSelected
									? push(
											'/realm/' +
												realmSelected +
												'/us/' +
												userStorageSelected +
												'/users',
									  )
									: push(
											'/realm/' +
												realmSelected +
												'/users',
									  )
							}
							className={classes.nestedUS}
							selected={location.pathname.includes(
								'/users',
							)}
						>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText
								primary={t(
									'sider.manage.users',
								)}
							/>
						</ListItem>
						<ListItem
							button
							key="search_organizations"
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								userStorageSelected
									? push(
											'/realm/' +
												realmSelected +
												'/us/' +
												userStorageSelected +
												'/organizations',
									  )
									: push(
											'/realm/' +
												realmSelected +
												'/organizations',
									  )
							}
							className={classes.nestedUS}
							selected={location.pathname.includes(
								'/organizations',
							)}
						>
							<ListItemIcon>
								<BusinessIcon />
							</ListItemIcon>
							<ListItemText
								primary={t(
									'sider.manage.organizations',
								)}
							/>
						</ListItem>
						<ListItem
							button
							key="search_application"
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								push(
									'/realm/' +
										realmSelected +
										'/applications',
								)
							}
							className={classes.nested}
							selected={location.pathname.includes(
								'/applications',
							)}
						>
							<ListItemIcon>
								<GrainIcon />
							</ListItemIcon>
							<ListItemText
								primary={t(
									'sider.manage.applications',
								)}
							/>
						</ListItem>
					</List>
				) : null}
			</List>
			<Divider />
			{user.role.isAdmin ? (
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							{t('sider.configuration.title')}
						</ListSubheader>
					}
				>
					<ListItem
						button
						key="parametres"
						onClick={() => push('/settings')}
						className={classes.nested}
						selected={location.pathname.includes(
							'/settings',
						)}
					>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText
							primary={t(
								'sider.configuration.settings',
							)}
						/>
					</ListItem>
				</List>
			) : null}
			<Divider />
		</>
	);
};
export default SiderBody;
