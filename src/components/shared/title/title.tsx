import { Box, Typography } from '@mui/material';
// import { Variant } from '@mui/styles';
interface props {
	title: string;
	// variant: Variant;
}
const Title = ({ title }: props) => {
	return (
		<Typography component="div" color="primary">
			<Box fontWeight="fontWeightBold">{title}</Box>
		</Typography>
	);
};

Title.defaultProps = {
	variant: 'h6',
};

export default Title;
