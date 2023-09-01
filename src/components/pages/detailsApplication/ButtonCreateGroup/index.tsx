import { Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleDialog from 'src/components/shared/popButton/Dialog';

interface Props {
	handleAddGroup: any;
	application: any;
}

export const ButtonCreateGroup = ({ handleAddGroup, application }: Props) => {
	const { t } = useTranslation();
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
			name: groupName + '_' + application?.name.toUpperCase(),
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
				fullWidth
				color="primary"
				variant="contained"
				onClick={handleOpen}
				sx={{ height: '100%' }}
			>
				{t('detail_application.button_add_group')}
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={t('detail_application.button_add_group')}
				body={
					<>
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="stretch"
							spacing={1}
						>
							<Grid item xs={10}>
								<TextField
									fullWidth
									label="Nom du groupe"
									variant="standard"
									value={groupName}
									onChange={(e: any) =>
										setGroupName(
											e.target
												.value,
										)
									}
								/>
							</Grid>
							<Grid item xs={2}>
								<TextField
									fullWidth
									label="Suffix"
									value={
										'_' +
										application?.name.toUpperCase()
									}
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Description"
									variant="standard"
									value={groupDescription}
									onChange={(e) =>
										setGroupDescription(
											e.target
												.value,
										)
									}
								/>
							</Grid>
						</Grid>
					</>
				}
				actions={
					<Button
						color="primary"
						variant="contained"
						onClick={onSubmit}
					>
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
