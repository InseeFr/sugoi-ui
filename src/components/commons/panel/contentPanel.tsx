import { Grid } from '@material-ui/core';
import React from 'react';
import TextFieldInfoContainer from '../textFieldInfo/TextFieldInfo.container';

interface props {
	data: any;
	toDisplay: any;
	dispatch: React.Dispatch<any>;
}

export default ({ data, toDisplay, dispatch }: props) => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			spacing={2}
		>
			{toDisplay.map((field: any) => (
				<Grid item xs={12}>
					<TextFieldInfoContainer
						name={field.name}
						object={data}
						disabled={field.modifiable ? false : true}
						helpText={field.helpText}
						helpTextTitle={field.helpTextTitle}
						getFunctionName={field.getFunctionName}
						dispatch={dispatch}
						setFunctionName={field.setFunctionName}
						varName={field.varName}
					/>
				</Grid>
			))}
		</Grid>
	);
};
