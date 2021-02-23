import { Grid } from '@material-ui/core';
import React from 'react';
import { field } from '../../../model/field';
import GenerateFields from '../formular/fields/utils';
import Panel from '../panel/panel';
interface props {
	data: any;
	fieldToDisplay: field[];
	handleChange: any;
}

const generatePanel = (
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

interface mainPanelProps {
	values: any;
	handleChange: any;
	mainsFields: field[];
	addressFields: field[];
	advancedFields: field[];
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
			{addressFields.length > 0
				? generatePanel(
						'Adresse',
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
									key={
										'field-' +
										field +
										'-' +
										i
									}
								>
									{field}
								</Grid>
							))}
						</Grid>,
						true,
						'Information générale',
						0,
				  )
				: null}
			{advancedFields.length > 0
				? generatePanel(
						'Information Complémentaire',
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
									key={
										'field-' +
										field +
										'-' +
										i
									}
								>
									{field}
								</Grid>
							))}
						</Grid>,
						true,
						'Autres infos',
						0,
				  )
				: null}
		</>
	);
};

interface contentProps {
	values: any;
	handleChange: any;
	fields: field[];
}
const ContentPanel = ({ values, handleChange, fields }: contentProps) => {
	return (
		<Grid
			container
			spacing={3}
			direction="column"
			justify="center"
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

const DataViewer = ({ data, fieldToDisplay, handleChange }: props) => {
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
	return (
		<Grid
			container
			spacing={3}
			direction="row"
			justify="center"
			alignItems="stretch"
			style={{ maxHeight: '70vh', overflow: 'auto' }}
		>
			<Grid item xs={12}>
				{generatePanel(
					'Information du profil',
					<MainPanel
						values={data}
						handleChange={handleChange}
						mainsFields={mainsFields}
						addressFields={addressFields}
						advancedFields={advancedFields}
					/>,
					false,
					'Information générale',
				)}
			</Grid>
			<Grid item xs={12}>
				{generatePanel(
					'Droits applicatifs',
					<ContentPanel
						values={data}
						handleChange={handleChange}
						fields={habilitationsFields}
					/>,
					true,
					"Gestion des droits de l'utilisateur",
				)}
			</Grid>
			<Grid item xs={12} md={6}>
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
			<Grid item xs={12} md={6}>
				{generatePanel(
					'Propriété',
					<ContentPanel
						values={data}
						handleChange={handleChange}
						fields={propertiesFields}
					/>,
					true,
					'blabla',
				)}
			</Grid>
		</Grid>
	);
};

export default DataViewer;
