import { Box, Typography } from '@mui/material';

interface props {
	title: string;
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'subtitle1'
		| 'subtitle2'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'button'
		| 'overline'
		| 'inherit';
}
const Title = ({ title, variant }: props) => {
	return (
		<Typography component="div" color="primary" variant={variant}>
			<Box fontWeight="fontWeightBold">{title}</Box>
		</Typography>
	);
};

Title.defaultProps = {
	variant: 'h6',
};

export default Title;
