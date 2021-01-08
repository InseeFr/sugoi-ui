import { Grid } from '@material-ui/core';
import React, { useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import reducer from '../commons/dataViewer/dataviewer.reducer';
import Title from '../commons/title/title';
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
