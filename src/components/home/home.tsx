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
import Title from '../commons/title/title';
import MainFeaturedPost from './landingpage/landingpage';

const Home = () => {
	const {
		keycloak: { tokenParsed, authenticated },
	} = useKeycloak();
	let roles = tokenParsed?.realm_access?.roles.filter(
		(role) =>
			role.includes('_Ouganext') ||
			role.includes('Administrateurs_Ouganext'),
	);
	return (
		<>
			<Title
				title={
					'Service Unifié de Gestion des Openldaps Internes'
				}
			/>
			<MainFeaturedPost />
			<Grid
				container
				direction="column"
				justify="center"
				spacing={5}
			>
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
									{roles &&
									roles?.length > 0
										? roles?.map(
												(
													role,
													i,
												) => (
													<ul
														key={
															'role' +
															i
														}
													>
														{
															role
														}
													</ul>
												),
										  )
										: "Vous n'avez aucun droits"}
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
