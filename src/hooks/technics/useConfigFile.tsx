import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '../../configuration/store-configuration';
import { getConfigFile } from '../../configuration/utils';
import { saveConfig } from './../../redux/actions/app';

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

export const useConfigFile = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const [config, setConfig] = useState<any>();
	useEffect(() => {
		getConfigFile()
			.then((config) => {
				setConfig(config);
				dispatch(saveConfig(config));
			})
			.finally(() => setLoading(false));
	}, [dispatch]);

	return { loading, config };
};
