import React from 'react';
import { Grid } from '@material-ui/core';
import Title from '../commons/title/title';
import MainFeaturedPost from './landingpage/landingpage';
import CardRights from './right-card';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/auth/useAuth';

const Home = () => {
	const { authenticated } = useAuth();
	const { t } = useTranslation();
	return (
		<>
			<Title title={t('home.title')} />
			<MainFeaturedPost />
			{authenticated ? (
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
