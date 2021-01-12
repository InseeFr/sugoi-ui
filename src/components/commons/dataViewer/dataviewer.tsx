import { Grid } from '@material-ui/core';
import React from 'react';
import Organization from '../../../model/api/organization';
import { section } from '../../../model/panel';
import User from '../../../model/api/user';
import Formular from '../../commons/formular';
import Panel from '../panel/panel';
interface props {
	data: User | Organization | any;
	fieldToDisplay: any;
	handleChange: any;
}

const DataViewer = ({ data, fieldToDisplay, handleChange }: props) => {
	const leftSide = fieldToDisplay?.left;
	const rightSide = fieldToDisplay?.right;

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Grid container direction="column" spacing={2}>
					{leftSide
						? Object.keys(leftSide)
								.map((key) => leftSide[key])
								.map((panel: section) => {
									return (
										<Grid item xs={12}>
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
			</Grid>
			<Grid item xs={12} md={6}>
				<Grid container direction="column" spacing={2}>
					{rightSide
						? Object.keys(rightSide)
								.map((key) => rightSide[key])
								.map((panel: section) => {
									return (
										<Grid item xs={12}>
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
			</Grid>
		</Grid>
	);
};

const generateComponent = (panel: section, values: any, handleChange: any) => {
	switch (panel.type) {
		case 'panel':
			return (
				<Panel
					title={panel.title}
					collapsible={panel.collapsible}
					children={
						<Formular
							data={values}
							handleChange={handleChange}
							fields={panel.fields}
						/>
					}
				/>
			);
		default:
			break;
	}
};

export default DataViewer;
