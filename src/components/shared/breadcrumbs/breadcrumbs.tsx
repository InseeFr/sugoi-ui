// src/components/shared/breadcrumbs/breadcrumbs.tsx
import { Box, Breadcrumbs, Grid, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import routes from 'src/components/routes/routes';
import { useBreadcrumbs } from './useBreadcrumbs';

const MyBreadcrumbs = () => {
	const { t } = useTranslation();
	const breadcrumbs = useBreadcrumbs(routes, {
		excludePaths: ['/realm', '/realm/:realm/us'],
	});

	return (
		<Box>
			<Grid sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
				<Breadcrumbs separator="›" color="primary">
					{breadcrumbs.map(({ match, breadcrumb }, i) => (
						<Link
							component={RouterLink}
							to={match.pathname}
							color="primary"
							sx={{ display: 'flex' }}
							key={'breadcrumbs_' + i}
						>
							{t(
								typeof breadcrumb === 'function'
									? breadcrumb({ match })
									: breadcrumb,
							)}
						</Link>
					))}
				</Breadcrumbs>
			</Grid>
		</Box>
	);
};

export default MyBreadcrumbs;
