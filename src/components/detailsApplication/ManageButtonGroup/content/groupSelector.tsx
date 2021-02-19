import { Link, MenuItem, TextField } from '@material-ui/core';
import React from 'react';
import Application from '../../../../model/api/application';
import { Group } from '../../../../model/api/group';

interface Props {
	application: Application;
	selectedGroup: Group | undefined;
	handleShowGroupCreate: any;
	handleSelectedGroup: any;
}
export const GroupSelector = ({
	application,
	selectedGroup,
	handleShowGroupCreate,
	handleSelectedGroup,
}: Props) => {
	return (
		<>
			<TextField
				id="select-groupe-list"
				select
				label="Selectionner votre groupe"
				value={selectedGroup?.name || ''}
				onChange={(e: any) =>
					handleSelectedGroup(e.target.value)
				}
				fullWidth
			>
				{application.groups.map((group: Group) => (
					<MenuItem key={group.name} value={group.name}>
						{group.name}
					</MenuItem>
				))}
			</TextField>
			<Link onClick={() => handleShowGroupCreate(true)}>
				Groupe absent ? Créé le:
			</Link>
		</>
	);
};
