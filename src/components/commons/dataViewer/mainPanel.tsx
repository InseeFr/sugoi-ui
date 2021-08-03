import { Grid, Paper, Tabs, Tab } from '@material-ui/core';
import React from 'react';
import { Field } from '../../../model/field';
import GenerateFields from '../formular/fields/utils';
import Panel from '../panel/panel';
import { ContentPanel, generatePanel } from './commons';

interface mainPanelProps {
	values: any;
	handleChange: any;
	mainsFields: Field[];
	addressFields: Field[];
	advancedFields: Field[];
}

const MainPanel = ({
	values,
	handleChange,
	mainsFields,
	addressFields,
	advancedFields,
}: mainPanelProps) => {
	return (
		<>
			<Grid container spacing={3} direction="row">
				{GenerateFields(values, handleChange, mainsFields).map(
					(field, i) => (
						<Grid
							item
							xs={12}
							md={6}
							key={'field-' + field + '-' + i}
						>
							{field}
						</Grid>
					),
				)}
			</Grid>
			{addressFields.length > 0 && (
				<Panel
					title="Adresse"
					collapsible={true}
					description="Information générale"
					elevation={0}
				>
					<Grid container spacing={3} direction="row">
						{GenerateFields(
							values,
							handleChange,
							addressFields,
						).map((field, i) => (
							<Grid
								item
								xs={12}
								md={6}
								key={'field-' + field + '-' + i}
							>
								{field}
							</Grid>
						))}
					</Grid>
				</Panel>
			)}
			{advancedFields.length > 0 && (
				<Panel
					title="Information Complémentaire"
					collapsible={true}
					description="Autres infos"
					elevation={0}
				>
					<Grid container spacing={3} direction="row">
						{GenerateFields(
							values,
							handleChange,
							advancedFields,
						).map((field, i) => (
							<Grid
								item
								xs={12}
								md={6}
								key={'field-' + field + '-' + i}
							>
								{field}
							</Grid>
						))}
					</Grid>
				</Panel>
			)}
		</>
	);
};

export default MainPanel;
