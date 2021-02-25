import { JsonEditor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import './jsonEditor.css';

export default function Editor({ json, onChange, readOnly }) {
	const jsonEditorRef = useRef(null);

	useEffect(() => {
		if (jsonEditorRef.current !== null) {
			jsonEditorRef.current.set(json);
		}
	}, [json]);

	const setRef = (instance) => {
		if (instance) {
			jsonEditorRef.current = instance.jsonEditor;
		} else {
			jsonEditorRef.current = null;
		}
	};

	return (
		<JsonEditor
			ref={setRef}
			value={json}
			onChange={onChange}
			onEditable={() => !readOnly}
			mode="code"
			allowedModes={['code', 'tree']}
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
