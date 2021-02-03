import React from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { Grid } from '@material-ui/core';
import Title from '../commons/title/title';
import MainFeaturedPost from './landingpage/landingpage';
import CardRights from './right-card';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { oidcUser } = useReactOidc();
	const { t } = useTranslation();
	return (
		<>
			<Title title={t('home.title')} />
			<MainFeaturedPost />
			{oidcUser ? (
				<Grid
					container
					direction="column"
					justify="center"
					spacing={5}
				>
					<Grid item>
						<CardRights />
					</Grid>
				</Grid>
			) : null}
		</>
	);
};

export default Home;
