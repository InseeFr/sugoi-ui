import { useCallback, useEffect, useState } from 'react';
import set from 'lodash.set';
import { ErrorField, Field } from 'src/lib/model/field';
import { validateForm } from 'src/lib/utils/form_utils';
import cloneObject from 'src/lib/utils/clone';
import Organization from 'src/lib/model/api/organization';
import User from 'src/lib/model/api/user';

export const useForms = (initialValues: User | Organization) => {
	const [iFormValues, setIFormValues] = useState(
		cloneObject(initialValues),
	);
	const [formValues, setFormValues] = useState(cloneObject(initialValues));
	const [reset, setReset] = useState(false);
	const [errors, setErrors] = useState<ErrorField[]>([]);

	useEffect(() => {
		if (reset) {
			setFormValues(cloneObject(iFormValues));
			setReset(false);
		}
	}, [reset, iFormValues]);

	const handleChange = useCallback(
		(path: any) => (value: any) => {
			setFormValues((formValues) =>
				set(cloneObject(formValues), path, value),
			);
		},
		[],
	);

	const handleReset = useCallback(() => {
		setReset(true);
	}, []);

	const handleSubmit = (fields: Field[]) => (onSubmit: any) => {
		const errors = validateForm(fields)(formValues);
		if (errors && !errors.length) {
			setIFormValues(cloneObject(formValues));
			onSubmit();
		} else {
			setErrors(errors);
		}
	};

	return {
		formValues,
		handleChange,
		handleReset,
		errors,
		handleSubmit,
	};
};
