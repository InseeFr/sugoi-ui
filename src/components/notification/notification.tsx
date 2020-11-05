import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
const Alert = (props: AlertProps) => (
	<MuiAlert elevation={6} variant="filled" {...props} />
);
const openNotificationWithIcon = (message: String, description: String) => (
	<Snackbar autoHideDuration={6000}>
		<Alert severity="success">This is a success message!</Alert>
	</Snackbar>
);
export default openNotificationWithIcon;
