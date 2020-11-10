import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Toolbar,
	Typography,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRealms } from '../../api/api';
import D from '../../i18n';
import { Realm } from '../../model/interface';
import { ThemeButton } from './theme-button';
import { saveRealms } from './../../redux/actions/app';
import { RootState } from '../../configuration/store-configuration';

const SiderBody = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const [realms, setRealms] = useState<Realm[]>([]);
	const [realmSelected, setRealmSelected] = useState<Realm | null>(null);
	const {
		keycloak: { tokenParsed },
	} = useKeycloak();

	const roles = useSelector((state: RootState) => state.role);

	const { name, email } = tokenParsed as any;
	useEffect(() => {
		getRealms()
			.then((r) => {
				setRealms(r);
				dispatch(saveRealms(r));
			})
			.catch((err) => {});
	}, [dispatch]);

	return (
		<>
			<Toolbar />
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				p={2}
			>
				<Avatar src="/static/images/avatars/avatar_6.png" />
				<Typography color="textPrimary" variant="h5">
					{name}
				</Typography>
				<Typography color="textSecondary" variant="body2">
					{email}
				</Typography>
			</Box>
			<Divider />
			{roles.isAdmin || roles.isReader || roles.isWriter ? (
				<ListItem>
					<Autocomplete
						id="realm choice"
						options={realms}
						getOptionLabel={(realm) => realm.name}
						style={{ width: 300 }}
						onChange={(
							event: any,
							newValue: Realm | null,
						) => {
							if (newValue) {
								setRealmSelected(newValue);
								push('/realm/' + newValue.name);
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
				{roles.isAdmin || roles.isReader || roles.isWriter ? (
					<ListItem
						button
						key={D.sider_search}
						disabled={realmSelected ? false : true}
						onClick={() =>
							push('/realm/' + realmSelected?.name)
						}
					>
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText primary={D.sider_search} />
					</ListItem>
				) : null}
				{roles.isAdmin || roles.isWriter ? (
					<ListItem
						button
						key={D.sider_create}
						disabled={realmSelected ? false : true}
						onClick={() => {
							push(
								'/realm/' +
									realmSelected?.name +
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
			{roles.isAdmin ? (
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
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				p={2}
			>
				<ThemeButton />
			</Box>
		</>
	);
};
export default SiderBody;
