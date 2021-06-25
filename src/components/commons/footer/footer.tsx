import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../hooks/technics/useConfigFile';

const Footer = () => {
	const { t } = useTranslation();
	const version = useConfig('app_version');
	const commit_sha = useConfig('app_last_commit_sha');
	return (
		<>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12}>
					<Typography
						variant="body2"
						color="textSecondary"
						align="center"
					>
						{t('commons.footer.version.text')} :{' '}
						{version}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="body2"
						color="textSecondary"
						align="center"
					>
						{t('commons.footer.commit.text')} :{' '}
						{commit_sha}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};

export default Footer;
