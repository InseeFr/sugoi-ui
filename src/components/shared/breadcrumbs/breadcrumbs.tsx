import React from 'react';
import { useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import routes from 'src/components/routes/routes';
import ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Breadcrumbs, Link } from '@mui/material';

const MyBreadcrumbs = () => {
	const navigate = useNavigate();
	const breadcrumbs = useBreadcrumbs(routes, {
		excludePaths: ['/realm', '/realm/:realm/us'],
	});
	const { t } = useTranslation();

	return (
		<Box>
			<Grid
				sx={{
					justifyContent: 'center',
					flexWrap: 'wrap',
				}}
			>
				<Breadcrumbs separator="›" color="primary">
					{breadcrumbs.map(({ match, breadcrumb }, i) => (
						<Link
							onClick={() =>
								navigate(match.pathname)
							}
							color="primary"
							sx={{
								display: 'flex',
							}}
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
			</Grid>
		</Box>
	);
};
export default MyBreadcrumbs;
