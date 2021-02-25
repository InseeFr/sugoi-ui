import React, { Suspense, lazy } from 'react';
import { Loader } from './../loader/loader';

const JSONEditor = lazy(() => import('./jsonEditor'));

const AsyncEditor = (props: any) => (
	<Suspense fallback={<Loader />}>
		<JSONEditor {...props} />
	</Suspense>
);

export default AsyncEditor;
