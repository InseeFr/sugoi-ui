import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../configuration/store-configuration';
import { removeSnackbar } from './../../redux/actions/notif';
import TextNotification from './textNotification';

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

	useEffect(() => {
		notifications.forEach(
			({
				key,
				subject,
				options = {},
				debug = false,
				dismissed = false,
			}: any) => {
				if (appNotifConfig.enabled_debug || !debug) {
					if (dismissed) {
						// dismiss snackbar using notistack
						closeSnackbar(key);
						return;
					}

					// do nothing if snackbar is already displayed
					if (displayed.includes(key)) return;

					// display snackbar using notistack
					enqueueSnackbar(
						<TextNotification subject={subject} />,
						{
							key,
							...options,
							onClose: (event, reason, myKey) => {
								if (options.onClose) {
									options.onClose(
										event,
										reason,
										myKey,
									);
								}
							},
							onExited: (event, myKey) => {
								// remove this snackbar from redux store
								dispatch(removeSnackbar(myKey));
								removeDisplayed(myKey);
							},
						},
					);
					storeDisplayed(key);
				} else {
					storeDisplayed(key);
					dispatch(removeSnackbar(key));
					removeDisplayed(key);
				}
			},
		);
	}, [
		notifications,
		closeSnackbar,
		enqueueSnackbar,
		dispatch,
		appNotifConfig.enabled_debug,
	]);

	return null;
};

export default Notifier;
