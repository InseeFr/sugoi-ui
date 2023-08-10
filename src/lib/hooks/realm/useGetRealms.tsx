import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AppDispatch,
	RootState,
} from '../../configuration/store-configuration';
import { fetchRealms } from '../../redux/reducers/app';

export const useGetRealms = () => {
	const realms = useSelector((state: RootState) => state.app.realms);
	const loading = useSelector((state: RootState) => state.app.realmLoading);
	const useAppDispatch: () => AppDispatch = useDispatch;
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!realms && !loading) {
			dispatch(fetchRealms());
		}
	}, [realms, loading, dispatch]);

	return { realms, loading };
};
