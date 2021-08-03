import { Grid } from '@material-ui/core';
import React from 'react';
import { Field } from '../../../model/field';
import GenerateFields from './fields/utils';

interface props {
	data: any;
	fields: Field[];
	handleChange: () => void;
}

export default ({ data, fields, handleChange }: props) => {
	const formFields = GenerateFields(data, handleChange, fields);
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			spacing={2}
		>
			{formFields.map((formField) => {
				return <Grid item>{formField}</Grid>;
			})}
		</Grid>
	);
};
