import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	Divider,
	Grid,
	Tooltip,
	Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForms } from 'src/lib/hooks/technics/useForms';
import { Field } from 'src/lib/model/field';
import ExpandButton from '../expandButton/expand-button';
import TextFieldInfo from '../formular/fields/textFieldInfo';
import GenerateFields from '../formular/fields/utils';
interface props {
	realm: string;
	userStorage?: string;
	handleClickAdd: () => void;
	onSubmit: any;
	formFields: Field[];
}

const CustomToolBar = ({ handleClick }: any) => {
	const { t } = useTranslation();
	return (
		<Tooltip title={'Ajouter'}>
			<Box m={0.5} p={0.5}>
				<Button
					disableElevation
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					aria-label="create user"
					onClick={handleClick}
				>
					{t('commons.search_result.buttons.add')}
				</Button>
			</Box>
		</Tooltip>
	);
};
const SearchFormular = ({
	realm,
	userStorage,
	handleClickAdd,
	onSubmit,
	formFields,
}: props) => {
	const [expand, setExpand] = useState(true);
	const { formValues, handleChange, handleReset } = useForms({});
	const { t } = useTranslation();

	const submit = (e: any) => {
		e.preventDefault();
		onSubmit({ ...formValues });
	};

	return (
		<>
			<Grid
				container
				direction="column"
				alignContent="flex-end"
				spacing={2}
			>
				<Grid item xs={6}>
					<CustomToolBar
						handleClick={handleClickAdd}
					></CustomToolBar>
				</Grid>
			</Grid>
			<form onSubmit={submit}>
				<Card>
					<CardHeader title="Rechercher:" />
					<Divider />
					<CardContent>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12}>
								<TextFieldInfo
									name="realm"
									value={realm}
									modifiable={false}
									helpText={t(
										'commons.search_forms.selected_realm',
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextFieldInfo
									name="UserStorage"
									value={
										userStorage
											? userStorage
											: 'all'
									}
									modifiable={false}
									helpText={t(
										'commons.search_forms.selected_userStorage',
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Collapse in={expand}>
									<Grid
										container
										direction="row"
										spacing={2}
									>
										{GenerateFields(
											formValues,
											handleChange,
											formFields,
										).map(
											(
												field,
												i,
											) => {
												return (
													<Grid
														item
														xs={
															12
														}
														md={
															6
														}
														key={
															'field' +
															i
														}
													>
														{
															field
														}
													</Grid>
												);
											},
										)}
									</Grid>
								</Collapse>
							</Grid>
						</Grid>
					</CardContent>
					<CardActions>
						<Grid
							container
							direction="row"
							justifyContent="flex-end"
							spacing={3}
						>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									type="submit"
								>
									{t(
										'commons.search_forms.validate',
									)}
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="secondary"
									onClick={() =>
										handleReset()
									}
								>
									{t(
										'commons.search_forms.reset',
									)}
								</Button>
							</Grid>
							<Grid item>
								<ExpandButton
									expand={expand}
									setExpand={setExpand}
								/>
							</Grid>
						</Grid>
					</CardActions>
				</Card>
			</form>
		</>
	);
};

export default SearchFormular;
