export interface Field {
	name: string;
	helpTextTitle?: string;
	helpText?: string;
	path: string;
	type: any;
	modifiable: boolean;
	tag: any;
	options: OptionsFields | any;
}

interface OptionsFields {
	deleteTitle?: string;
	addTitle?: string;
	textButton?: string;
	attribute_key?: string;
	dropzoneText?: string;
}
