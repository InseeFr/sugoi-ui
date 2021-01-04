import {
	createStyles,
	Divider,
	Grid,
	makeStyles,
	Paper,
	Theme,
	IconButton,
	Collapse,
} from '@material-ui/core';
import React, { useState } from 'react';
import TitlePanel from './titlePanel';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type props = {
	title: string;
	collapsible?: boolean;
	children: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	}),
);
const Panel = ({ title, children, collapsible }: props) => {
	const classes = useStyles();
	const [expand, setExpand] = useState(false);

	return (
		<Paper className={classes.paper}>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
				spacing={2}
			>
				<Grid
					item
					xs={12}
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<TitlePanel title={title} />
					{collapsible ? (
						<IconButton
							color="primary"
							aria-label="expand paper"
							component="span"
							onClick={() => setExpand(!expand)}
						>
							{expand ? (
								<ExpandLessIcon />
							) : (
								<ExpandMoreIcon />
							)}
						</IconButton>
					) : null}
				</Grid>
				<Grid item xs={12}>
					<Divider />
				</Grid>
				<Grid item xs={12}>
					{collapsible ? (
						<Collapse in={expand}>{children}</Collapse>
					) : (
						children
					)}
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Panel;
