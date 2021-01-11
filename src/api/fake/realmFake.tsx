import realms from './data/realms.json';

const get = (data: any) => Promise.resolve(data);

export const getRealms = (id?: string) => {
	return get([{ name: 'toto' }]);
};
