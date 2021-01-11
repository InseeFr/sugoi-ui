export default interface searchRequestUser {
	identifiant?: string;
	nomCommun?: string;
	description?: string;
	organisationId?: string;
	size?: number;
	start?: number;
	searchCookie?: string;
	typeRecherche?: 'et' | 'ou';
	habilitations?: string[];
	application?: string;
}
