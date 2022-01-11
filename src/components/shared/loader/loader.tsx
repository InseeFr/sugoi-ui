import { Box, CircularProgress, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
	createStyles({
		box: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			textAlign: 'center',
		},
	}),
);

export const Loader = () => {
	const classes = useStyles();

	return (
		<Box className={classes.box}>
			<CircularProgress size={100} />
			<Typography color="textSecondary">
				Chargement en cours...
			</Typography>
		</Box>
	);
};
