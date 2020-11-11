import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { useHistory } from 'react-router-dom';
import D from '../../../i18n';

const useStyles = makeStyles((theme) => ({
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	mainFeaturedPostContent: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
}));

const MainFeaturedPost = () => {
	const classes = useStyles();
	const { push } = useHistory();

	const {
		keycloak: { authenticated, login },
	} = useKeycloak();

	const action: any = () => {
		if (!authenticated) {
			login();
			push('/');
		}
	};

	return (
		<Paper
			className={classes.mainFeaturedPost}
			style={{
				backgroundImage: `url(/landing.jpg)`,
			}}
		>
			<div className={classes.overlay} />
			<Grid container>
				<Grid item md={6}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography
							component="h1"
							variant="h3"
							color="inherit"
							gutterBottom
						>
							Service Unifié de Gestion des
							Openldaps Internes
						</Typography>
						<Typography
							variant="h5"
							color="inherit"
							paragraph
						>
							{D.home_desc}
						</Typography>
						{authenticated ? null : (
							<Button
								variant="contained"
								color="primary"
								onClick={action}
							>
								C'est parti
							</Button>
						)}
					</div>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default MainFeaturedPost;
