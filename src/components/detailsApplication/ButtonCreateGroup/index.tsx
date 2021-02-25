import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import SimpleDialog from '../../commons/popButton/Dialog';

interface Props {
	handleAddGroup: any;
}

export const ButtonCreateGroup = ({ handleAddGroup }: Props) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [groupName, setGroupName] = useState('');
	const [groupDescription, setGroupDescription] = useState('');

	const onSubmit = () => {
		handleAddGroup({
			name: groupName,
			description: groupDescription,
			users: [],
		});
		setGroupName('');
		setGroupDescription('');
		setOpen(false);
	};

	return (
		<>
			<Button
				color="primary"
				variant="contained"
				onClick={handleOpen}
			>
				Ajouter
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Créer un groupe'}
				body={
					<>
						<TextField
							fullWidth
							label="Nom du groupe"
							value={groupName}
							onChange={(e: any) =>
								setGroupName(e.target.value)
							}
						/>
						<TextField
							fullWidth
							label="Description"
							value={groupDescription}
							onChange={(e) =>
								setGroupDescription(
									e.target.value,
								)
							}
						/>
					</>
				}
				actions={
					<Button color="primary" onClick={onSubmit}>
						Ajouter
					</Button>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};

export default ButtonCreateGroup;
