import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

interface Props {
	handleAddGroup: any;
	handleShowGroupCreate: any;
}
export const CreateGroup = ({
	handleAddGroup,
	handleShowGroupCreate,
}: Props) => {
	const [groupName, setGroupName] = useState('');
	const [groupDescription, setGroupDescription] = useState('');
	return (
		<>
			<TextField
				fullWidth
				label="Nom du groupe"
				value={groupName}
				onChange={(e: any) => setGroupName(e.target.value)}
			/>
			<TextField
				fullWidth
				label="Description"
				value={groupDescription}
				onChange={(e) => setGroupDescription(e.target.value)}
			/>
			<Button
				color="primary"
				onClick={() => {
					handleAddGroup(groupName, groupDescription);
					setGroupName('');
					setGroupDescription('');
				}}
			>
				Ajouter
			</Button>
			<Button
				color="default"
				onClick={() => {
					handleShowGroupCreate(false);
				}}
			>
				Retour
			</Button>
		</>
	);
};
