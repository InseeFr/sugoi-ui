import { Field } from './field';

export declare interface section {
	title: string;
	description: string;
	collapsible: boolean;
	type: string;
	fields: Field[];
}
