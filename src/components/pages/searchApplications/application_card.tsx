import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Divider,
	Typography,
	Button,
} from '@mui/material';
import Application from 'src/lib/model/api/application';
import Title from 'src/components/shared/title/title';
import CreateIcon from '@mui/icons-material/Create';
import { useTranslation } from 'react-i18next';

const ApplicationCard = ({
	application,
	handleClick,
}: {
	application: Application;
	handleClick: any;
}) => {
	const { t } = useTranslation();

	return (
		<Card
			variant="outlined"
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<CardContent>
				<Title title={application.name} variant="h6" />
				<Typography>
					{application.attributes?.description}
				</Typography>
			</CardContent>
			<div style={{ flexGrow: 1 }} />
			<Divider />
			<CardActions>
				<Grid
					container
					direction="row"
					justifyContent="flex-end"
					alignItems="center"
				>
					<Button
						variant="outlined"
						color="primary"
						startIcon={<CreateIcon />}
						onClick={() =>
							handleClick(application.name)
						}
					>
						{t('search_application.app_card_button')}
					</Button>
				</Grid>
			</CardActions>
		</Card>
	);
};

export default ApplicationCard;
