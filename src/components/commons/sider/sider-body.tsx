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
import { useHistory } from 'react-router-dom';
import { getRealms } from '../../../api/api';
import { RootState } from '../../../configuration/store-configuration';
import D from '../../../i18n';
import { Realm } from '../../../model/interface';
import { saveRealms } from '../../../redux/actions/app';

const SiderBody = () => {
	const dispatch = useDispatch();
	const { push } = useHistory();
	const [realms, setRealms] = useState<Realm[]>([]);
	const [realmSelected, setRealmSelected] = useState<Realm | null>(null);
	const user = useSelector((state: RootState) => state.user);

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
			{user.role.isAdmin ||
			user.role.isReader ||
			user.role.isWriter ? (
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
				{user.role.isAdmin ||
				user.role.isReader ||
				user.role.isWriter ? (
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
				{user.role.isAdmin || user.role.isWriter ? (
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
