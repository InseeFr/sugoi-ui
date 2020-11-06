import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/';

export const mainColor = '#3078E4';
export const secondaryColor = '#FFFFFF';
export const thirdColor = '9BBFDF';

const dark = createMuiTheme({
	palette: {
		type: 'dark',
		primary: { main: mainColor },
		secondary: { main: secondaryColor },
	},
});

const light = createMuiTheme({
	palette: {
		type: 'light',
		primary: { main: mainColor },
		secondary: { main: secondaryColor },
	},
});

export const DarkTheme = responsiveFontSizes(dark);

export const LightTheme = responsiveFontSizes(light);
