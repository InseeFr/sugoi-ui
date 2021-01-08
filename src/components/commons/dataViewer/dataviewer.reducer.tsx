import * as utils from '../utils';
import * as Action from './actions';

type State = {
	initialData?: any;
	data?: any;
};

function reducer(state: State, action: Action.ActionType): State {
	let newdata;
	console.log(state);
	switch (action.type) {
		case Action.SetElementToAddress:
			newdata = utils.setElementToAddress(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.SetElementToRoot:
			newdata = utils.setElementToRoot(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.SetElementToAttributes:
			newdata = utils.setElementToAttributes(
				state.data,
				action.payload.name,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.AddElementToHabilitations:
			newdata = utils.addElementToHabilitation(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.DeleteElementInHabilitations:
			newdata = utils.DeleteElementInHabilitation(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...newdata } };
		case Action.AddElementToGroups:
			newdata = utils.addElementToGroups(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.DeleteElementInGroups:
			newdata = utils.DeleteElementInGroups(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...newdata } };
		case Action.AddElementToRole:
			newdata = utils.addElementToRoles(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.DeleteElementInRole:
			newdata = utils.DeleteElementInRoles(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...newdata } };
		case Action.AddElementToPropriete:
			newdata = utils.addElementToPropriete(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...state.data, ...newdata } };
		case Action.DeleteElementInPropriete:
			newdata = utils.DeleteElementInPropriete(
				state.data,
				action.payload.value,
			);
			return { ...state, data: { ...newdata } };
		case Action.Reset:
			return { ...state, data: { ...state.initialData } };
		case Action.UpdateData:
			return {
				...state,
				data: action.payload,
				initialData: action.payload,
			};
		default:
			return state;
	}
}

export default reducer;
