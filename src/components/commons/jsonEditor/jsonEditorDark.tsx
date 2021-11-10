import JsonEditor from './jsonEditor';
import PropTypes from 'prop-types';
import './jsonEditorDark.css';
type Mode = 'tree' | 'view' | 'form' | 'code' | 'text';

interface Props {
	json: Object;
	onChange: (o: any) => void;
	readOnly: boolean;
}

export default function JsonEditorDark({ json, onChange, readOnly }: Props) {
	return <JsonEditor json={json} onChange={onChange} readOnly={readOnly} />;
}

JsonEditorDark.defaultProps = {
	json: {},
	onChange: () => {},
	readOnly: false,
};

JsonEditorDark.propTypes = {
	json: PropTypes.object,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
};
