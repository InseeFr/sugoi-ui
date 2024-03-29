import { Popover, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import useGetUser from 'src/lib/hooks/user/useGetUser';

const useStyles = makeStyles((theme: any) =>
	createStyles({
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			padding: theme.spacing(1),
		},
		email: {
			width: 500,
		},
	}),
);

export const UserPopover = ({
	username,
	realm,
	anchorEl,
}: {
	username: string;
	realm: string;
	anchorEl: HTMLElement;
}) => {
	const classes = useStyles();
	const userAffiche = useGetUser(username, realm)?.user;

	return (
		<Popover
			id="mouse-over-popover"
			className={classes.popover}
			classes={{
				paper: classes.paper,
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
