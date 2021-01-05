import React from 'react';
import { createStyles, makeStyles, Theme, TextField } from '@material-ui/core';
import PopIcon from '../popIcon/popIcon';

interface props {
	name: string;
	helpTextTitle?: string;
	helpText?: string;
	disabled?: boolean;
	value?: string;
	dispatch: any;
	setFunctionName?: string;
	varName?: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
		},
	}),
);
const TextFieldInfo = ({
	name,
	disabled,
	helpTextTitle,
	helpText,
	value,
	dispatch,
	setFunctionName,
	varName,
}: props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<TextField
				variant="outlined"
				label={name}
				name={name}
				disabled={disabled}
				value={value}
				fullWidth
				onChange={(e) =>
					dispatch({
						type: setFunctionName,
						payload: {
							name: varName,
							value: e.target.value,
						},
					})
				}
			/>
			{!helpText && !helpTextTitle ? null : (
				<PopIcon
					helpTextTitle={helpTextTitle}
					helpText={helpText}
				/>
			)}
		</div>
	);
};

export default TextFieldInfo;
