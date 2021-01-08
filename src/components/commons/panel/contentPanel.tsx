import { Grid } from '@material-ui/core';
import React from 'react';
import TextFieldInfo from './../dataViewer/fields/textFieldInfo';
import { field } from './../dataViewer/interface/interface';
import get from 'lodash.get';
import ListFieldInfo from '../dataViewer/fields/listFieldInfo';
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
									value={get(
										data,
										field.path,
									)}
									modifiable={
										field.modifiable
									}
								/>
							</Grid>
						);
					case 'list':
						return (
							<Grid item xs={12}>
								<ListFieldInfo
									name={field.name}
									helpText={field.helpText}
									helpTextTitle={
										field.helpTextTitle
									}
									modifiable={
										field.modifiable
									}
									data={data}
									handleChange={
										handleChange
									}
									path={field.path}
									textButton={
										field.textButton
									}
									addTitle={field.addTitle}
									deleteTitle={
										field.deleteTitle
									}
								/>
							</Grid>
						);
					case 'habilitation':
						return (
							<Grid item xs={12}>
								Habilitation
							</Grid>
						);
					case 'role':
						return (
							<Grid item xs={12}>
								Role
							</Grid>
						);
					default:
						return null;
				}
			})}
		</Grid>
	);
};
