export default interface searchRequestOrganization {
	identifiant?: string;
	application?: string;
	role?: string;
	property?: string;
	mail?: string;
	typeRecherche?: 'AND' | 'OR';
}
