import {
	ENQUEUE_SNACKBAR,
	CLOSE_SNACKBAR,
	REMOVE_SNACKBAR,
} from './../actions/notif';

const defaultState = {
	notifications: [],
};

const NotifsReducer = (state = defaultState, action: any) => {
	switch (action.type) {
		case ENQUEUE_SNACKBAR:
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						key: action.key,
						...action.notification,
					},
				],
			};

		case CLOSE_SNACKBAR:
			return {
				...state,
				notifications: state.notifications.map(
					(notification: any) =>
						action.dismissAll ||
						notification.key === action.key
							? { ...notification, dismissed: true }
							: { ...notification },
				),
			};

		case REMOVE_SNACKBAR:
			return {
				...state,
				notifications: state.notifications.filter(
					(notification: any) =>
						notification.key !== action.key,
				),
			};

		default:
			return state;
	}
};

export default NotifsReducer;
