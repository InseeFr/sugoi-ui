import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Toolbar,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
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

const SiderBody = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const location = useLocation();
	const [realms, setRealms] = useState<string[]>([]);
	const user = useSelector((state: RootState) => state.user);
	const [realmSelected, setRealmSelected] = useState<string | null>();
	const { realms: data } = useGetRealms();

	useEffect(() => {
		setRealms(data.map((realm) => realm.name));
	}, [data, setRealms]);

	useEffect(() => {
		dispatch(saveRealms(data));
	}, [dispatch, data]);

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
	}, [location.pathname, realms, push]);

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
						) => {
							if (newValue) {
								push('/realm/' + newValue);
							}
						}}
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
			<List>
				<ListItem
					button
					key={D.sider_home}
					onClick={() => push('/')}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={D.sider_home} />
				</ListItem>
				{user.role.isAdmin ||
				user.role.isReader ||
				user.role.isWriter ? (
					<ListItem
						button
						key={D.sider_search}
						disabled={realmSelected ? false : true}
						onClick={() =>
							push('/realm/' + realmSelected)
						}
					>
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText primary={D.sider_search} />
					</ListItem>
				) : null}
				{user.role.isAdmin || user.role.isWriter ? (
					<ListItem
						button
						key={D.sider_create}
						disabled={realmSelected ? false : true}
						onClick={() => {
							push(
								'/realm/' +
									realmSelected +
									'/create',
							);
						}}
					>
						<ListItemIcon>
							<CreateIcon />
						</ListItemIcon>
						<ListItemText primary={D.sider_create} />
					</ListItem>
				) : null}
			</List>
			<Divider />
			{user.role.isAdmin ? (
				<List>
					<ListItem
						button
						key={D.sider_search}
						onClick={() => {
							push('/settings');
						}}
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
