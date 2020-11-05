import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import D from './../../i18n';
import LoginButton from './login-button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		toolbar: {
			paddingRight: 12, // keep right padding when drawer closed
		},
		title: {
			flexGrow: 12,
		},
	}),
);

const MyHeader = () => {
	const classes = useStyles();
	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					className={classes.title}
				>
					{D.title}
				</Typography>
				<LoginButton />
			</Toolbar>
		</AppBar>
	);
};

export default MyHeader;
