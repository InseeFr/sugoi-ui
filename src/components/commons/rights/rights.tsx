import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import PopButton from '../../commons/popButton/popButton';
import PopIcon from '../../commons/popIcon/popIcon';
import Habilitations from './habilitations/habilitations';

interface props {
	data: any;
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
				{data?.habilitation?.map((habilitation: string) => (
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
			<PopButton
				text="Gerer les groupes"
				title=" Gestion Habilitation"
				body={<h1>trololollllllllllllllllllll</h1>}
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
			<PopButton
				text="Gerer les roles applicatifs"
				title=" Gestion Habilitation"
				body={<h1>trololollllllllllllllllllll</h1>}
				color="primary"
				variant="contained"
			/>
		</>
	);
};
