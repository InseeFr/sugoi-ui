import { useTheme } from '@material-ui/core';
import React, { Suspense, lazy } from 'react';
import { Loader } from './../loader/loader';

const JSONEditorLight = lazy(() => import('./jsonEditorLight'));
const JSONEditorDark = lazy(() => import('./jsonEditorDark'));

interface Props {
	onChange: (o: object) => void;
	value: any;
	readOnly: boolean;
}

const AsyncEditor = ({ onChange, value, readOnly }: Props) => {
	const theme = useTheme();

	console.log(theme);

	return (
		<Suspense fallback={<Loader />}>
			{theme.palette.type === 'light' && (
				<JSONEditorLight
					json={value}
					onChange={onChange}
					readOnly={readOnly}
				/>
			)}
			{theme.palette.type === 'dark' && (
				<JSONEditorDark
					json={value}
					onChange={onChange}
					readOnly={readOnly}
				/>
			)}
		</Suspense>
	);
};

export default AsyncEditor;
