import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Title from '../commons/title/title';
import Panel from './commons/panel/panel';
import ContentPanel from './commons/panel/contentPanel';
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
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Panel
						title="Informations principale"
						collapsible={false}
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
				<Grid item xs={12} md={6}></Grid>
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
							<Button
								variant="contained"
								color="default"
							>
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
			</Grid>
		</>
	);
};

export default Detail;
