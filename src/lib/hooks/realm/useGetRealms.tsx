import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppDispatch,
	RootState,
} from '../../configuration/store-configuration';
import { fetchRealms } from '../../redux/reducers/app';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const useGetRealms = () => {
	const realms = useSelector((state: RootState) => state.app.realms);
	const loading = useSelector((state: RootState) => state.app.realmLoading);
	const useAppDispatch: () => AppDispatch = useDispatch;
	const dispatch = useAppDispatch();
	const accessToken = useOidcAccessToken().accessToken;

	useEffect(() => {
		if (!realms && !loading) {
			dispatch(fetchRealms(accessToken));
		}
	}, [realms, loading, dispatch, accessToken]);

	return { realms, loading };
};
