import { IconButton } from '@mui/material';
import { Group } from 'src/lib/model/api/group';
import { CloudDownload } from '@mui/icons-material';
import { exportGroupUsers } from 'src/lib/api';
import { download } from 'src/lib/utils/downloadFile';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

export const ButtonExportGroupUsers = ({
	realm,
	application,
	group,
}: {
	realm: string;
	application: string;
	group: Group;
}) => {
	const accessToken = useOidcAccessToken().accessToken;
	const handleExport = () => {
		exportGroupUsers(realm, application, group, accessToken).then((r) =>
			download(
				r,
				group.name + '_export.csv',
				'text/csv;charset=utf-8;',
			),
		);
	};

	return (
		<IconButton aria-label="export" onClick={handleExport}>
			<CloudDownload color="primary" fontSize="small" />
		</IconButton>
	);
};
