import { Box, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
interface props {
	title: string;
	variant: Variant;
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
