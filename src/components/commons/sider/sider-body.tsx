import {
	Collapse,
	createStyles,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	TextField,
	Theme,
	Toolbar,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../../configuration/store-configuration';
import { useGetRealms } from '../../../hooks/realm/useGetRealms';
import D from '../../../i18n';
import { saveRealms } from '../../../redux/actions/app';

const useStyle = makeStyles((theme: Theme) =>
	createStyles({
		nested: {
			paddingLeft: theme.spacing(4),
		},
	}),
);

const SiderBody = () => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const { push } = useHistory();
	const location = useLocation();
	const [realms, setRealms] = useState<string[]>([]);
	const user = useSelector((state: RootState) => state.user);
	const [realmSelected, setRealmSelected] = useState<string | undefined>(
		undefined,
	);
	const [actions, setActions] = useState<String | undefined>(undefined);

	const [openSearch, setOpenSearch] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	const { realms: data } = useGetRealms();

	useEffect(() => {
		setRealms(data.map((realm) => realm.name));
		dispatch(saveRealms(data));
	}, [data, setRealms, dispatch]);

	useEffect(() => {
		if (actions) {
			switch (actions) {
				case 'search_user':
					push('/realm/' + realmSelected + '/search/users');
					break;
				case 'search_organization':
					push(
						'/realm/' +
							realmSelected +
							'/search/organizations',
					);
					break;
				case 'create_user':
					push('/realm/' + realmSelected + '/create/user');
					break;
				case 'create_organization':
					push(
						'/realm/' +
							realmSelected +
							'/create/organization',
					);
					break;
				case 'home':
					push('/');
					break;
				case 'settings':
					push('/settings');
					break;
				default:
					push('/');
					break;
			}
		}
	}, [push, actions, realmSelected]);

	useEffect(() => {
		const match = matchPath(location.pathname, {
			path: '/realm/:realm',
		});
		if (realms.length > 0 && match) {
			if (realms.includes((match?.params as any)?.realm)) {
				setRealmSelected((match?.params as any)?.realm);
			} else {
				push('/');
			}
		}
	}, [location.pathname, push, realms]);

	return (
		<>
			<Toolbar />
			{user.role.isAdmin ||
			user.role.isReader ||
			user.role.isWriter ? (
				<ListItem>
					<Autocomplete
						id="realm choice"
						options={realms}
						style={{ width: 300 }}
						value={realmSelected || null}
						onChange={(
							event: any,
							newValue: string | null,
						) =>
							setRealmSelected(
								newValue || undefined,
							)
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Realm"
								variant="standard"
							/>
						)}
					/>
				</ListItem>
			) : null}
			<List component="nav">
				<ListItem
					button
					key={D.sider_home}
					onClick={() => setActions('home')}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={D.sider_home} />
				</ListItem>
				{user.role.isAdmin ||
				user.role.isReader ||
				user.role.isWriter ? (
					<>
						<ListItem
							button
							key={D.sider_search}
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								setOpenSearch(!openSearch)
							}
						>
							<ListItemIcon>
								<SearchIcon />
							</ListItemIcon>
							<ListItemText
								primary={D.sider_search}
							/>
							{openSearch ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)}
						</ListItem>
						<Collapse
							in={openSearch}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItem
									button
									className={classes.nested}
									onClick={() =>
										setActions(
											'search_user',
										)
									}
								>
									<ListItemText primary="Rechercher des utilisateurs" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									onClick={() =>
										setActions(
											'search_organization',
										)
									}
								>
									<ListItemText primary="Rechercher des organisations" />
								</ListItem>
							</List>
						</Collapse>
					</>
				) : null}
				{user.role.isAdmin || user.role.isWriter ? (
					<>
						<ListItem
							button
							key={D.sider_create}
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								setOpenCreate(!openCreate)
							}
						>
							<ListItemIcon>
								<CreateIcon />
							</ListItemIcon>
							<ListItemText
								primary={D.sider_create}
							/>
							{openCreate ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)}
						</ListItem>
						<Collapse
							in={openCreate}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								<ListItem
									button
									className={classes.nested}
									onClick={() =>
										setActions(
											'create_user',
										)
									}
								>
									<ListItemText primary="Créer un utilisateur" />
								</ListItem>
								<ListItem
									button
									className={classes.nested}
									onClick={() =>
										setActions(
											'create_organization',
										)
									}
								>
									<ListItemText primary="Créer une organisation" />
								</ListItem>
							</List>
						</Collapse>
					</>
				) : null}
			</List>
			<Divider />
			{user.role.isAdmin ? (
				<List>
					<ListItem
						button
						key={D.sider_search}
						onClick={() => setActions('settings')}
					>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary={D.sider_admin} />
					</ListItem>
				</List>
			) : null}
			<Divider />
		</>
	);
};
export default SiderBody;
