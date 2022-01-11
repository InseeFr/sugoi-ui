import User from './user';

export interface Group {
	name: string;
	description: string;
	users: User[];
}
