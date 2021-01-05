import React from 'react';
import { Grid } from '@material-ui/core';
import Panel from '../panel/panel';
import ContentPanel from '../panel/contentPanel';
import Rights from './../rights/rights';

interface props {
	data: any;
	fieldToDisplay: any;
	dispatch: React.Dispatch<any>;
}

const DataViewer = ({ data, fieldToDisplay, dispatch }: props) => {
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Panel
						title="Informations principale"
						collapsible={false}
						children={
							<ContentPanel
								data={data}
								toDisplay={fieldToDisplay.basic}
								dispatch={dispatch}
							/>
						}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="stretch"
						spacing={2}
					>
						<Grid item xs={12}>
							<Panel
								title="Adresse"
								collapsible={true}
								children={
									<ContentPanel
										data={data}
										toDisplay={
											fieldToDisplay.address
										}
										dispatch={dispatch}
									/>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<Panel
								title="Informations complémentaire"
								collapsible={true}
								children={
									<ContentPanel
										data={data}
										toDisplay={
											fieldToDisplay.advanced
										}
										dispatch={dispatch}
									/>
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<Panel
								title="Droits applicatifs"
								collapsible={false}
								children={
									<Rights
										data={data}
										dispatch={dispatch}
										fieldToDisplay={
											fieldToDisplay
										}
									/>
								}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default DataViewer;
