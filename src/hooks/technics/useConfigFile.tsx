import { useEffect, useState } from 'react';
import { getConfigFile } from '../../configuration/utils';

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
