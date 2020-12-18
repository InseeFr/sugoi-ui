import { useReactOidc } from '@axa-fr/react-oidc-context';
import {
	Avatar,
	Box,
	IconButton,
	Popover,
	Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';

const AccountButton = () => {
	const { oidcUser } = useReactOidc();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return oidcUser ? (
		<>
			<IconButton
				color="inherit"
				size="medium"
				aria-label="show account information"
				onClick={handleClick}
			>
				<AccountCircleIcon />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<Box
					alignItems="center"
					display="flex"
					flexDirection="column"
					p={2}
				>
					<Avatar src="/static/images/avatars/avatar_6.png" />
					<Typography color="textPrimary" variant="h6">
						{oidcUser.profile.name}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{oidcUser.profile.email}
					</Typography>
				</Box>
				<Box
					alignItems="center"
					display="flex"
					flexDirection="column"
					p={2}
				></Box>
			</Popover>
		</>
	) : null;
};

export default AccountButton;
