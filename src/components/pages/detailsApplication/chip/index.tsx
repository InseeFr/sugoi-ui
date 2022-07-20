import { Chip, Grid, Popover, Typography } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import React from 'react';
import { useHistory } from 'react-router-dom';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import useGetUser from 'src/lib/hooks/user/useGetUser';
import User from 'src/lib/model/api/user';
interface Props {
	user: any;
	realm: any;
}

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

export const ChipPerson = ({ user, realm }: Props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const userTemp = useGetUser(user?.username, realm);
	const userAffiche: User | undefined = userTemp?.user;

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const { push } = useHistory();
	return (
		<>
			<Chip
				color="default"
				size="small"
				icon={
					user.username.startsWith('appli_') ? (
						<SettingsApplicationsIcon />
					) : (
						<PermIdentityIcon />
					)
				}
				clickable={
					user.username.startsWith('appli_') ? false : true
				}
				onClick={() =>
					push(
						'/realm/' +
							realm +
							'/users/' +
							user.username,
					)
				}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
				label={user.username}
			/>
			<Popover
				id="mouse-over-popover"
				className={classes.popover}
				classes={{
					paper: classes.paper,
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<Typography>
					{userAffiche?.lastName} {userAffiche?.firstName}
				</Typography>
			</Popover>
		</>
	);
};

interface ButtonProps {
	realm: any;
	group: any;
}
export const ChipButton = ({ realm, group }: ButtonProps) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Chip
				clickable
				color="primary"
				size="small"
				label={group?.users?.length - 4 + ' de plus...'}
				onClick={handleOpen}
				key={'group_' + group.name}
			/>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={'Utilisateur du groupe ' + group.name}
				body={
					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="stretch"
						spacing={1}
					>
						{group.users.map((user: any, i: any) => (
							<Grid
								item
								key={
									'item-group_' +
									group.name +
									'user_' +
									user +
									'-' +
									i
								}
							>
								<ChipPerson
									key={
										'group_' +
										group.name +
										'user_' +
										user +
										'-' +
										i
									}
									realm={realm}
									user={user}
								/>
							</Grid>
						))}
					</Grid>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};
