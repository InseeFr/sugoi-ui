import {
	Avatar,
	Box,
	IconButton,
	Popover,
	Typography,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../../hooks/auth/useAuth';

const AccountButton = () => {
	const { authenticated, userInfo } = useAuth();
	const { t } = useTranslation();

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
	return authenticated ? (
		<>
			<IconButton
				color="inherit"
				size="medium"
				aria-label={t('commons.header.buttons.account')}
				title={t('commons.header.buttons.account')}
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
						{userInfo.name}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{userInfo.email}
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
