import React from 'react';
import TextFieldInfo from './textFieldInfo';
import * as utils from '../utils';

interface props {
	name: string;
	object: any;
	helpTextTitle?: string;
	helpText?: string;
	disabled?: boolean;
	getFunctionName?: string;
	setFunctionName?: string;
	dispatch?: React.Dispatch<any>;
	varName?: string;
}

const getFunction = (functionName: string | undefined) => {
	switch (functionName) {
		case 'GetElementFromRoot':
			return utils.getElementFromRoot;
		case 'GetElementFromAddress':
			return utils.getElementFromAddress;
		case 'GetElementFromAttributes':
			return utils.getElementFromAttributes;
		default:
			return utils.getElementFromAttributes;
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
	dispatch,
	varName,
}: props) => {
	return (
		<TextFieldInfo
			name={name}
			disabled={disabled}
			helpText={helpText}
			helpTextTitle={helpTextTitle}
			value={getFunction(getFunctionName)(object, varName)}
			dispatch={dispatch}
			setFunctionName={setFunctionName}
			varName={varName}
		/>
	);
};
