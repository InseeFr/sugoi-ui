import { Grid, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface props {
	children: any;
	handleClick?: () => void;
	loading: boolean;
	error?: any;
	variant?: 'text' | 'outlined' | 'contained' | undefined;
	color?: 'inherit' | 'primary' | 'secondary' | 'default' | any;
}

export default function LoadingButton({
	children,
	handleClick,
	loading,
	variant,
	color,
}: props) {
	const theme = useTheme();
	return (
		<Grid sx={{ position: 'relative' }}>
			<Button
				variant={variant}
				color={color}
				disabled={loading}
				onClick={handleClick}
			>
				{children}
			</Button>
			{loading && (
				<CircularProgress
					size={24}
					sx={{
						color: theme.palette.primary.main,
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: -12,
						marginLeft: -12,
					}}
				/>
			)}
		</Grid>
	);
}
