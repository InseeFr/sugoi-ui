import { Grid } from '@material-ui/core';
import React from 'react';
import Organization from '../../../model/organization';
import User from '../../../model/user';
import ContentPanel from '../panel/contentPanel';
import Panel from '../panel/panel';
import { panel } from './interface/interface';
interface props {
	data: User | Organization | any;
	fieldToDisplay: any;
	handleChange: any;
	type: 'user' | 'organization';
}

const DataViewer = ({ data, fieldToDisplay, handleChange, type }: props) => {
	const leftSide = fieldToDisplay?.left;
	const rightSide = fieldToDisplay?.right;

	return (
		<Grid container spacing={3}>
			{leftSide
				? Object.keys(leftSide)
						.map((key) => leftSide[key])
						.map((panel: panel) => {
							return (
								<Grid item xs={12} md={6}>
									{generateComponent(
										panel,
										data,
										handleChange,
									)}
								</Grid>
							);
						})
				: null}
			{rightSide
				? Object.keys(rightSide)
						.map((key) => rightSide[key])
						.map((panel: panel) => {
							return (
								<Grid item xs={12} md={6}>
									{generateComponent(
										panel,
										data,
										handleChange,
									)}
								</Grid>
							);
						})
				: null}
		</Grid>
	);
};

const generateComponent = (panel: panel, values: any, handleChange: any) => {
	switch (panel.type) {
		case 'panel':
			return (
				<Panel
					title={panel.title}
					collapsible={panel.collapsible}
					children={
						<ContentPanel
							data={values}
							handleChange={handleChange}
							fields={panel.fields}
						/>
					}
				/>
			);
			break;

		default:
			break;
	}
};

export default DataViewer;
