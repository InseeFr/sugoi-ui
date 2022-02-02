import { useCallback, useEffect, useState } from 'react';
import set from 'lodash.set';
import isEqual from 'lodash.isequal';
import { ErrorField, Field } from 'src/lib/model/field';
import { validateForm } from 'src/lib/utils/form_utils';
import cloneObject from 'src/lib/utils/clone';
const addProps = (obj: any, path: any, value: any) => set(obj, path, value);

export const useForms = (initialValues: any) => {
	const [iFormValues, setIFormValues] = useState(
		cloneObject(initialValues || {}),
	);
	const [formValues, setFormValues] = useState(
		cloneObject(initialValues || {}),
	);
	const [todo, setTodo] = useState<any>();
	const [reset, setReset] = useState(false);
	const [errors, setErrors] = useState<ErrorField[]>([]);

	useEffect(() => {
		if (todo) {
			const newFormValues = addProps(
				{ ...formValues },
				todo.path,
				todo.value,
			);
			setFormValues({ ...newFormValues });
			setTodo(undefined);
		}
	}, [todo, formValues]);

	useEffect(() => {
		if (reset) {
			setFormValues(cloneObject(iFormValues));
			setReset(false);
		}
	}, [reset, iFormValues]);

	useEffect(() => {
		if (!isEqual(initialValues, iFormValues)) {
			setFormValues(cloneObject(initialValues));
			setIFormValues(cloneObject(initialValues));
		}
	}, [iFormValues, initialValues]);

	const handleChange = useCallback(
		(path: any) => (value: any) => {
			setTodo({ path: path, value: value });
		},
		[],
	);

	const handleReset = useCallback(() => {
		setReset(true);
	}, []);

	const handleSubmit = (fields: Field[]) => (onSubmit: any) => {
		const errors = validateForm(fields)(formValues);
		if (errors && !errors.length) {
			onSubmit();
		} else {
			setErrors(errors);
		}
	};

	return {
		iFormValues,
		formValues,
		handleChange,
		handleReset,
		errors,
		handleSubmit,
	};
};
