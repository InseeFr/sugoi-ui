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
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../../configuration/store-configuration';
import { useGetRealms } from '../../../hooks/api/realm/useGetRealms';
import { saveRealms } from '../../../redux/actions/app';
import GrainIcon from '@material-ui/icons/Grain';
import { useSnackbar } from 'notistack';

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
	const { enqueueSnackbar } = useSnackbar();

	const [userStorageSelected, setStorageSelected] = useState<
		string | undefined
	>();

	const { result: realms } = useGetRealms();

	useEffect(() => {
		dispatch(saveRealms(realms));
	}, [realms, dispatch]);

	useEffect(() => {
		const match = matchPath<{ realm: 'string'; userStorage: 'string' }>(
			location.pathname,
			['/realm/:realm/us/:userStorage', '/realm/:realm/'],
		);
		if (!match && realms.length === 1) {
			setRealmSelected(realms[0].name);
			if (realms[0].userStorages.length === 1) {
				setStorageSelected(realms[0].userStorages[0].name);
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
		if (realms.length > 0 && match) {
			if (
				realms
					.map((realm) => realm.name)
					.includes(match?.params?.realm)
			) {
				setRealmSelected(match?.params?.realm);
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
							match?.params?.userStorage,
						);
					} else {
						push('/realm/' + match?.params?.realm);
					}
				} else {
					setStorageSelected(undefined);
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
	}, [location.pathname, realms]);

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
								newRealmName: string | null,
							) => {
								if (newRealmName) {
									const newRealm = realms.find(
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
								realmSelected ? false : true
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
							value={userStorageSelected || null}
							onChange={(
								_event: any,
								newUserStorage: string | null,
							) => {
								newUserStorage
									? push(
											'/realm/' +
												realmSelected +
												'/us/' +
												newUserStorage,
									  )
									: push(
											'/realm/' +
												realmSelected,
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
						disabled={realmSelected ? false : true}
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
							primary={t('sider.manage.users')}
						/>
					</ListItem>
					<ListItem
						button
						key="search_organizations"
						disabled={realmSelected ? false : true}
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
						disabled={realmSelected ? false : true}
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
					onClick={() => push('/settings')}
					className={classes.nested}
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
