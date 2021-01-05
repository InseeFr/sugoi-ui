import * as utils from '../utils';

type State = {
	initialData?: any;
	data?: any;
};

type Action =
	| {
			type: 'SetElementToAddress';
			payload: { name: any; value: any };
	  }
	| {
			type: 'SetElementToRoot';
			payload: { name: any; value: any };
	  }
	| {
			type: 'SetElementToAttributes';
			payload: { name: any; value: any };
	  }
	| { type: 'AddElementToHabilitations'; payload: { value: any } }
	| { type: 'AddElementToGroupes'; payload: { value: any } }
	| { type: 'AddElementToPropriete'; payload: { value: any } }
	| { type: 'AddElementToRole'; payload: { value: any } }
	| { type: 'DeleteElementInHabilitations'; payload: { value: any } }
	| { type: 'DeleteElementInGroupes'; payload: { value: any } }
	| { type: 'DeleteElementInPropriete'; payload: { value: any } }
	| { type: 'DeleteElementInRole'; payload: { value: any } }
	| { type: 'Reset' }
	| { type: 'UpdateData'; payload: any };

function reducer(state: State, action: Action): State {
	let newdata;
	console.log(action);
	switch (action.type) {
		case 'SetElementToAddress':
			newdata = utils.setElementToAddress(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { data: { ...state.data, ...newdata } };
		case 'SetElementToRoot':
			newdata = utils.setElementToRoot(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { data: { ...state.data, ...newdata } };
		case 'SetElementToAttributes':
			newdata = utils.setElementToAttributes(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { data: { ...state.data, ...newdata } };
		case 'AddElementToHabilitations':
			newdata = utils.addElementToHabilitation(
				state.data,
				action.payload.value,
			);
			return { data: { ...state.data, ...newdata } };
		case 'DeleteElementInHabilitations':
			newdata = utils.DeleteElementToHabilitation(
				state.data,
				action.payload.value,
			);
			return { data: { ...newdata } };
		case 'Reset':
			return { data: { ...state.initialData } };
		case 'UpdateData':
			return { data: action.payload, initialData: action.payload };
		default:
			return state;
	}
}

export default reducer;
