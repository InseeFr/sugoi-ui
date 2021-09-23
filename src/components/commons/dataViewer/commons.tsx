import { Grid } from '@material-ui/core';
import React from 'react';
import { Field } from '../../../model/field';
import GenerateFields from '../formular/fields/utils';
import Panel from '../panel/panel';

export const generatePanel = (
	title: string,
	children: JSX.Element,
	collapsible?: boolean,
	description?: string,
	elevation?: number,
) => {
	return (
		<Panel
			title={title}
			collapsible={collapsible}
			description={description}
			children={children}
			elevation={elevation}
		/>
	);
};

interface contentProps {
	values: any;
	handleChange: any;
	fields: Field[];
}

export const ContentPanel = ({
	values,
	handleChange,
	fields,
}: contentProps) => {
	return (
		<Grid
			container
			spacing={3}
			direction="column"
			justifyContent="center"
			alignItems="stretch"
		>
			{GenerateFields(values, handleChange, fields).map(
				(field, i) => (
					<Grid
						item
						xs={12}
						key={'field-' + field + '-' + i}
					>
						{field}
					</Grid>
				),
			)}
		</Grid>
	);
};
