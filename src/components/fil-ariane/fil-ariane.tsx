import React from 'react';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';

const Ariane = () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" href="/">
				Material-UI
			</Link>
			<Link color="inherit" href="/getting-started/installation/">
				Core
			</Link>
			<Typography color="textPrimary">Breadcrumb</Typography>
		</Breadcrumbs>
	);
};

export default Ariane;
