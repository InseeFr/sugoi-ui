import React from 'react';
import Title from '../commons/title/title';
import DataViewer from '../commons/dataViewer/dataviewer';
import { Button, Grid } from '@material-ui/core';
interface props {
	data: any;
	fieldToDisplay: any;
	id: string;
	dispatch: React.Dispatch<any>;
}

const Detail = ({ data, fieldToDisplay, id, dispatch }: props) => {
	return (
		<>
			<Title title={'Détail du contact ' + id} />
			<DataViewer
				data={data}
				fieldToDisplay={fieldToDisplay}
				dispatch={dispatch}
			/>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={3}
				>
					<Grid item></Grid>
					<Grid item>
						<Button
							variant="contained"
							color="default"
							onClick={() =>
								dispatch({
									type: 'Reset',
								})
							}
						>
							Reset
						</Button>
					</Grid>

					<Grid item>
						<Button variant="contained" color="default">
							Réinitialiser le mot de passe
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							// onClick={}
						>
							Enregistrer les modifications
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
						>
							Supprimer
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default Detail;
