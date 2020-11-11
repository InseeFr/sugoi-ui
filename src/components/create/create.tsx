import { Grid } from '@material-ui/core';
import React from 'react';
import D from './../../i18n';
import Title from '../commons/title/title';
interface Props {
	type_Recherche: String;
}

const Create = (props: Props) => {
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
