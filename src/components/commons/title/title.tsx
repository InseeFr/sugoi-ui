import React from 'react';
import { Box, Typography } from '@material-ui/core';
interface props {
	title: string;
}

const Title = ({ title }: props) => {
	return (
		<Typography
			component="div"
			color="primary"
			variant="h6"
			gutterBottom
		>
			<Box fontWeight="fontWeightBold" m={1}>
				{title}
			</Box>
		</Typography>
	);
};

export default Title;
