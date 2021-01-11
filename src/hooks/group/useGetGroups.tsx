import { useEffect, useState } from 'react';

export const useGetGroups = (realm: string) => {
	const [groups, setGroups] = useState<string[]>([]);
	useEffect(() => {
		setGroups(['toto', 'tata']);
	}, []);
	return { groups };
};
