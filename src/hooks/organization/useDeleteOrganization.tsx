import { useEffect, useState } from 'react';

export const useDeleteOrganization = () => {
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(undefined);
	const [data, setdata] = useState<any>(undefined);
	const execute = (realm: string, OrganizationId: string) =>
		setdata({ realm, OrganizationId });
	useEffect(() => {
		if (data) {
			setloading(true);
			console.log('suppression' + data);
			setloading(false);
		}
	}, [data]);
	return { loading, error, execute };
};
