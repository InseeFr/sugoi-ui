import { useSelector } from 'react-redux';
import { RootState } from '../../configuration/store-configuration';

export const useGetCurrentRealm = () => {
	return useSelector((state: RootState) => state.app.realmUsState);
};

export default useGetCurrentRealm;
