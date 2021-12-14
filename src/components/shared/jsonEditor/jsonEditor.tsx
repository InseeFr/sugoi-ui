import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

type Mode = 'tree' | 'view' | 'form' | 'code' | 'text';

interface Props {
	json: Object;
	onChange: (o: any) => void;
	readOnly: boolean;
}

export default function Editor({ json, onChange, readOnly }: Props) {
	const jsonEditorRef = useRef<any>(null);

	useEffect(() => {
		if (jsonEditorRef.current !== null) {
			jsonEditorRef.current.set(json);
		}
	}, [json]);

	const setRef = (instance: any) => {
		if (instance) {
			jsonEditorRef.current = instance.jsonEditor;
		} else {
			jsonEditorRef.current = null;
		}
	};

	const getAllowedModes: () => Mode[] = () => {
		if (readOnly) {
			return ['view'];
		}
		return ['code', 'tree', 'view', 'form'];
	};

	return (
		<JsonEditor
			ref={setRef}
			value={json}
			onChange={onChange}
			schema={null}
			mode={getAllowedModes()[0]}
			allowedModes={getAllowedModes()}
			htmlElementProps={{}}
		/>
	);
}

Editor.defaultProps = {
	json: {},
	onChange: () => {},
	readOnly: false,
};

Editor.propTypes = {
	json: PropTypes.object,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
};
