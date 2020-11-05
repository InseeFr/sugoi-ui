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
