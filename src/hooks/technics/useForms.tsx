import { useCallback, useEffect, useState } from 'react';
import set from 'lodash.set';

const addProps = (obj: any, path: any, value: any) => set(obj, path, value);

export const useForms = (initialValues: any) => {
	const [iFormValues, setIFormValues] = useState(initialValues || {});
	const [formValues, setFormValues] = useState(initialValues || {});
	const [todo, setTodo] = useState<any>(undefined);
	const [reset, setReset] = useState(false);

	useEffect(() => {
		if (todo) {
			const newFormValues = addProps(
				formValues,
				todo.path,
				todo.value,
			);
			setFormValues(newFormValues);
			setTodo(undefined);
		}
	}, [todo, formValues]);

	useEffect(() => {
		if (reset) {
			setFormValues(iFormValues);
			setReset(false);
		}
	}, [reset, iFormValues]);

	useEffect(() => {
		setFormValues(iFormValues);
	}, [iFormValues]);

	const handleChange = useCallback((path: any, value: any) => {
		setTodo({ path: path, value: value });
	}, []);

	const handleReset = () => {
		setReset(true);
	};

	return {
		iFormValues,
		updateIFormValues: setIFormValues,
		formValues,
		handleChange,
		handleReset,
	};
};
