import { Popover, Typography } from '@mui/material';
import useGetUser from 'src/lib/hooks/user/useGetUser';

export const UserPopover = ({
	username,
	realm,
	anchorEl,
}: {
	username: string;
	realm: string;
	anchorEl: HTMLElement;
}) => {
	const userAffiche = useGetUser(username, realm)?.user;

	return (
		<Popover
			id="mouse-over-popover"
			sx={{ pointerEvents: 'none' }}
			slotProps={{
				paper: {
					sx: (theme) => ({ padding: theme.spacing(1) }),
				},
			}}
			open={true}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			disableRestoreFocus
		>
			<Typography>
				{userAffiche?.lastName} {userAffiche?.firstName}
			</Typography>
		</Popover>
	);
};
