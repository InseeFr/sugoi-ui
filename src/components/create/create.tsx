import { Grid } from '@material-ui/core';
import React, { useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import reducer from '../commons/dataViewer/dataviewer.reducer';
import FieldsToDisplay from '../commons/dataViewer/fieldToDisplay/FieldToDisplayConfig';
import Title from '../commons/title/title';
import ContentPanel from './../commons/panel/contentPanel';
import Panel from './../commons/panel/panel';
import Proprietes from './../commons/propriete/propriete';
import Rights from './../commons/rights/rights';
import MyStepper from './stepper';

const Create = () => {
	const { realm } = useParams<any>();

	const [state, dispatch] = useReducer(reducer, {
		data: {},
		initialData: {},
	});

	const { push } = useHistory();

	const create = () => {
		console.log(state.data);
		push('/realm/BRP');
	};

	const mySteps = () => [
		{ title: 'Choix type Entité', component: <>Choix entité</> },
		{
			title: 'Information Principales',
			component: (
				<Panel
					title="Informations principale"
					collapsible={false}
					children={
						<ContentPanel
							data={state.data}
							toDisplay={FieldsToDisplay.basic}
							dispatch={dispatch}
						/>
					}
				/>
			),
		},
		{
			title: 'Information complémentaire',
			component: (
				<Panel
					title="Informations Complémentaire"
					collapsible={false}
					children={
						<ContentPanel
							data={state.data}
							toDisplay={FieldsToDisplay.advanced}
							dispatch={dispatch}
						/>
					}
				/>
			),
		},
		{
			title: 'Adresse',
			component: (
				<Panel
					title="Adresse"
					collapsible={false}
					children={
						<ContentPanel
							data={state.data}
							toDisplay={FieldsToDisplay.address}
							dispatch={dispatch}
						/>
					}
				/>
			),
		},
		{
			title: 'Droits',
			component: (
				<Panel
					title="Droits applicatifs"
					collapsible={false}
					children={
						<Rights
							data={state.data}
							dispatch={dispatch}
							fieldToDisplay={FieldsToDisplay}
						/>
					}
				/>
			),
		},
		{
			title: 'Propriété',
			component: (
				<Panel
					title="Propriété"
					collapsible={false}
					children={
						<Proprietes
							data={state.data}
							dispatch={dispatch}
						/>
					}
				/>
			),
		},
	];

	return (
		<Grid container spacing={2} direction="column">
			<Grid item>
				<Title
					title={'Créer une entité dans le realm: ' + realm}
				/>
			</Grid>
			<Grid item>
				<MyStepper steps={mySteps()} functionCreate={create} />
			</Grid>
		</Grid>
	);
};

export default Create;
