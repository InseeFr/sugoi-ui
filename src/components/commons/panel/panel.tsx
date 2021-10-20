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
import PopIcon from '../popIcon/popIcon';

type Props = {
	title: string;
	collapsible?: boolean;
	children: React.ReactNode;
	description?: string;
	elevation?: number;
	collapse?: boolean;
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
const Panel = ({
	title,
	children,
	collapsible,
	description,
	elevation,
	collapse,
}: Props) => {
	const classes = useStyles();
	const [expand, setExpand] = useState(collapse);

	return (
		<Paper className={classes.paper} elevation={elevation}>
			<Grid
				container
				direction="column"
				justifyContent="center"
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
					{description ? (
						<PopIcon helpText={description} />
					) : null}
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
				<Grid item xs={12} style={{ padding: '9px' }}>
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

Panel.defaultProps = {
	collapse: false,
	collapsible: false,
};

export default Panel;
