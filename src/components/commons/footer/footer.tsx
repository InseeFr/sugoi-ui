import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GitInfo from 'react-git-info/macro';

const Footer = () => {
	const gitInfo = GitInfo();
	const { t } = useTranslation();
	return (
		<Grid container direction="column" alignItems="center">
			<Grid item xs={12}>
				<Typography
					variant="body2"
					color="textSecondary"
					align="center"
				>
					{t('commons.footer.version.text')} :{' '}
					{gitInfo.tags || gitInfo.branch}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography
					variant="body2"
					color="textSecondary"
					align="center"
				>
					{t('commons.footer.commit.text')} :{' '}
					{gitInfo.commit.hash}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;
