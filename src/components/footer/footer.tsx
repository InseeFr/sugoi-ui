import {
	Box,
	createStyles,
	Link,
	makeStyles,
	Theme,
	Typography,
	Grid,
} from '@material-ui/core';
import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useConfig } from '../../configuration/utils';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		footer: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3),
			minHeight: '10%',
		},
	}),
);

const Footer = () => {
	const classes = useStyles();
	const api = useConfig('api');
	return (
		<Box pt={2} className={classes.footer}>
			<Typography
				variant="body2"
				color="textSecondary"
				align="center"
			>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<GitHubIcon color="primary" />
					<Link
						color="inherit"
						href="https://github.com/InseeFrLab/sugoi-ui"
					>
						Contribuer au projet
					</Link>
				</Grid>
			</Typography>
			<Typography
				variant="body2"
				color="textSecondary"
				align="center"
			>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<AccountCircleIcon color="primary" />
					<Link color="inherit" href={api ? api : '/'}>
						Notre api
					</Link>
				</Grid>
			</Typography>
		</Box>
	);
};

export default Footer;
