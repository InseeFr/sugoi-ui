import { useEffect, useState } from 'react';

export const useForms = (initialValues: any) => {
	const [iFormValues, setIFormValues] = useState(initialValues);
	const [formValues, setFormValues] = useState(initialValues);

	useEffect(() => {
		setFormValues(iFormValues);
	}, [iFormValues]);

	const addProps = (
		obj: any,
		path: any,
		type: 'string' | 'list',
		value: any,
	) => {
		if (typeof path === 'string') {
			path = path.split('.');
		}
		obj[path[0]] = obj[path[0]] || {};
		var tmpObj = obj[path[0]];
		if (path.length > 1) {
			path.shift();
			addProps(tmpObj, path, type, value);
		} else {
			obj[path[0]] = value;
		}
		return obj;
	};

	const handleChange = (path: any, type: 'string' | 'list', value: any) => {
		const temp = addProps(formValues, path, type, value);
		setFormValues(temp);
	};

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
