export const download = (data: any, name: string, type: string) => {
	const blob =
		data instanceof Blob
			? data
			: new Blob([data], {
					type: type,
			  });
	const url = window.URL.createObjectURL(blob);
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
