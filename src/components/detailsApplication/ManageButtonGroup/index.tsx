import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import SimpleDialog from '../../commons/popButton/Dialog';
import { BodyManagementGroup } from './content';

interface Props {
	realm: any;
	application: any;
	handleSave: any;
}

export const ButtonManageGroup = ({
	handleSave,
	application,
	realm,
}: Props) => {
	const [open, setOpen] = useState(false);
	const [app, setApp] = React.useState(application);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setApp(application);
		setOpen(false);
	};

	const onFinish = () => {
		handleSave(app);
		setOpen(false);
	};

	return (
		<>
			<Button
				color="primary"
				variant="contained"
				onClick={handleOpen}
			>
				Gérer
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Gestion des groupes'}
				body={
					<BodyManagementGroup
						realm={realm}
						application={app}
						handleChangeOnApp={setApp}
					/>
				}
				actions={<Button onClick={onFinish}>Créer</Button>}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};
