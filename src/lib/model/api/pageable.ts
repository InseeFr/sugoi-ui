export interface Pageable {
	results: any[];
	totalElements: number;
	nextStart: number;
	hasMoreResult: boolean;
	pageSize: number;
}
