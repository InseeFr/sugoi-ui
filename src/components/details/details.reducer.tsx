import * as utils from './commons/utils';
type State = {
	initialData?: any;
	data?: any;
};

type Action =
	| {
			type: 'SetElementToAddress';
			payload: { name: any; value: any };
	  }
	| { type: 'Reset' }
	| { type: 'UpdateData'; payload: any };

function reducer(state: State, action: Action): State {
	console.log(state, action);
	switch (action.type) {
		case 'SetElementToAddress':
			let newdata = utils.setElementToAddress(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { data: { ...state.data, ...newdata } };
		case 'Reset':
			return { data: { ...state.initialData } };
		case 'UpdateData':
			return { data: action.payload, initialData: action.payload };
		default:
			return state;
	}
}

export default reducer;
