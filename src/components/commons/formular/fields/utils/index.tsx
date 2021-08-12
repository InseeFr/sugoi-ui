import get from 'lodash.get';
import React from 'react';
import { Field } from '../../../../../model/field';
import GroupsField from '../groupsFieldInfo';
import HabilitationsPopup from '../habilitationsFieldInfo';
import ListFieldInfoButton from './../listGenericFieldInfo';
import ListFieldInfo from './../listGenericFieldInfo/listFieldInfo';
import TextFieldInfo from '../textFieldInfo';
import SimpleAppManagedAttributes from '../simpleAppManageAttributes';

export const GenerateFields = (
	data: any,
	handleChange: any,
	fields: Field[],
): JSX.Element[] => {
	const generateFields: JSX.Element[] = [];
	fields.forEach((field: Field) => {
		switch (field.type) {
			case 'string':
				generateFields.push(
					<TextFieldInfo
						name={field.name}
						helpTextTitle={field.helpTextTitle}
						helpText={field.helpText}
						handleChange={handleChange(field.path)}
						value={get(data, field.path)}
						modifiable={field.modifiable}
					/>,
				);
				break;
			case 'list-with-button':
				generateFields.push(
					<ListFieldInfoButton
						name={field.name}
						helpText={field.helpText}
						helpTextTitle={field.helpTextTitle}
						modifiable={field.modifiable}
						value={get(data, field.path, [])}
						handleChange={handleChange(field.path)}
						textButton={field.options.textButton}
						addTitle={field.options.addTitle}
						deleteTitle={field.options.deleteTitle}
					/>,
				);
				break;

			case 'list':
				generateFields.push(
					<ListFieldInfo
						name={field.name}
						helpText={field.helpText}
						helpTextTitle={field.helpTextTitle}
						modifiable={field.modifiable}
						value={get(data, field.path, [])}
						handleChange={handleChange(field.path)}
						textButton={field.options.textButton}
						addTitle={field.options.addTitle}
						deleteTitle={field.options.deleteTitle}
					/>,
				);
				break;

			case 'habilitations':
				generateFields.push(
					<HabilitationsPopup
						name={field.name}
						helpText={field.helpText}
						helpTextTitle={field.helpTextTitle}
						modifiable={field.modifiable}
						textButton={field.options.textButton}
						addTitle={field.options.addTitle}
						deleteTitle={field.options.deleteTitle}
						attribute_key={
							field.options.attribute_key as string
						}
					/>,
				);
				break;

			case 'groups':
				generateFields.push(
					<GroupsField
						name={field.name}
						helpText={field.helpText}
						modifiable={field.modifiable}
						textButton={field.options.textButton}
					/>,
				);
				break;

			case 'simpleAppManagedAttributes':
				generateFields.push(
					<SimpleAppManagedAttributes
						name={field.name}
						helpText={field.helpText}
						helpTextTitle={field.helpTextTitle}
						modifiable={field.modifiable}
						value={field.path}
						textButton={field.options.textButton}
						addTitle={field.options.addTitle}
						deleteTitle={field.options.deleteTitle}
						attribute_key={
							field.options.attribute_key as string
						}
					/>,
				);
				break;

			default:
				return null;
		}
	});
	return generateFields;
};

export default GenerateFields;
