import { useEffect, useState } from 'react';
import Organization from '../../model/api/organization';

interface execute {
	realm: string;
	organization: Organization;
}

const useUpdateOrganization = () => {
	const [updatedOrganization, setOrganizationUpdated] = useState<
		Organization | undefined
	>(undefined);
	const [error, setError] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const [data, setdata] = useState<execute | undefined>(undefined);

	const execute = (realm: string, organization: Organization) =>
		setdata({ realm, organization });

	useEffect(() => {
		if (data) {
			console.log(data);
			// updateOrganizationByIdAndDomain(executed.realm, executed.Organization)
			// 	.then((r: any) => {
			// 		setResult(r);
			// 	})
			// 	.catch((err) => {
			// 		setError(err);
			// 	})
			// 	.finally(() => setLoading(false));
		}
	}, [data]);

	return { execute, loading, error };
};

export default useUpdateOrganization;
