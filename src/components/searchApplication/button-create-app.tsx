import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import SimpleDialog from '../commons/popButton/Dialog';

export const CreateApplicationButton = (realm: any, userStorage?: any) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onFinish = () => {
		handleClose();
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				color="default"
				variant="contained"
			>
				Ajouter une application
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Ajouter une application'}
				body={
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item>
							<TextField
								id="application-create-name"
								label="Nom de l'application"
								variant="outlined"
								onChange={(e) => {
									console.log(
										e.target.value,
									);
								}}
								fullWidth
							/>
						</Grid>
						<Grid item>
							<TextField
								id="application-create-owner"
								label="Propriétaire de l'application"
								variant="outlined"
								onChange={(e) => {
									console.log(
										e.target.value,
									);
								}}
								fullWidth
							/>
						</Grid>
					</Grid>
				}
				actions={<Button onClick={onFinish}>Créer</Button>}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};

export default CreateApplicationButton;
