import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	TextField,
	Toolbar,
	useTheme,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Autocomplete from '@mui/lab/Autocomplete/Autocomplete';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { useGetRealms } from 'src/lib/hooks/realm/useGetRealms';
import GrainIcon from '@mui/icons-material/Grain';
import { useSnackbar } from 'notistack';
import { Realm } from 'src/lib/model/api/realm';
import { UserStorage } from 'src/lib/model/api/userStorage';
import { useWhoAmI } from 'src/lib/hooks/whoami';

const SiderBody = () => {
	const theme = useTheme();
	const { push } = useHistory();
	const location = useLocation();
	const { t } = useTranslation();
	const [realmSelected, setRealmSelected] = useState<Realm | undefined>();
	const { enqueueSnackbar } = useSnackbar();

	const [userStorageSelected, setStorageSelected] = useState<
		UserStorage | undefined
	>();

	const { realms } = useGetRealms();

	const { rights } = useWhoAmI();

	useEffect(() => {
		const match = matchPath<{ realm: 'string'; userStorage: 'string' }>(
			location.pathname,
			['/realm/:realm/us/:userStorage', '/realm/:realm/'],
		);
		if (!match && realms && realms.length === 1) {
			setRealmSelected(realms[0]);
			if (realms[0].userStorages.length === 1) {
				setStorageSelected(realms[0].userStorages[0]);
				push(
					'/realm/' +
						realms[0].name +
						'/us/' +
						realms[0].userStorages[0].name,
				);
			} else {
				push('/realm/' + realms[0].name);
			}
		}
		if (realms && realms.length > 0 && match) {
			if (
				realms
					.map((realm) => realm.name)
					.includes(match?.params?.realm)
			) {
				setRealmSelected(
					realms.filter(
						(realm) =>
							match?.params?.realm === realm.name,
					)[0],
				);
				if (match.params?.userStorage) {
					if (
						realms
							.find(
								(realm) =>
									realm.name ===
									match.params?.realm,
							)
							?.userStorages.map((us) => us.name)
							.includes(match?.params?.userStorage)
					) {
						setStorageSelected(
							realms
								.find(
									(realm) =>
										realm.name ===
										match.params?.realm,
								)
								?.userStorages?.filter(
									(us) =>
										us.name ===
										match?.params
											?.userStorage,
								)[0],
						);
					} else {
						push('/realm/' + match?.params?.realm);
					}
				}
			} else {
				push('/');
				enqueueSnackbar("Vous n'avez pas à être la", {
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				});
			}
		} else {
			setRealmSelected(undefined);
			setStorageSelected(undefined);
		}
	}, [enqueueSnackbar, location.pathname, push, realms]);

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
					<ListItem
						sx={{
							paddingLeft: theme.spacing(4),
						}}
					>
						<Autocomplete
							id="realm choice"
							options={
								realms?.map(
									(realm) => realm.name,
								) || []
							}
							sx={{ width: 300 }}
							value={realmSelected?.name || null}
							onChange={(
								_event: any,
								newRealmName: string | null,
							) => {
								if (newRealmName) {
									const newRealm =
										realms?.find(
											(realm) =>
												newRealmName ===
												realm.name,
										);
									if (
										newRealm
											?.userStorages
											?.length === 1
									) {
										push(
											'/realm/' +
												newRealmName +
												'/us/' +
												newRealm
													?.userStorages[0]
													.name,
										);
									} else {
										push(
											'/realm/' +
												newRealmName,
										);
									}
								} else {
									push('/');
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t(
										'sider.manage.realms',
									)}
									variant="filled"
								/>
							)}
						/>
					</ListItem>
					<ListItem
						sx={{
							paddingLeft: theme.spacing(6),
						}}
					>
						<Autocomplete
							id="userStorage choice"
							disabled={
								realmSelected?.name
									? false
									: true
							}
							options={
								realms
									?.filter(
										(realm) =>
											realm.name ===
											realmSelected?.name,
									)[0]
									?.userStorages.map(
										(us) => us.name,
									) || []
							}
							sx={{ width: 300 }}
							value={
								userStorageSelected?.name ||
								null
							}
							onChange={(
								_event: any,
								newUserStorage: string | null,
							) => {
								newUserStorage
									? push(
											'/realm/' +
												realmSelected?.name +
												'/us/' +
												newUserStorage,
									  )
									: push(
											'/realm/' +
												realmSelected?.name,
									  );
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t(
										'sider.manage.us',
									)}
									variant="filled"
								/>
							)}
						/>
					</ListItem>
					<ListItem
						button
						key="search_users"
						disabled={
							realmSelected?.name ? false : true
						}
						onClick={() =>
							userStorageSelected
								? push(
										'/realm/' +
											realmSelected?.name +
											'/us/' +
											userStorageSelected?.name +
											'/users',
								  )
								: push(
										'/realm/' +
											realmSelected?.name +
											'/users',
								  )
						}
						sx={{
							paddingLeft: theme.spacing(6),
						}}
						selected={location.pathname.includes(
							'/users',
						)}
					>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText
							primary={t('sider.manage.users')}
						/>
					</ListItem>
					<ListItem
						button
						key="search_organizations"
						disabled={
							realmSelected?.name &&
							realmSelected.userStorages.some(
								(us) => us.organizationSource,
							) &&
							(userStorageSelected
								? userStorageSelected.organizationSource
								: true)
								? false
								: true
						}
						onClick={() =>
							userStorageSelected
								? push(
										'/realm/' +
											realmSelected?.name +
											'/us/' +
											userStorageSelected?.name +
											'/organizations',
								  )
								: push(
										'/realm/' +
											realmSelected?.name +
											'/organizations',
								  )
						}
						sx={{
							paddingLeft: theme.spacing(6),
						}}
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
							realmSelected?.name &&
							realmSelected?.appSource
								? false
								: true
						}
						onClick={() =>
							push(
								'/realm/' +
									realmSelected?.name +
									'/applications',
							)
						}
						sx={{
							paddingLeft: theme.spacing(4),
						}}
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
			</List>
			<Divider />
			{rights?.isAdmin && (
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
						sx={{
							paddingLeft: theme.spacing(4),
						}}
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
			)}
			<Divider />
		</>
	);
};
export default SiderBody;
