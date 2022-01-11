import useUpdateRealm from 'src/lib/hooks/realm/useUpdateRealm';
import { Realm } from 'src/lib/model/api/realm';
import AsyncEditor from 'src/components/shared/jsonEditor';
import PopButton from 'src/components/shared/popButton/popButton';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
interface Props {
	realm: Realm;
	disabled: boolean;
}

export const UpdateRealm = ({ realm, disabled }: Props) => {
	const { execute } = useUpdateRealm();
	const [realmUpdated, setRealmUpdated] = useState(realm);
	const [open, _setOpen] = useState(false);
	const handleChange = (e: any) => {
		setRealmUpdated(e);
	};

	useEffect(() => {
		setRealmUpdated(realm);
	}, [realm]);

	const actions = (handleClose: any) => {
		return (
			<>
				<Button
					color="primary"
					variant="contained"
					onClick={() =>
						execute(realm.name, realmUpdated).then(() =>
							handleClose(),
						)
					}
				>
					Modifier
				</Button>
				<Button
					color="secondary"
					variant="contained"
					onClick={() => setRealmUpdated(realm)}
				>
					Reset
				</Button>
			</>
		);
	};

	return (
		<>
			<PopButton
				title={'Modifier le realm ' + realm?.name}
				body={
					realmUpdated && (
						<AsyncEditor
							value={realmUpdated}
							onChange={handleChange}
							readOnly={false}
						/>
					)
				}
				actions={actions}
				text="Modifier"
				disabled={disabled}
				variant="contained"
				open={open}
			/>
		</>
	);
};
