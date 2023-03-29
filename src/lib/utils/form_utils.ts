import { ErrorField, Field } from '../model/field';
import get from 'lodash.get';

function manageError(field: Field, errorFields: ErrorField[]): void {
	const candidate: ErrorField[] = errorFields.filter(
		(errorField) => errorField.field === field.name,
	);
	if (errorFields.length > 0) {
		field.error = { ...candidate[0] };
	} else {
		field.error = undefined;
	}
}
export const extractFieldAndAddError = (
	tag: string,
	fields: Field[],
	errorFields: ErrorField[],
) => {
	const extract = fields.filter((field) => field?.tag === tag);
	extract.forEach((field) => manageError(field, errorFields));
	return extract;
};

const validateIsRequired = (field: Field, formValues: any) => {
	return (
		get(formValues, field.path) !== undefined &&
		get(formValues, field.path) !== ''
	);
};

export const validateForm = (fields: Field[]) => (formValues: any) => {
	const errorFields: ErrorField[] = [];
	fields.forEach((field) => {
		if (field.required) {
			console.log(validateIsRequired(field, formValues));
			if (!validateIsRequired(field, formValues)) {
				errorFields.push({
					field: field.name,
					error: true,
					message: 'champs requis',
				});
			}
		}
	});
	return errorFields;
};
