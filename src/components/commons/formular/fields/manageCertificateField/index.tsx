import { useParams } from 'react-router-dom';
import { getCertificate } from '../../../../../api';
import useDeleteCertificate from '../../../../../hooks/user/useDeleteCertificate';
import useGetCertificate from '../../../../../hooks/user/useGetCertificate';
import useGetUser from '../../../../../hooks/user/useGetUser';
import useUploadCertificates from '../../../../../hooks/user/useUploadCertificates';
import { download } from '../../../../../utils/downloadFile';
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
	const { realm, userStorage, id } = useParams<any>();

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
		let formData = new FormData();
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
