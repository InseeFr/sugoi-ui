import {
	Divider,
	List,
	ListItem,
	ListItemButton,
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
import Autocomplete from '@mui/material/Autocomplete';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router';
import { useGetRealms } from 'src/lib/hooks/realm/useGetRealms';
import GrainIcon from '@mui/icons-material/Grain';

const SiderBody = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const matchWithUs = useMatch('/realm/:realm/us/:userStorage/*');
	const matchWitoutUs = useMatch('/realm/:realm/*');
	const { realm: realmPath, userStorage: usPath } = matchWithUs?.params || {
		realm: matchWitoutUs?.params.realm,
		userStorage: undefined,
	};

	const { realms } = useGetRealms();

	const realmSelected = useMemo(() => {
		if (realms && realms.length > 0) {
			if (!realmPath && realms.length === 1) {
				return realms[0];
			}
			if (realmPath) {
				return realms.find((realm) => realm.name === realmPath);
			}
		}
		return undefined;
	}, [realms, realmPath]);

	const userStorageSelected = useMemo(() => {
		if (realmSelected) {
			if (realmSelected.userStorages.length === 1) {
				return realmSelected.userStorages[0];
			}
			if (usPath) {
				return realmSelected.userStorages.find(
					(us) => us.name === usPath,
				);
			}
		}
		return undefined;
	}, [realmSelected, usPath]);

	return (
		<>
			<Toolbar />

			<List component="nav">
				<ListItemButton
					key="home"
					onClick={() => navigate('/')}
					selected={location.pathname === '/'}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={t('sider.home')} />
				</ListItemButton>
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
							id="realm-choice"
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
					<ListItemButton
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
					</ListItemButton>
					<ListItemButton
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
					</ListItemButton>
					<ListItemButton
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
					</ListItemButton>
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
				<ListItemButton
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
				</ListItemButton>
			</List>
			<Divider />
		</>
	);
};
export default SiderBody;
