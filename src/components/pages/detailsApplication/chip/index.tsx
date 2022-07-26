import { Chip, Grid } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import User from 'src/lib/model/api/user';
import { UserPopover } from './UserPopover';

const ChipPerson = ({
	user,
	realm,
	handlePopoverOpen,
	handlePopoverClose,
}: {
	user: User;
	realm: string;
	handlePopoverOpen: (event: React.MouseEvent<HTMLElement>) => void;
	handlePopoverClose: () => void;
}) => {
	const navigate = useNavigate();
	return (
		<Chip
			color="default"
			size="small"
			icon={
				user.username && user.username.startsWith('appli_') ? (
					<SettingsApplicationsIcon />
				) : (
					<PermIdentityIcon />
				)
			}
			clickable={
				user.username && user.username.startsWith('appli_')
					? false
					: true
			}
			onClick={() =>
				navigate('/realm/' + realm + '/users/' + user.username)
			}
			onMouseEnter={handlePopoverOpen}
			onMouseLeave={handlePopoverClose}
			label={user.username}
		/>
	);
};

interface Props {
	user: User;
	realm: string;
}

export const ChipPersonWithPopup = ({ user, realm }: Props) => {
	const [anchorRef, setAnchorRef] = useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorRef(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorRef(null);
	};

	if (anchorRef && user.username && !user.username.startsWith('appli_'))
		return (
			<>
				<ChipPerson
					user={user}
					realm={realm}
					handlePopoverClose={handlePopoverClose}
					handlePopoverOpen={handlePopoverOpen}
				></ChipPerson>
				<UserPopover
					user={user}
					realm={realm}
					anchorEl={anchorRef}
				></UserPopover>
			</>
		);
	else
		return (
			<ChipPerson
				user={user}
				realm={realm}
				handlePopoverClose={handlePopoverClose}
				handlePopoverOpen={handlePopoverOpen}
			></ChipPerson>
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
								<ChipPersonWithPopup
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
