export interface panel {
	title: string;
	description: string;
	collapsible: boolean;
	type: string;
	fields: field[];
}
export interface field {
	name: string;
	helpText: string;
	helpTextTitle: string;
	path: string;
	type: 'string' | 'list' | 'habilitation' | 'role';
	modifiable: boolean;
	deleteTitle: string;
	addTitle: string;
	textButton: string;
}
