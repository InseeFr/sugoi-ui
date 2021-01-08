import { Grid } from '@material-ui/core';
import React from 'react';
import TextFieldInfo from './../dataViewer/fields/textFieldInfo';
import { field } from './../dataViewer/interface/interface';
interface props {
	data: any;
	fields: field[];
	handleChange: () => void;
}

export default ({ data, fields, handleChange }: props) => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			spacing={2}
		>
			{fields.map((field: field) => {
				switch (field.type) {
					case 'string':
						return (
							<Grid item xs={12}>
								<TextFieldInfo
									name={field.name}
									helpTextTitle={
										field.helpTextTitle
									}
									helpText={field.helpText}
									handleChange={
										handleChange
									}
									path={field.path}
									value={
										data[field.path] ||
										''
									}
									modifiable={
										field.modifiable
									}
								/>
							</Grid>
						);

					default:
						return null;
				}
			})}
		</Grid>
	);
};
