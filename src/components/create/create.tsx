import React, { useReducer } from 'react';
import Title from '../commons/title/title';
import DataViewer from '../commons/dataViewer/dataviewer';
import reducer from '../commons/dataViewer/dataviewer.reducer';
import { useParams } from 'react-router-dom';
import FieldsToDisplay from '../commons/dataViewer/fieldToDisplay/FieldToDisplayConfig';
import { Button, Grid } from '@material-ui/core';

interface props {
	data: any;
	fieldToDisplay: any;
	id: string;
	dispatch: React.Dispatch<any>;
}

const Create = () => {
	const { id } = useParams<any>();

	const [state, dispatch] = useReducer(reducer, {
		data: {},
		initialData: {},
	});

	return (
		<>
			<Title title={'Créer un contact dans le realm: ' + id} />
			<DataViewer
				data={state.data}
				fieldToDisplay={FieldsToDisplay}
				dispatch={dispatch}
			/>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={3}
				>
					<Grid item>
						<Button variant="contained" color="primary">
							Créer
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Create;
