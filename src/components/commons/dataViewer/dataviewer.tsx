import { Grid, Paper, Tabs, Tab } from '@material-ui/core';
import React from 'react';
import { field } from '../../../model/field';
import GenerateFields from '../formular/fields/utils';
import Panel from '../panel/panel';
import { ContentPanel, generatePanel } from './commons';
import MainPanel from './mainPanel';
interface props {
	data: any;
	fieldToDisplay: field[];
	handleChange: any;
	create: boolean;
	buttons?: any;
}

const DataViewer = ({
	data,
	fieldToDisplay,
	handleChange,
	buttons,
	create,
}: props) => {
	const mainsFields = fieldToDisplay.filter(
		(field) => field.tag === 'main',
	);
	const advancedFields = fieldToDisplay.filter(
		(field) => field.tag === 'advanced',
	);
	const addressFields = fieldToDisplay.filter(
		(field) => field.tag === 'address',
	);
	const credentialsFields = fieldToDisplay.filter(
		(field) => field.tag === 'credentials',
	);
	const habilitationsFields = fieldToDisplay.filter(
		(field) => field.tag === 'habilitations',
	);
	const propertiesFields = fieldToDisplay.filter(
		(field) => field.tag === 'properties',
	);

	const [value, setValue] = React.useState(0);

	const handleChangeTabs = (
		event: React.ChangeEvent<{}>,
		newValue: number,
	) => {
		setValue(newValue);
	};
	return (
		<Grid
			container
			spacing={3}
			direction="row"
			justify="center"
			alignItems="stretch"
		>
			<Grid item xs={12}>
				<Paper square>
					<Tabs
						value={value}
						indicatorColor="primary"
						textColor="primary"
						onChange={handleChangeTabs}
						aria-label="disabled tabs example"
					>
						<Tab label="Détails" />
						{habilitationsFields.length > 0 && (
							<Tab
								label="Droits applicatifs"
								disabled={create}
							/>
						)}
					</Tabs>
				</Paper>
			</Grid>

			{value === 0 && (
				<>
					<Grid item xs={12}>
						<Panel
							title="Information du profil"
							collapsible={false}
							description="Information générale"
						>
							<MainPanel
								values={data}
								handleChange={handleChange}
								mainsFields={mainsFields}
								addressFields={addressFields}
								advancedFields={advancedFields}
							/>
						</Panel>
					</Grid>
					{propertiesFields.length > 0 && (
						<Grid
							item
							xs={12}
							md={
								credentialsFields.length > 0
									? 6
									: 12
							}
						>
							<Panel
								title="Propriété"
								collapsible={true}
							>
								<ContentPanel
									values={data}
									handleChange={
										handleChange
									}
									fields={propertiesFields}
								/>
							</Panel>
						</Grid>
					)}
					<Grid item xs={12}>
						{buttons}
					</Grid>
				</>
			)}
			{value === 1 && habilitationsFields.length > 0 && (
				<Grid item xs={12}>
					<Panel
						title="Droits applicatifs"
						collapsible={false}
						description="Gestion des droits de
						l'utilisateur"
					>
						<ContentPanel
							values={data}
							handleChange={handleChange}
							fields={habilitationsFields}
						/>
					</Panel>
				</Grid>
			)}
			{value === 2 && credentialsFields.length > 0 && (
				<Grid
					item
					xs={12}
					md={propertiesFields.length > 0 ? 6 : 12}
				>
					{generatePanel(
						'Gestion des credentials',
						<ContentPanel
							values={data}
							handleChange={handleChange}
							fields={credentialsFields}
						/>,
						true,
						"Gestion des credentials de l'utilisateurs",
					)}
				</Grid>
			)}
		</Grid>
	);
};

export default DataViewer;
