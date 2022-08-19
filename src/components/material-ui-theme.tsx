import { responsiveFontSizes } from '@mui/material/';
import { createTheme } from '@mui/material/styles';
export const mainColor = '#3078E4';

const dark = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#4791db' },
		secondary: { main: '#e33371' },
		error: { main: '#e57373' },
		warning: { main: '#ffb74d' },
		info: { main: '#64b5f6' },
		success: { main: '#81c784' },
		// grey: {
		// 	A100: '#d5d5d5',
		// 	A200: '#aaaaaa',
		// 	A400: '#303030',
		// },
		background: { default: '#303030', paper: '#424242' },
	},
});

const light = createTheme({
	palette: {
		mode: 'light',
		primary: { main: '#115293' },
		secondary: { main: '#9a0036' },
		error: { main: '#d32f2f' },
		warning: { main: '#f57c00' },
		info: { main: '#1976d2' },
		success: { main: '#388e3c' },
	},
});

export const DarkTheme = responsiveFontSizes(dark);

export const LightTheme = responsiveFontSizes(light);
