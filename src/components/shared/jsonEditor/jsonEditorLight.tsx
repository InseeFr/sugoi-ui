import JsonEditor from './jsonEditor';
import PropTypes from 'prop-types';
import './jsonEditorLight.css';

interface Props {
	json: Object;
	onChange: (o: any) => void;
	readOnly: boolean;
}

export default function JsonEditorLight({ json, onChange, readOnly }: Props) {
	return <JsonEditor json={json} onChange={onChange} readOnly={readOnly} />;
}

JsonEditorLight.defaultProps = {
	json: {},
	onChange: () => {},
	readOnly: false,
};

JsonEditorLight.propTypes = {
	json: PropTypes.object,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
};
