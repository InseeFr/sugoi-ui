import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Loader } from 'src/components/shared/loader/loader';
import Title from 'src/components/shared/title/title';
import { useGetOrganization, useRealmConfig } from 'src/lib/hooks/api-hooks';
import DetailOrganizationContent from './detail_organization_content';
import { Typography } from '@mui/material';
import Organization from 'src/lib/model/api/organization';
import { Field } from 'src/lib/model/field';

const DetailOrganizationContentOrNotFound = ({
	organization,
	execute,
	realm,
	userStorage,
	organizationConfig,
	t,
}: {
	organization?: Organization;
	execute: (
		id: string,
		realm: string,
		userStorage?: string,
	) => Promise<void>;
	realm: string;
	userStorage?: string;
	organizationConfig: Field[];
	t: any;
}) => {
	return (
		<>
			{organization ? (
				<DetailOrganizationContent
					organization={organization}
					execute={execute}
					realm={realm}
					userStorage={userStorage}
					organizationConfig={organizationConfig}
				/>
			) : (
				<Typography variant="h6" gutterBottom>
					{t('detail_organization.organization_not_found')}
				</Typography>
			)}
		</>
	);
};

const DetailOrganization = () => {
	const { realm, id, userStorage } = useParams() as {
		realm: string;
		id: string;
		userStorage?: string;
	};
	const { t } = useTranslation();
	const { organizationConfig } = useRealmConfig(realm);

	const { loading, organization, execute } = useGetOrganization(
		id,
		realm,
		userStorage,
	);

	document.title =
		t('detail_organization.page_title_1') +
		id +
		t('detail_organization.page_title_2');

	return (
		<>
			<Title title={t('detail_organization.title') + id} />
			{loading ? (
				<Loader />
			) : (
				<DetailOrganizationContentOrNotFound
					organization={organization}
					execute={execute}
					realm={realm}
					userStorage={userStorage}
					organizationConfig={organizationConfig}
					t={t}
				/>
			)}
		</>
	);
};

export default DetailOrganization;
