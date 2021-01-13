import { useEffect, useState } from 'react';
import { deleteOrganization } from '../../api';

export const useDeleteOrganization = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(undefined);
	const [data, setdata] = useState<any>(undefined);

	const execute = (realm: string, id: string) => setdata({ realm, id });

	useEffect(() => {
		if (data) {
			setloading(true);
			deleteOrganization(data.realm, data.id)
				.then()
				.catch((err) => seterror(err))
				.finally(() => {
					setloading(false);
					setdata(undefined);
				});
		}
	}, [data]);
	return { loading, error, execute };
};
