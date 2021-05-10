import { useEffect, useState } from 'react';
import { getConfigFile } from '../../configuration/utils';
import { useDispatch, useSelector } from 'react-redux';
import { saveConfig } from './../../redux/actions/app';

// Hook allowing to access to one's property of the configuration.json file
export const useConfig = (property: string) => {
	const [_property, setProperty] = useState<null | string>(null);
	useEffect(() => {
		getConfigFile()
			.then((resp) => setProperty(resp[property]))
			.catch((err) => err);
	}, [property]);
	return _property;
};

// Hook allowing to load all properties in configuration.json
export const useGetConfig = () => {
	const [authConfig, setAuthConfig] = useState<any>(undefined);
	const [allConfig, setAllConfig] = useState<any>(undefined);
	const [loading, setLoading] = useState(true);

	const configStore = useSelector((state: any) => state.app.config);

	const dispatch = useDispatch();

	useEffect(() => {
		if (configStore?.auth) {
			setAuthConfig(configStore.auth);
			setAllConfig(configStore);
			setLoading(false);
		} else {
			getConfigFile().then((config) => {
				setAuthConfig(config.auth);
				setAllConfig(config);
				dispatch(saveConfig(config));
				setLoading(false);
			});
		}
	}, [dispatch]);

	return { authConfig, allConfig, loading };
};
