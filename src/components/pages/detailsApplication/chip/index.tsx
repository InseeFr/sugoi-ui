import { Chip, Grid } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import { UserPopover } from './UserPopover';

const ChipPerson = ({
	username,
	realm,
	handlePopoverOpen,
	handlePopoverClose,
	handleDelete,
}: {
	username: string;
	realm: string;
	handlePopoverOpen: (event: React.MouseEvent<HTMLElement>) => void;
	handlePopoverClose: () => void;
	handleDelete?: () => void;
}) => {
	const navigate = useNavigate();
	return (
		<Chip
			color="default"
			size="small"
			icon={<PermIdentityIcon />}
			onClick={() =>
				navigate('/realm/' + realm + '/users/' + username)
			}
			onDelete={handleDelete}
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}
			label={username}
		/>
	);
};

const ChipServiceAccount = ({ username }: { username: string }) => {
	return (
		<Chip
			color="default"
			size="small"
			icon={<SettingsApplicationsIcon />}
			label={username}
		/>
	);
};

const ChipPersonPopable = ({
	username,
	realm,
	handleDeleteUser,
}: {
	username: string;
	realm: string;
	handleDeleteUser?: (username: string) => void;
}) => {
	const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorRef(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorRef(null);
	};

	const handleDelete = handleDeleteUser
		? () => handleDeleteUser(username)
		: undefined;

	if (anchorRef)
		return (
			<>
				<ChipPerson
					username={username}
					realm={realm}
					handlePopoverClose={handlePopoverClose}
					handlePopoverOpen={handlePopoverOpen}
					handleDelete={handleDelete}
				></ChipPerson>
				<UserPopover
					username={username}
					realm={realm}
					anchorEl={anchorRef}
				></UserPopover>
			</>
		);
	else
		return (
			<ChipPerson
				username={username}
				realm={realm}
				handlePopoverClose={handlePopoverClose}
				handlePopoverOpen={handlePopoverOpen}
				handleDelete={handleDelete}
			></ChipPerson>
		);
};

export const ChipAccount = ({
	username,
	realm,
	handleDeleteUser,
}: {
	username: string;
	realm: string;
	handleDeleteUser?: (username: string) => void;
}) => {
	if (username && !username.startsWith('appli_'))
		return (
			<ChipPersonPopable
				username={username}
				realm={realm}
				handleDeleteUser={handleDeleteUser}
			/>
		);
	else return <ChipServiceAccount username={username} />;
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
								<ChipPersonPopable
									key={
										'group_' +
										group.name +
										'user_' +
										user +
										'-' +
										i
									}
									realm={realm}
									username={user.username}
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
