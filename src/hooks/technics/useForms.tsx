import { useCallback, useEffect, useState } from 'react';
import set from 'lodash.set';

const addProps = (obj: any, path: any, value: any) => set(obj, path, value);

export const useForms = (initialValues: any) => {
	const [iFormValues, setIFormValues] = useState(initialValues || {});
	const [formValues, setFormValues] = useState(initialValues || {});
	const [todo, setTodo] = useState<any>(undefined);

	useEffect(() => {
		if (todo) {
			console.log(todo);
			const newFormValues = addProps(
				formValues,
				todo.path,
				todo.value,
			);
			console.log('new form values:');
			console.log(formValues);
			setFormValues(newFormValues);
			setTodo(undefined);
		}
	}, [todo, formValues]);

	useEffect(() => {
		setFormValues(iFormValues);
	}, [iFormValues]);

	const handleChange = useCallback((path: any, value: any) => {
		setTodo({ path: path, value: value });
	}, []);

	const handleReset = () => {
		setFormValues(iFormValues);
	};

	return {
		iFormValues,
		updateIFormValues: setIFormValues,
		formValues,
		handleChange,
		handleReset,
	};
};
