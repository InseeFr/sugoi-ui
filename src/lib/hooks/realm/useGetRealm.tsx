import { useGetRealms } from './useGetRealms';

export const useGetRealm = (id?: string) => {
	const { realms, loading } = useGetRealms();

	return { realm: realms?.find((r) => r.name == id), loading };
};
