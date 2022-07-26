import { useParams } from 'react-router-dom';
import {
	useUploadCertificates,
	useGetUser,
	useGetCertificate,
	useDeleteCertificate,
} from 'src/lib/hooks/api-hooks';
import { download } from 'src/lib/utils/downloadFile';
import UploadFile from '../uploadFileInfo';
import get from 'lodash.get';

interface Props {
	value: any;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	modifiable: boolean;
	dropZoneText?: string;
	absentValueText?: string;
	presentValueText?: string;
}

const ManageCertificate = ({
	name,
	modifiable,
	helpText,
	helpTextTitle,
	value,
	dropZoneText,
	absentValueText,
	presentValueText,
}: Props) => {
	const { realm, userStorage, id } = useParams() as {
		realm: string;
		userStorage?: string;
		id: string;
	};

	const {
		user,
		execute: getUser,
		loading: loadingUser,
	} = useGetUser(id, realm, userStorage);

	const { execute: uploadCertficate, loading: loadingUpdate } =
		useUploadCertificates();

	const { loading: loadingDelete, execute: executeDelete } =
		useDeleteCertificate();

	const { execute: executeGet } = useGetCertificate();

	const handleDelete = () => {
		executeDelete(id, realm, userStorage).finally(() =>
			getUser(id, realm, userStorage),
		);
	};

	const handleSave = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		uploadCertficate(id, realm, formData, userStorage).finally(() =>
			getUser(id, realm, userStorage),
		);
	};

	const handleGet = () => {
		executeGet(id, realm, userStorage).then((r) => {
			download(
				r,
				'cert-user-' + id + '.cer',
				'application/x-x509-ca-cert',
			);
		});
	};

	return (
		<UploadFile
			title={name}
			value={get(user, value, undefined)}
			acceptedFiles={['.pem', '.der', '.cer']}
			dropZoneText={dropZoneText}
			helpText={helpText}
			helpTextTitle={helpTextTitle}
			valueAbsentText={presentValueText}
			valuePresentText={absentValueText}
			deleteAction={handleDelete}
			getAction={handleGet}
			saveAction={handleSave}
			loading={loadingDelete || loadingUpdate || loadingUser}
			modifiable={modifiable}
		/>
	);
};

export default ManageCertificate;
