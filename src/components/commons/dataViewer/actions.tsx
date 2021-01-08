export const SetElementToAddress = 'SetElementToAddress';
export const SetElementToRoot = 'SetElementToRoot';
export const SetElementToAttributes = 'SetElementToAttributes';
export const AddElementToHabilitations = 'AddElementToHabilitations';
export const AddElementToGroups = 'AddElementToGroups';
export const AddElementToPropriete = 'AddElementToPropriete';
export const AddElementToRole = 'AddElementToRole';
export const DeleteElementInGroups = 'DeleteElementInGroups';
export const DeleteElementInHabilitations = 'DeleteElementInHabilitations';
export const DeleteElementInRole = 'DeleteElementInRole';
export const DeleteElementInPropriete = 'DeleteElementInPropriete';
export const Reset = 'Reset';
export const UpdateData = 'UpdateData';

export type ActionType =
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
	| { type: 'AddElementToGroups'; payload: { value: any } }
	| { type: 'AddElementToPropriete'; payload: { value: any } }
	| { type: 'AddElementToRole'; payload: { value: any } }
	| { type: 'DeleteElementInHabilitations'; payload: { value: any } }
	| { type: 'DeleteElementInGroups'; payload: { value: any } }
	| { type: 'DeleteElementInPropriete'; payload: { value: any } }
	| { type: 'DeleteElementInRole'; payload: { value: any } }
	| { type: 'Reset' }
	| { type: 'UpdateData'; payload: any };
