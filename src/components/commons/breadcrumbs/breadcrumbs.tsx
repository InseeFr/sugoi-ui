import { Box, Breadcrumbs, Link, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';

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

interface Path {
	text: string;
	link: string;
	icon?: any;
}
const generateBreadCrumbs = (location: any): Path[] => {
	const currentPath: Path[] = [
		{ text: 'Accueil', link: '/', icon: <HomeIcon /> },
	];
	let match = matchPath(location.pathname, {
		path: '/realm/:realm',
	});
	if (match) {
		currentPath.push({
			text: 'Realm ' + (match.params as any)?.realm,
			link: '/realm/' + (match.params as any)?.realm,
		});
	}
	match = matchPath(location.pathname, {
		path: '/realm/:realm/user/:id',
	});
	if (match) {
		currentPath.push({
			text: 'User: ' + (match.params as any)?.id,
			link: '/user/' + (match.params as any)?.id,
		});
	}
	match = matchPath(location.pathname, {
		path: '/realm/:realm/organization/:id',
	});
	if (match) {
		currentPath.push({
			text: 'Organization: ' + (match.params as any)?.id,
			link: '/organization/' + (match.params as any)?.id,
		});
	}
	match = matchPath(location.pathname, {
		path: '/settings',
	});
	if (match) {
		currentPath.push({
			text: 'Paramètres',
			link: '/settings',
		});
	}
	return currentPath;
};

const MyBreadcrumbs = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const paths: Path[] = generateBreadCrumbs(location);
	return (
		<Box>
			<div className={classes.root}>
				<Breadcrumbs separator="›" color="primary">
					{paths.map((path) => (
						<Link
							onClick={() =>
								history.push(path.link)
							}
							color="primary"
							className={classes.link}
						>
							{path?.icon}
							{path.text}
						</Link>
					))}
				</Breadcrumbs>
			</div>
		</Box>
	);
};
export default MyBreadcrumbs;
