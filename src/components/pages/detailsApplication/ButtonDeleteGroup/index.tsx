import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteGroup } from 'src/lib/hooks/api-hooks';
import { Group } from 'src/lib/model/api/group';
import ConfirmationPopup from 'src/components/shared/confirmationPopUp';

interface Props {
	group: Group;
	application: string;
	realm: string;
	onClose: () => Promise<void>;
}

export const ButtonDeleteGroup = ({
	group,
	application,
	realm,
	onClose,
}: Props) => {
	const { execute: deleteGroup } = useDeleteGroup();
	const { t } = useTranslation();

	const onSubmit = async () => {
		await deleteGroup(realm, application, group.name);
		onClose();
	};

	return (
		<>
			<ConfirmationPopup
				Icon={
					<IconButton aria-label="Add" size="small">
						<DeleteIcon
							color="primary"
							fontSize="small"
						/>
					</IconButton>
				}
				title={
					t('detail_application.group.popup.title.part1') +
					group.name +
					t('detail_application.group.popup.title.part2')
				}
				body1={t('detail_application.group.popup.body.body1')}
				body2={t('detail_application.group.popup.body.body2')}
				bodyBold={t(
					'detail_application.group.popup.body.bodyBold',
				)}
				validation_text={group?.name}
				handleDelete={() => onSubmit()}
			/>
		</>
	);
};
