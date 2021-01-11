export interface field {
	name: string;
	helpText: string;
	helpTextTitle: string;
	path: string;
	type: 'string' | 'list' | 'list-with-button' | 'habilitations' | 'groups';
	modifiable: boolean;
	deleteTitle: string;
	addTitle: string;
	textButton: string;
}
