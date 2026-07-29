import axios from 'axios';

const basePath = `${window.location.origin}`;
const nameAppConfigFile = import.meta.env.VITE_NAME_APP_CONFIG_FILE
	? import.meta.env.VITE_NAME_APP_CONFIG_FILE
	: 'configuration.json';
export const getConfigFile = async (): Promise<any> => {
	const client = axios.create({
		baseURL: basePath,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	try {
		const resp = await client.get('/' + nameAppConfigFile);
		return resp.data;
	} catch {
		return console.log('Impossible de récuperer la configuration');
	}
};
