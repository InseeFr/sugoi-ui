import { Grid } from '@material-ui/core';
import React from 'react';
import TextFieldInfo from './fields/textFieldInfo';
import get from 'lodash.get';
import ListFieldInfoButton from './fields/listGenericFieldInfo';
import ListFieldInfo from './fields/listGenericFieldInfo/listFieldInfo';

import { field } from '../../../model/field';
import HabilitationFieldInfo from './fields/habilitationsFieldInfo';
import Groups from './fields/groupsFieldInfo';

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
					case 'list-with-button':
						return (
							<Grid item xs={12}>
								<ListFieldInfoButton
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
					case 'habilitations':
						return (
							<Grid item xs={12}>
								<HabilitationFieldInfo
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
					case 'groups':
						return (
							<Grid item xs={12}>
								<Groups
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
					default:
						return null;
				}
			})}
		</Grid>
	);
};
