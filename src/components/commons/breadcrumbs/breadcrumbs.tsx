import { Box, Breadcrumbs, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import routes from '../../../routes/routes';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	root: {
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	paper: {
		padding: theme.spacing(1, 2),
		color: '#00000',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
	link: {
		display: 'flex',
	},
}));

const MyBreadcrumbs = () => {
	const classes = useStyles();
	const history = useHistory();
	const breadcrumbs = useBreadcrumbs(routes, {
		excludePaths: ['/realm', '/realm/:realm/us'],
	});
	const { t } = useTranslation();

	return (
		<Box>
			<div className={classes.root}>
				<Breadcrumbs separator="›" color="primary">
					{breadcrumbs.map(({ match, breadcrumb }, i) => (
						<Link
							onClick={() =>
								history.push(match.url)
							}
							color="primary"
							className={classes.link}
							key={'breadcrumbs_' + i}
						>
							{t(
								ReactDOMServer.renderToStaticMarkup(
									breadcrumb as React.ReactElement,
								)
									.replace('<span>', '')
									.replace('</span>', ''),
							)}
						</Link>
					))}
				</Breadcrumbs>
			</div>
		</Box>
	);
};
export default MyBreadcrumbs;
