import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import User from '../../../model/user';
import PopButton from '../../commons/popButton/popButton';
import PopIcon from '../../commons/popIcon/popIcon';
import Groupes from './groupes/groupes';
import Habilitations from './habilitations/habilitations';
import Roles from './roles/roles';

interface props {
	data: User | any;
	dispatch: any;
	fieldToDisplay: any;
}

export default ({ data, dispatch, fieldToDisplay }: props) => {
	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography component="div" variant="body1">
					Habilitations
				</Typography>
				<PopIcon
					helpText={
						'Correspond aux attributs inseeGroupeDefaut du contact'
					}
				/>
			</div>
			<List dense={true}>
				{data?.habilitations?.map((habilitation: string) => (
					<ListItem>
						<ListItemText primary={habilitation} />
					</ListItem>
				))}
			</List>
			<PopButton
				text="Gérer les habilitations"
				title="Gestion habilitations"
				body={<Habilitations data={data} dispatch={dispatch} />}
				color="primary"
				variant="contained"
			/>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography component="div" variant="body1">
					Groupes Applicatifs
				</Typography>
				<PopIcon
					helpText={
						'Correspond aux groupes auxquels le contact appartient'
					}
				/>
			</div>
			<List dense={true}>
				{data?.groups?.map((group: string) => (
					<ListItem>
						<ListItemText primary={group} />
					</ListItem>
				))}
			</List>
			<PopButton
				text="Gerer les groupes"
				title=" Gestion des groupes"
				body={<Groupes data={data} dispatch={dispatch} />}
				color="primary"
				variant="contained"
			/>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography component="div" variant="body1">
					Roles applicatifs
				</Typography>
				<PopIcon
					helpText={
						'Correspond aux attributs inseeRoleApplicatif'
					}
				/>
			</div>
			<List dense={true}>
				{data?.attributes?.roles?.map((role: string) => (
					<ListItem>
						<ListItemText primary={role} />
					</ListItem>
				))}
			</List>
			<PopButton
				text="Gerer les roles applicatifs"
				title=" Gestion des roles applicatifs"
				body={<Roles data={data} dispatch={dispatch} />}
				color="primary"
				variant="contained"
			/>
		</>
	);
};
