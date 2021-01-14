import { Grid, Typography } from '@material-ui/core';
import React from 'react';

const Footer = () => {
	return (
		<>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12}>
					<Typography
						variant="body2"
						color="textSecondary"
						align="center"
					>
						Version: {process.env.REACT_APP_UI_VERSION}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="body2"
						color="textSecondary"
						align="center"
					>
						Commit-SHA:{' '}
						{process.env.REACT_APP_UI_COMMIT_SHA}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};

export default Footer;
