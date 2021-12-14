import { Box, IconButton, Popover } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountButton from './account-button';
import ApiButton from './api-button';
import GithubButton from './github-button';
import LanguageButton from './language-button';
import LoginButton from './login-button';
import { ThemeButton } from './theme-button';
import { useState, MouseEvent } from 'react';

const MoreIconButton = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<>
			<IconButton
				color="inherit"
				size="medium"
				aria-label="show account information"
				onClick={handleClick}
			>
				<MoreVertIcon />
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
				<Box alignItems="center" display="flex" p={2}>
					<LanguageButton />
				</Box>
				<Box alignItems="center" display="flex" p={2}>
					<ApiButton />
					<GithubButton />
					<AccountButton />
					<ThemeButton />
					<LoginButton />
				</Box>
			</Popover>
		</>
	);
};

export default MoreIconButton;
