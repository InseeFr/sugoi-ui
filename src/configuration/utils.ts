import { useState, useEffect } from 'react';
import axios from 'axios';

const basePath = `${window.location.origin}`;

export const getConfigFile = async () => {
	let client = axios.create({
		baseURL: basePath,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});
	try {
		const resp = await client.get('/configuration.json');
		return resp.data;
	} catch (err) {
		return console.log('Impossible de récuperer la configuration');
	}
};

export const configWrapper = (service: any) =>
	getConfigFile().then((resp) => service(resp));

// Hook permettant d'accéder a une property du fichier de config
export const useConfig = (property: string) => {
	const [_property, setProperty] = useState<null | string>(null);
	useEffect(() => {
		getConfigFile()
			.then((resp) => setProperty(resp[property]))
			.catch((err) => err);
	}, [property]);
	return _property;
};

export const useLocalStorage = (key: string, initialValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});
	const setValue = (value: any) => {
		try {
			if (value) {
				const valueToStore =
					value instanceof Function
						? value(storedValue)
						: value;
				setStoredValue(valueToStore);
				window.localStorage.setItem(
					key,
					JSON.stringify(valueToStore),
				);
			} else {
				window.localStorage.removeItem(key);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
};
