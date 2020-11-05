import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import D from './../../i18n';
export const KeycloakLoader = () => (
	<Box position="relative" display="inline-flex">
		<CircularProgress variant="static" />
		<Box
			top={0}
			left={0}
			bottom={0}
			right={0}
			position="absolute"
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			<Typography
				variant="caption"
				component="div"
				color="textSecondary"
			>
				{D.loader_loading}
			</Typography>
		</Box>
	</Box>
);
