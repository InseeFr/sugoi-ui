import {
	FormControlLabel,
	FormGroup,
	IconButton,
	Popover,
	Switch,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/lib/configuration/store-configuration';
import useLocalStorage from 'src/lib/hooks/technics/useLocalStorage';
import { changeStatusNotifDebug } from 'src/lib/redux/actions/app';

const NotifButton = () => {
	const { t } = useTranslation();

	const dispatch = useDispatch<any>();

	const [enabledStandardNotif, setEnabledStandardNotif] = useState(
		useSelector((store: RootState) => store.app.notifs.enabled_debug),
	);

	const setStandardNotifLocalStorage = useLocalStorage(
		'debug-notif-enabled',
		null,
	)[1];

	const handleChangeStandardNotif = (
		_event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setStandardNotifLocalStorage(!enabledStandardNotif);
		dispatch(changeStatusNotifDebug(!enabledStandardNotif));
		setEnabledStandardNotif(!enabledStandardNotif);
	};

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	return (
		<>
			<IconButton
				color="inherit"
				size="medium"
				aria-label={t('commons.header.buttons.notif')}
				title={t('commons.header.buttons.notif')}
				onClick={handleClick}
			>
				<NotificationsIcon />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={true}
								name="discret-notification"
								color="secondary"
								disabled
							/>
						}
						label="Notifications discrètes"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={enabledStandardNotif}
								onChange={
									handleChangeStandardNotif
								}
								name="enable-standard-notif"
								color="primary"
							/>
						}
						label="Notifications mode debug"
					/>
				</FormGroup>
			</Popover>
		</>
	);
};

export default NotifButton;
