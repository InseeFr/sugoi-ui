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

	const { realms: data } = useGetRealms();

	useEffect(() => {
		setRealms(data.map((realm) => realm.name));
		dispatch(saveRealms(data));
	}, [data, setRealms, dispatch]);

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
		} else {
			setRealmSelected(undefined);
		}
	}, [location.pathname, push, realms]);

	return (
		<>
			<Toolbar />

			<List component="nav">
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
				<Divider />
				{user.role.isAdmin ||
				user.role.isReader ||
				user.role.isWriter ? (
					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader
								component="div"
								id="nested-list-subheader"
							>
								Gestion
							</ListSubheader>
						}
					>
						<ListItem className={classes.nested}>
							<Autocomplete
								id="realm choice"
								options={realms}
								style={{ width: 300 }}
								value={realmSelected || null}
								onChange={(
									event: any,
									newValue: string | null,
								) => {
									setRealmSelected(
										newValue ||
											undefined,
									);
									push(
										'/realm/' +
											newValue,
									);
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
						<ListItem
							button
							key={D.sider_search}
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								push(
									'/realm/' +
										realmSelected +
										'/users',
								)
							}
							className={classes.nested}
						>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="Utilisateurs" />
						</ListItem>
						<ListItem
							button
							key={D.sider_create}
							disabled={
								realmSelected ? false : true
							}
							onClick={() =>
								push(
									'/realm/' +
										realmSelected +
										'/organizations',
								)
							}
							className={classes.nested}
						>
							<ListItemIcon>
								<BusinessIcon />
							</ListItemIcon>
							<ListItemText primary="Organisations" />
						</ListItem>
					</List>
				) : null}
			</List>
			<Divider />
			{user.role.isAdmin ? (
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader
							component="div"
							id="nested-list-subheader"
						>
							Configuration
						</ListSubheader>
					}
				>
					<ListItem
						button
						key={D.sider_search}
						onClick={() => push('/settings')}
						className={classes.nested}
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
