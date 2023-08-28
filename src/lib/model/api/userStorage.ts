export interface UserStorage {
	name: string;
	userSource: string;
	organizationSource: string;
	addressSource: string;
	properties: UsProperties;
	readerType: string;
	writerType: string;
}

export interface UsProperties {
	group_filter_pattern: string[];
	group_source_pattern: string[];
}
