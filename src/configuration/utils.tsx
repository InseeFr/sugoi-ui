import axios from 'axios';

const basePath = `${window.location.origin}`;
const nameAppConfigFile = process.env.REACT_APP_NAME_APP_CONFIG_FILE
	? process.env.REACT_APP_NAME_APP_CONFIG_FILE
	: 'configuration.json';
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
		const resp = await client.get('/' + nameAppConfigFile);
		return resp.data;
	} catch (err) {
		return console.log('Impossible de récuperer la configuration');
	}
};

export const configWrapper = (service: any) =>
	getConfigFile().then((resp) => service(resp));
