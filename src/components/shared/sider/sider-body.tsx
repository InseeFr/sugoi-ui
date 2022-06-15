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
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeCurrentRealm } from 'src/lib/redux/actions/app';
import { useHistory, useLocation } from 'react-router-dom';
import { useGetRealms } from 'src/lib/hooks/realm/useGetRealms';
import GrainIcon from '@material-ui/icons/Grain';
import { useGetCurrentRealm } from 'src/lib/hooks/realm/useGetCurrentRealm';

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
	const { push } = useHistory();
	const dispatch = useDispatch();
	const location = useLocation();
	const { t } = useTranslation();
	const realmSelected = useGetCurrentRealm();

	const { realms } = useGetRealms();

	const pushWithRealmUs = (urlExtension: string) => {
		push(realmSelected.realmUsPath + urlExtension);
	};

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
							options={
								realms?.map(
									(realm) => realm.name,
								) || []
							}
							style={{ width: 300 }}
							value={
								realmSelected?.currentRealm
									?.name || null
							}
							onChange={(
								_event: any,
								newRealmName: string | null,
							) => {
								dispatch(
									changeCurrentRealm(
										newRealmName ||
											undefined,
									),
								);
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
					<ListItem className={classes.nestedUS}>
						<Autocomplete
							id="userStorage choice"
							disabled={
								realmSelected?.currentRealm
									?.name
									? false
									: true
							}
							options={
								realms
									?.filter(
										(realm) =>
											realm.name ===
											realmSelected
												?.currentRealm
												?.name,
									)[0]
									?.userStorages.map(
										(us) => us.name,
									) || []
							}
							style={{ width: 300 }}
							value={
								realmSelected?.currentUs
									?.name || null
							}
							onChange={(
								_event: any,
								newUserStorage: string | null,
							) => {
								dispatch(
									changeCurrentRealm(
										realmSelected
											?.currentRealm
											?.name,
										newUserStorage ||
											undefined,
									),
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
							!realmSelected?.currentRealm?.name
						}
						onClick={() => pushWithRealmUs('users')}
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
						disabled={
							realmSelected?.currentRealm?.name &&
							realmSelected.currentRealm.userStorages.some(
								(us) => us.organizationSource,
							) &&
							(realmSelected?.currentUs
								? realmSelected?.currentUs
										?.organizationSource
								: true)
								? false
								: true
						}
						onClick={() =>
							pushWithRealmUs('organizations')
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
							realmSelected?.currentRealm?.name &&
							realmSelected?.currentRealm?.appSource
								? false
								: true
						}
						onClick={() =>
							pushWithRealmUs('applications')
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
