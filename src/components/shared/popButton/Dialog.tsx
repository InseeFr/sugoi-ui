import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent } from '@material-ui/core';
import DialogTitle from './DialogTitle';

export interface SimpleDialogProps {
	open: boolean;
	onClose: any;
	title?: string;
	body?: React.ReactNode;
	actions?: React.ReactNode;
	fullwidth?: boolean;
	maxwidth?: false | 'xl' | 'xs' | 'sm' | 'md' | 'lg' | undefined;
}

const SimpleDialog = ({
	title,
	body,
	actions,
	open,
	onClose,
	fullwidth,
	maxwidth,
}: SimpleDialogProps) => {
	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			maxWidth={maxwidth !== undefined ? maxwidth : 'xl'}
			fullWidth={fullwidth !== undefined ? fullwidth : true}
		>
			<DialogTitle title={title} onClose={onClose} />
			<DialogContent dividers>{body}</DialogContent>
			<DialogActions>{actions}</DialogActions>
		</Dialog>
	);
};

export default SimpleDialog;
