import React from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { Grid } from '@material-ui/core';
import Title from 'src/components/shared/title/title';
import MainFeaturedPost from './landingpage/landingpage';
import CardRights from './right-card';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { t } = useTranslation();
	document.title = t('home.page_title');
	const { oidcUser } = useReactOidc();
	return (
		<>
			<Title title={t('home.title')} />
			<MainFeaturedPost />
			{oidcUser && (
				<Grid container direction="column" spacing={5}>
					<Grid item>
						<CardRights />
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default Home;
