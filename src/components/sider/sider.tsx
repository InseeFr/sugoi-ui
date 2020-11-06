import {
	Avatar,
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getRealms } from '../../api/api';
import { Realm } from '../../model/interface';
import Notification from './../notification/notification';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import D from './../../i18n';
import SettingsIcon from '@material-ui/icons/Settings';
import { useKeycloak } from '@react-keycloak/web';
import { ThemeButton } from './theme-button';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},

		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
	}),
);

const MySider = () => {
	const { push } = useHistory();
	const classes = useStyles();
	const [realms, setRealms] = useState<Realm[]>([]);
	const [realmSelected, setRealmSelected] = useState<Realm | null>(null);
	const {
		keycloak: { tokenParsed },
	} = useKeycloak();

	const { name, email } = tokenParsed as any;
	useEffect(() => {
		getRealms()
			.then((r) => {
				setRealms(r);
			})
			.catch((err) => {
				return Notification(
					'Erreur ',
					'Erreur lors de la récupération des realms',
				);
			});
	}, []);

	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper,
			}}
		>
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
			<List>
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
			</List>
			<Divider />
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
			<Divider />
			<Box
				alignItems="center"
				display="flex"
				flexDirection="column"
				p={2}
			>
				<ThemeButton />
			</Box>
		</Drawer>
	);
};
export default MySider;
