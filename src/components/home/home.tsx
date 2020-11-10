import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import D from '../../i18n';
import Title from '../commons/title/title';

const Home = () => {
	const {
		keycloak: { tokenParsed, authenticated },
	} = useKeycloak();

	return (
		<>
			<Title
				title={
					'Service Unifié de Gestion des Openldaps Internes'
				}
			/>
			<Grid
				container
				direction="column"
				justify="center"
				spacing={5}
			>
				<Grid item>
					<Card>
						<CardHeader title="C'est quoi ? " />
						<Divider />
						<CardContent>
							<Typography
								variant="body1"
								component="p"
							>
								{D.home_desc}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{authenticated ? (
					<Grid item>
						<Card>
							<CardHeader title="Vos droits: " />
							<Divider />
							<CardContent>
								<Typography
									variant="body1"
									component="p"
								>
									{tokenParsed?.realm_access?.roles
										.filter(
											(role) =>
												role.includes(
													'_Ouganext',
												) ||
												role.includes(
													'Administrateurs_Ouganext',
												),
										)
										.map((role, i) => (
											<ul
												key={
													'role' +
													i
												}
											>
												{role}
											</ul>
										))}{' '}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				) : null}
			</Grid>
		</>
	);
};

export default Home;
