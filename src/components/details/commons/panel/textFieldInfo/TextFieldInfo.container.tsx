import React from 'react';
import TextFieldInfo from './textFieldInfo';

interface props {
	name: string;
	object: any;
	helpTextTitle: string;
	helpText?: string;
	disabled?: boolean;
	getFunctionName: string;
	setFunctionName?: string;
	setFunction?: any;
	varName?: string;
}

const getFunction = (functionName: string) => {
	switch (functionName) {
		case 'value':
			break;

		default:
			break;
	}
};

export default ({
	name,
	object,
	disabled,
	helpText,
	helpTextTitle,
	setFunctionName,
	getFunctionName,
	setFunction,
	varName,
}: props) => {
	return (
		<TextFieldInfo
			name={name}
			object={object}
			disabled={disabled}
			helpText={helpText}
			helpTextTitle={helpTextTitle}
			getFunction={getFunction(getFunctionName)}
			setFunction={setFunction}
			setFunctionName={setFunctionName}
			varName={varName}
		/>
	);
};
