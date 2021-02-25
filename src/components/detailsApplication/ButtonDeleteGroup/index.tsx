import { Button, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SimpleDialog from '../../commons/popButton/Dialog';
import { Group } from '../../../model/api/group';

interface Props {
	handleDeleteGroup: any;
	group: Group;
}

export const ButtonDeleteGroup = ({ handleDeleteGroup, group }: Props) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = () => {
		handleDeleteGroup(group.name);
		setOpen(false);
	};

	return (
		<>
			<IconButton
				aria-label="Add"
				size="small"
				onClick={handleOpen}
			>
				<DeleteIcon color="primary" fontSize="small" />
			</IconButton>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Supprimer le groupe ' + group.name}
				body={<></>}
				actions={
					<Button color="secondary" onClick={onSubmit}>
						Supprimer
					</Button>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};
