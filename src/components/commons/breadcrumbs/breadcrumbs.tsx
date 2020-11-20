import React from 'react';
import { Route } from 'react-router';
import { Breadcrumbs, makeStyles, Link, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

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

	return (
		<Box>
			<div className={classes.root}>
				<Route>
					{({ location }) => {
						const pathnames = location.pathname
							.split('/')
							.filter((x) => x);
						return (
							<Breadcrumbs
								separator="›"
								color="primary"
							>
								<Link
									onClick={() =>
										history.push('/')
									}
									color="primary"
									className={classes.link}
								>
									<HomeIcon
										className={
											classes.icon
										}
									/>
									Accueil
								</Link>
								{pathnames.map((path) => {
									return (
										<Link
											key={
												'breacrumbs-' +
												path
											}
											onClick={() =>
												history.push(
													'/' +
														path,
												)
											}
											color="primary"
										>
											{path
												.charAt(
													0,
												)
												.toLocaleUpperCase() +
												path.slice(
													1,
												)}
										</Link>
									);
								})}
							</Breadcrumbs>
						);
					}}
				</Route>
			</div>
		</Box>
	);
};
export default MyBreadcrumbs;
