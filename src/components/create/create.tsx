import React from 'react';
import { Grid } from '@material-ui/core';
import D from './../../i18n';
import Title from '../commons/title/title';

const Create = () => {
	return (
		<>
			<Title title={D.create_title} />
			<Grid container spacing={3}>
				<Grid item xs={12}></Grid>
			</Grid>
		</>
	);
};

export default Create;
