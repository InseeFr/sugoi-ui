import {
	Card,
	CardContent,
	CardHeader,
	Grid,
	Typography,
} from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import D from '../../i18n';
import {} from '../utils/roles';

const Home = () => {
	const {
		keycloak: { tokenParsed, authenticated },
	} = useKeycloak();
	console.log(process.env);

	return (
		<Grid container direction="column" justify="center" spacing={5}>
			<Grid item>
				<Card>
					<CardHeader title="C'est quoi ? " />
					<CardContent>
						<Typography variant="body1" component="p">
							{D.home_desc}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
			{authenticated ? (
				<Grid item>
					<Card>
						<CardHeader title="Vos droits: " />
						<CardContent>
							<Typography
								variant="body1"
								component="p"
							>
								{tokenParsed?.realm_access?.roles
									// .filter(
									// 	(role) =>
									// 		role.includes(
									// 			'_Ouganext',
									// 		) ||
									// 		role.includes(
									// 			'Administrateurs_Ouganext',
									// 		),
									// )
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
	);
};

export default Home;
