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
import { useMatch, useNavigate } from 'react-router-dom';
import { useGetRealms } from 'src/lib/hooks/realm/useGetRealms';
import GrainIcon from '@mui/icons-material/Grain';
import { useSnackbar } from 'notistack';
import { Realm } from 'src/lib/model/api/realm';
import { UserStorage } from 'src/lib/model/api/userStorage';

const SiderBody = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [realmSelected, setRealmSelected] = useState<Realm | undefined>();
	const { enqueueSnackbar } = useSnackbar();
	const matchWithUs = useMatch('/realm/:realm/us/:userStorage/*');
	const matchWitoutUs = useMatch('/realm/:realm/*');
	const { realm: realmPath, userStorage: usPath } = matchWithUs?.params || {
		realm: matchWitoutUs?.params.realm,
		userStorage: undefined,
	};

	const [userStorageSelected, setStorageSelected] = useState<
		UserStorage | undefined
	>();

	const { realms } = useGetRealms();

	useEffect(() => {
		if (!realmPath && realms && realms.length === 1) {
			setRealmSelected(realms[0]);
			if (realms[0].userStorages.length === 1) {
				setStorageSelected(realms[0].userStorages[0]);
				navigate(
					'/realm/' +
						realms[0].name +
						'/us/' +
						realms[0].userStorages[0].name,
				);
			} else {
				navigate('/realm/' + realms[0].name);
			}
		}
		if (realms && realms.length > 0 && realmPath) {
			if (realms.map((realm) => realm.name).includes(realmPath)) {
				setRealmSelected(
					realms.find((realm) => realmPath === realm.name),
				);
				if (usPath) {
					if (
						realms
							.find(
								(realm) =>
									realm.name === realmPath,
							)
							?.userStorages.map((us) => us.name)
							.includes(usPath)
					) {
						setStorageSelected(
							realms
								.find(
									(realm) =>
										realm.name ===
										realmPath,
								)
								?.userStorages?.filter(
									(us) =>
										us.name === usPath,
								)[0],
						);
					} else {
						navigate('/realm/' + realmPath);
					}
				}
			} else {
				navigate('/');
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
	}, [enqueueSnackbar, navigate, realms, realmPath, usPath]);

	return (
		<>
			<Toolbar />

			<List component="nav">
				<ListItem
					button
					key="home"
					onClick={() => navigate('/')}
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
										navigate(
											'/realm/' +
												newRealmName +
												'/us/' +
												newRealm
													?.userStorages[0]
													.name,
										);
									} else {
										navigate(
											'/realm/' +
												newRealmName,
										);
									}
								} else {
									navigate('/');
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
									? navigate(
											'/realm/' +
												realmSelected?.name +
												'/us/' +
												newUserStorage,
									  )
									: navigate(
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
								? navigate(
										'/realm/' +
											realmSelected?.name +
											'/us/' +
											userStorageSelected?.name +
											'/users',
								  )
								: navigate(
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
								? navigate(
										'/realm/' +
											realmSelected?.name +
											'/us/' +
											userStorageSelected?.name +
											'/organizations',
								  )
								: navigate(
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
							navigate(
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
					onClick={() => navigate('/settings')}
					sx={{
						paddingLeft: theme.spacing(4),
					}}
					selected={location.pathname.includes('/settings')}
				>
					<ListItemIcon>
						<SettingsIcon />
					</ListItemIcon>
					<ListItemText
						primary={t('sider.configuration.settings')}
					/>
				</ListItem>
			</List>
			<Divider />
		</>
	);
};
export default SiderBody;
