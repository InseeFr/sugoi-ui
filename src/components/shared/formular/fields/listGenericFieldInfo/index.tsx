import {
	Box,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import PopButton from '../../../popButton/popButton';
import PopIcon from '../../../popIcon/popIcon';
import ListFieldInfoPopup from './listFieldInfo';

interface props {
	value: any;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	handleChange: any;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
}

export const ListFieldButton = ({
	name,
	helpTextTitle,
	helpText,
	textButton,
	value,
	handleChange,
	modifiable,
}: props) => {
	return (
		<>
			<Grid container direction="row" justifyContent="center">
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography component="div" variant="body1">
						{name}
					</Typography>
					<PopIcon
						helpTextTitle={helpTextTitle}
						helpText={helpText}
					/>
				</Box>
				<PopButton
					text={textButton || ''}
					title="Gestion habilitations"
					body={
						<ListFieldInfoPopup
							name={name}
							helpText={helpText}
							helpTextTitle={helpTextTitle}
							modifiable={modifiable}
							value={value}
							handleChange={handleChange}
						/>
					}
					color="primary"
					variant="contained"
				/>
			</Grid>
			<List dense={true}>
				{value.map((val: string, i: any) => (
					<ListItem disableGutters key={i}>
						<ListItemText primary={val} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default ListFieldButton;
