import { Realm } from '../../model/interface';

const get = (data: any) => Promise.resolve(data);

export const getFakeRealms = () => {
	return get([{ name: 'toto' }]);
};
