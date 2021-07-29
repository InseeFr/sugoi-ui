import React from 'react';
import { Box, Typography, TypographyClassKey } from '@material-ui/core';
interface props {
	title: string;
	variant?: TypographyClassKey;
}

const Title = ({ title, variant }: props) => {
	return (
		<Typography component="div" color="primary" variant="h6">
			<Box fontWeight="fontWeightBold">{title}</Box>
		</Typography>
	);
};

Title.defaultProps = {
	variant: 'h6',
};

export default Title;
