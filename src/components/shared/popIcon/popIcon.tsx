import React from 'react';
import { IconButton, Typography, Box, Popover, useTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface props {
	helpTextTitle?: string;
	helpText?: string | JSX.Element | JSX.Element[];
}

const PopIcon = ({ helpTextTitle, helpText }: props) => {
	const theme = useTheme();
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
	return (
		<>
			<IconButton
				aria-label="info"
				sx={{
					margin: theme.spacing(1),
				}}
				size="small"
				onClick={handleClick}
				color="primary"
			>
				<InfoIcon fontSize="inherit" />
			</IconButton>
			{helpText || helpTextTitle ? (
				<Popover
					id="popover-help"
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					{helpTextTitle ? (
						<Typography
							component="div"
							variant="body1"
							sx={{
								padding: theme.spacing(1),
							}}
						>
							<Box fontWeight="fontWeightBold">
								{helpTextTitle}
							</Box>
						</Typography>
					) : null}
					{helpText ? (
						<Typography
							component="div"
							variant="caption"
							sx={{
								padding: theme.spacing(1),
							}}
						>
							<Box>{helpText}</Box>
						</Typography>
					) : null}
				</Popover>
			) : null}
		</>
	);
};

export default PopIcon;
