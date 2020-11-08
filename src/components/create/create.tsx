import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import D from './../../i18n';

interface Props {
	type_Recherche: String;
}

const Create = (props: Props) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h1" component="h2" gutterBottom>
					{D.create_title}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Create;
