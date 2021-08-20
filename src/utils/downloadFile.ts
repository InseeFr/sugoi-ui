export const download = (data: any, name: string, type: string) => {
	var blob = new Blob([data], {
		type: type,
	});
	var url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', name);

	// Append to html link element page
	document.body.appendChild(link);

	// Start download
	link.click();

	// Clean up and remove the link
	link?.parentNode?.removeChild(link);
};
