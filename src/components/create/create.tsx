import { Grid } from '@material-ui/core';
import React, { useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Title from '../commons/title/title';
import MyStepper from './stepper';

const Create = () => {
	const { realm } = useParams<any>();

	const { push } = useHistory();

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
				<MyStepper
					steps={mySteps()}
					functionCreate={console.log}
				/>
			</Grid>
		</Grid>
	);
};

export default Create;
