import {
	Divider,
	Grid,
	Paper,
	IconButton,
	Collapse,
	useTheme,
} from '@mui/material';
import { useState } from 'react';
import TitlePanel from './titlePanel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PopIcon from '../popIcon/popIcon';

type Props = {
	title: string;
	collapsible?: boolean;
	children: React.ReactNode;
	description?: string;
	elevation?: number;
	collapse?: boolean;
};

const Panel = ({
	title,
	collapsible,
	description,
	elevation,
	collapse,
	children,
}: Props) => {
	const theme = useTheme();
	const [expand, setExpand] = useState(collapse);

	return (
		<Paper
			sx={{
				padding: theme.spacing(2),
				textAlign: 'center',
				color: theme.palette.text.secondary,
			}}
			elevation={elevation}
		>
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
					sx={{
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
							size="large"
						>
							{expand ? (
								<ExpandLessIcon />
							) : (
								<ExpandMoreIcon />
							)}
						</IconButton>
					) : null}
				</Grid>
				<Grid item xs={12} sx={{ padding: '9px' }}>
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
