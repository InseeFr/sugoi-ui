import useUpdateRealm from 'src/hooks/realm/useUpdateRealm';
import { Realm } from 'src/model/api/realm';
import AsyncEditor from '../commons/jsonEditor';
import PopButton from 'src/components/commons/popButton/popButton';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
interface Props {
	realm: Realm;
	disabled: boolean;
}

export const UpdateRealm = ({ realm, disabled }: Props) => {
	const { execute, loading, result, error } = useUpdateRealm();
	const [realmUpdated, setRealmUpdated] = useState(realm);

	const handleChange = (e: any) => {
		setRealmUpdated(e);
	};

	useEffect(() => {
		setRealmUpdated(realm);
	}, [realm]);

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
				actions={
					<>
						<Button
							color="primary"
							variant="contained"
							onClick={() =>
								execute(
									realm.name,
									realmUpdated,
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
				}
				text="Modifier"
				disabled={disabled}
				variant="contained"
			/>
		</>
	);
};
