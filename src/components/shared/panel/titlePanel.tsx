import { Box, Typography } from '@mui/material';

interface props {
	title: string;
}

const TitlePanel = ({ title }: props) => {
	return (
		<Typography component="div" variant="h6" align="left">
			<Box fontWeight="fontWeightBold">{title}</Box>
		</Typography>
	);
};

export default TitlePanel;
