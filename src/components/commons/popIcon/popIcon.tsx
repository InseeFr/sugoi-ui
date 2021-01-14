import React from 'react';
import {
	createStyles,
	makeStyles,
	Theme,
	IconButton,
	Typography,
	Box,
	Popover,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

interface props {
	helpTextTitle?: string;
	helpText?: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
		},
		margin: {
			margin: theme.spacing(1),
		},
		typography: {
			padding: theme.spacing(1),
		},
	}),
);

const PopIcon = ({ helpTextTitle, helpText }: props) => {
	const classes = useStyles();
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
				className={classes.margin}
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
							className={classes.typography}
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
							className={classes.typography}
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
