export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const enqueueSnackbar = (notification: any) => {
	const key = notification.options && notification.options.key;

	return {
		type: ENQUEUE_SNACKBAR,
		notification: {
			...notification,
			key: key || new Date().getTime() + Math.random(),
		},
	};
};

export const closeSnackbar = (key: any) => ({
	type: CLOSE_SNACKBAR,
	dismissAll: !key, // dismiss all if no key has been defined
	key,
});

export const removeSnackbar = (key: any) => ({
	type: REMOVE_SNACKBAR,
	key,
});
