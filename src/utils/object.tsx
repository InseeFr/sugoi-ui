//Remove value like username='' or username=[] or username={} from object
export const cleanObjectEntries = (object: any): any => {
	return JSON.parse(JSON.stringify(object), (key, value) => {
		if (value === null || value === '' || value === [] || value === {})
			return undefined;
		return value;
	});
};
