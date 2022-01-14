export default interface SearchRequestUser {
	identifiant?: string;
	commonName?: string;
	lastName?: string;
	firstName?: string;
	description?: string;
	organisationId?: string;
	mail?: string;
	size?: number;
	start?: number;
	searchCookie?: string;
	typeRecherche?: 'AND' | 'OR';
	habilitation?: string[];
	application?: string;
}
