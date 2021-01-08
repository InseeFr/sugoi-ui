import React from 'react';
import { Grid } from '@material-ui/core';
import Panel from '../panel/panel';
import ContentPanel from '../panel/contentPanel';
import Rights from './../rights/rights';
import Proprietes from '../propriete/propriete';
import User from '../../../model/user';
import Organization from '../../../model/organization';

interface props {
	data: User | Organization;
	fieldToDisplay: any;
	dispatch: React.Dispatch<any>;
	type: 'user' | 'organization';
}

const DataViewer = ({ data, fieldToDisplay, dispatch, type }: props) => {
	let toDisplay = Object.keys(fieldToDisplay);
	return (
		<>
			<Grid container spacing={3}>
				{toDisplay.includes('basic') ? (
					<Grid item xs={12} md={6}>
						<Panel
							title="Informations principale"
							collapsible={false}
							children={
								<ContentPanel
									data={data}
									toDisplay={
										fieldToDisplay.basic
									}
									dispatch={dispatch}
								/>
							}
						/>
					</Grid>
				) : null}
				{!toDisplay.includes('advanced') &&
				!toDisplay.includes('address') &&
				!toDisplay.includes('rights') ? null : (
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="stretch"
							spacing={2}
						>
							{toDisplay.includes('address') ? (
								<Grid item xs={12}>
									<Panel
										title="Adresse"
										collapsible={true}
										children={
											<ContentPanel
												data={
													data
												}
												toDisplay={
													fieldToDisplay.address
												}
												dispatch={
													dispatch
												}
											/>
										}
									/>
								</Grid>
							) : null}
							{toDisplay.includes('advanced') ? (
								<Grid item xs={12}>
									<Panel
										title="Informations complémentaire"
										collapsible={true}
										children={
											<ContentPanel
												data={
													data
												}
												toDisplay={
													fieldToDisplay.advanced
												}
												dispatch={
													dispatch
												}
											/>
										}
									/>
								</Grid>
							) : null}
							{toDisplay.includes('rights') &&
							type === 'user' ? (
								<Grid item xs={12}>
									<Panel
										title="Droits applicatifs"
										collapsible={true}
										children={
											<Rights
												data={
													data
												}
												dispatch={
													dispatch
												}
												fieldToDisplay={
													fieldToDisplay
												}
											/>
										}
									/>
								</Grid>
							) : null}
							<Grid item xs={12}>
								<Panel
									title="Propriété"
									collapsible={true}
									children={
										<Proprietes
											data={data}
											dispatch={
												dispatch
											}
										/>
									}
								/>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default DataViewer;
