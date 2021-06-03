import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeSnackbar } from './../../redux/actions/notif';
import { useEffect } from 'react';
import { RootState } from './../../configuration/store-configuration';

let displayed: any[] = [];

const Notifier = () => {
	const dispatch = useDispatch();

	const notifications = useSelector(
		(store: RootState) => (store.notif as any).notifications || [],
	);
	const appNotifConfig = useSelector(
		(store: RootState) => store.app.notifs,
	);

	const storeDisplayed = (id: any) => {
		displayed = [...displayed, id];
	};

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const removeDisplayed = (id: any) => {
		displayed = [...displayed.filter((key) => id !== key)];
	};

	const processNotif = (
		key: any,
		dismissed: any,
		message: any,
		options: any,
	) => {
		if (dismissed) {
			// dismiss snackbar using notistack
			closeSnackbar(key);
			return;
		}

		// do nothing if snackbar is already displayed
		if (displayed.includes(key)) return;

		// display snackbar using notistack
		enqueueSnackbar(message, {
			key,
			...options,
			onClose: (event, reason, myKey) => {
				if (options.onClose) {
					options.onClose(event, reason, myKey);
				}
			},
			onExited: (event, myKey) => {
				// remove this snackbar from redux store
				dispatch(removeSnackbar(myKey));
				removeDisplayed(myKey);
			},
		});
		storeDisplayed(key);
	};

	useEffect(() => {
		notifications.forEach(
			({
				key,
				message,
				options = {},
				dismissed = false,
				properties = {},
			}: any) => {
				if (appNotifConfig.enabled_debug) {
					processNotif(key, dismissed, message, options);
				} else if (options?.variant === 'error') {
					processNotif(key, dismissed, message, options);
				} else if (
					[
						'delete',
						'DELETE',
						'head',
						'HEAD',
						'post',
						'POST',
						'put',
						'PUT',
						'patch',
						'PATCH',
						'purge',
						'PURGE',
						'link',
						'LINK',
						'unlink',
						'UNLINK',
					].includes(properties.method as string)
				) {
					processNotif(key, dismissed, message, options);
				} else {
					storeDisplayed(key);
					dispatch(removeSnackbar(key));
					removeDisplayed(key);
				}
			},
		);
	}, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

	return null;
};

export default Notifier;
