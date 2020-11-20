import React from 'react';
import { Box, CircularProgress, Theme, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import D from '../../../i18n';

const useStyles = makeStyles((theme: Theme) =>
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
				{D.loader_loading}
			</Typography>
		</Box>
	);
};
