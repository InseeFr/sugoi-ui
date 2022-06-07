import { Box, CircularProgress, Typography } from '@mui/material';

export const Loader = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
				textAlign: 'center',
			}}
		>
			<CircularProgress size={100} />
			<Typography color="textSecondary">
				Chargement en cours...
			</Typography>
		</Box>
	);
};
