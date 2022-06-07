import { Chip, Grid } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import React from 'react';
import { useHistory } from 'react-router-dom';
import SimpleDialog from 'src/components/shared/popButton/Dialog';

interface Props {
	user: any;
	realm: any;
}
export const ChipPerson = ({ user, realm }: Props) => {
	const { push } = useHistory();
	return (
		<Chip
			color="default"
			size="small"
			icon={
				user.username.startsWith('appli_') ? (
					<SettingsApplicationsIcon />
				) : (
					<PermIdentityIcon />
				)
			}
			clickable={user.username.startsWith('appli_') ? false : true}
			onClick={() =>
				push('/realm/' + realm + '/users/' + user.username)
			}
			label={user.username}
		/>
	);
};

interface ButtonProps {
	realm: any;
	group: any;
}
export const ChipButton = ({ realm, group }: ButtonProps) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Chip
				clickable
				color="primary"
				size="small"
				label={group?.users?.length - 4 + ' de plus...'}
				onClick={handleOpen}
				key={'group_' + group.name}
			/>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Utilisateur du groupe ' + group.name}
				body={
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="stretch"
						spacing={1}
					>
						{group.users.map((user: any, i: any) => (
							<Grid
								item
								key={
									'item-group_' +
									group.name +
									'user_' +
									user +
									'-' +
									i
								}
							>
								<ChipPerson
									key={
										'group_' +
										group.name +
										'user_' +
										user +
										'-' +
										i
									}
									realm={realm}
									user={user}
								/>
							</Grid>
						))}
					</Grid>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};
