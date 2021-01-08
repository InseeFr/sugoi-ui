import React from 'react';
import {
	Box,
	createStyles,
	Link,
	makeStyles,
	Theme,
	Typography,
	Grid,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useConfig } from '../../../hooks/technics/useConfigFile';
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
		<>
			<Box pt={2} className={classes.footer} />
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<GitHubIcon color="primary" />
				<Typography
					variant="body2"
					color="textSecondary"
					align="center"
				>
					<Link
						color="inherit"
						href="https://github.com/InseeFrLab/sugoi-ui"
					>
						Contribuer au projet
					</Link>
				</Typography>
			</Grid>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<AccountCircleIcon color="primary" />
				<Typography
					variant="body2"
					color="textSecondary"
					align="center"
				>
					<Link color="inherit" href={api ? api : '/'}>
						Notre api
					</Link>
				</Typography>
			</Grid>
		</>
	);
};

export default Footer;
