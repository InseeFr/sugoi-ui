import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Loader } from 'src/components/shared/loader/loader';
import Title from 'src/components/shared/title/title';
import useRealmConfig from 'src/lib/hooks/realm/useRealmConfig';
import useGetUser from 'src/lib/hooks/user/useGetUser';
import DetailUserContent from './detail_user_content';
import User from 'src/lib/model/api/user';
import { Typography } from '@mui/material';
import { Field } from 'src/lib/model/field';

const DetailUserContentOrNotFound = ({
	user,
	execute,
	realm,
	userStorage,
	userConfig,
	t,
}: {
	user?: User;
	execute: (
		id: string,
		realm: string,
		userStorage?: string,
	) => Promise<void>;
	realm: string;
	userStorage?: string;
	userConfig: Field[];
	t: any;
}) => {
	return (
		<>
			{user ? (
				<DetailUserContent
					user={user}
					execute={execute}
					realm={realm}
					userStorage={userStorage}
					userConfig={userConfig}
				/>
			) : (
				<Typography variant="h6" gutterBottom>
					{t('detail_organization.organization_not_found')}
				</Typography>
			)}
		</>
	);
};

const DetailUser = () => {
	const { realm, id, userStorage } = useParams() as {
		realm: string;
		id: string;
		userStorage?: string;
	};

	const { t } = useTranslation();
	const { userConfig } = useRealmConfig(realm);

	const { loading, user, execute } = useGetUser(id, realm, userStorage);

	document.title =
		t('detail_user.page_title_1') + id + t('detail_user.page_title_2');

	return (
		<>
			<Title title={t('detail_user.title') + id} />
			{loading ? (
				<Loader />
			) : (
				<DetailUserContentOrNotFound
					user={user}
					execute={execute}
					realm={realm}
					userStorage={userStorage}
					userConfig={userConfig}
					t={t}
				/>
			)}
		</>
	);
};

export default DetailUser;
