import get from 'lodash.get';
import { useParams } from 'react-router-dom';
import useDeleteGpgKey from '../../../../../hooks/organization/useDeleteGpgKey';
import useGetGpgKey from '../../../../../hooks/organization/useGetGpgKey';
import useGetOrganization from '../../../../../hooks/organization/useGetOrganization';
import useUploadGpgKey from '../../../../../hooks/organization/useUploadCertificates';
import { download } from '../../../../../utils/downloadFile';
import UploadFile from '../uploadFileInfo';

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

const ManageGpgKey = ({
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

	const { execute: executeUpdate, loading: loadingUpdate } =
		useUploadGpgKey();

	const { execute: executeDelete, loading: loadingDelete } =
		useDeleteGpgKey();

	const { execute: executeGet } = useGetGpgKey();

	const {
		organization,
		execute: getOrganization,
		loading: loadingOrganization,
	} = useGetOrganization(id, realm, userStorage);

	const handleDelete = () => {
		executeDelete(id, realm, userStorage).finally(() =>
			getOrganization(id, realm, userStorage),
		);
	};

	const handleSave = async (file: File) => {
		let formData = new FormData();
		formData.append('file', file);
		executeUpdate(id, realm, formData, userStorage).finally(() =>
			getOrganization(id, realm, userStorage),
		);
	};

	const handleGet = () => {
		executeGet(id, realm, userStorage).then((r) => {
			download(
				r,
				'clé-chiffrement-' + id + '.gpg',
				'application/octet-stream',
			);
		});
	};

	return (
		<UploadFile
			title={name}
			value={get(organization, value, undefined)}
			acceptedFiles={['.pem', '.der', '.cer']}
			dropZoneText={dropZoneText}
			helpText={helpText}
			helpTextTitle={helpTextTitle}
			valueAbsentText={presentValueText}
			valuePresentText={absentValueText}
			deleteAction={handleDelete}
			getAction={handleGet}
			saveAction={handleSave}
			modifiable={modifiable}
			loading={
				!loadingDelete && !loadingUpdate && !loadingOrganization
			}
		/>
	);
};

export default ManageGpgKey;
