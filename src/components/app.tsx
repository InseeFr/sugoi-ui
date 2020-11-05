import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import Footer from './footer/footer';
import Header from './header/header';
import Root from './root';
import Sider from './sider/sider';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},

		toolbar: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		container: {
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
			background: '#ffffff',
			minHeight: '100%',
		},
	}),
);

export default function MiniDrawer() {
	const classes = useStyles();
	const {
		keycloak: { authenticated },
	} = useKeycloak();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header />
			{authenticated ? <Sider /> : null}
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Container maxWidth="xl" className={classes.container}>
					<Root />
				</Container>
				<Divider />
				<Footer />
			</main>
		</div>
	);
}
