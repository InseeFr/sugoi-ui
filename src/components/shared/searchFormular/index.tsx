import {
	Button,
	Collapse,
	Grid,
	Tooltip,
	Box,
	Paper,
	Typography,
	useTheme,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForms } from 'src/lib/hooks/technics/useForms';
import { Field } from 'src/lib/model/field';
import ExpandButton from '../expandButton/expand-button';
import GenerateFields from '../formular/fields/utils';

interface Props {
	handleClickAdd: () => void;
	onSubmit: any;
	formFields: Field[];
	formFieldsAdvanced: Field[];
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
					startIcon={<Add />}
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
	handleClickAdd,
	onSubmit,
	formFields,
	formFieldsAdvanced,
}: Props) => {
	const [expand, setExpand] = useState(false);
	const { formValues, handleChange, handleReset } = useForms({});
	const {
		formValues: formValuesAdvanced,
		handleChange: handleChangeAdvanced,
		handleReset: handleResetAdvanced,
	} = useForms({});

	const { t } = useTranslation();
	const theme = useTheme();

	const submit = (e: any) => {
		e.preventDefault();
		if (expand) {
			onSubmit({ ...formValuesAdvanced });
		} else {
			onSubmit({ ...formValues });
		}
	};

	const handleExpand = (_expand: boolean) => {
		setExpand(_expand);
		if (_expand) {
			handleReset();
		} else {
			handleResetAdvanced();
		}
	};
	return (
		<Grid
			container
			direction="column"
			alignContent="stretch"
			alignItems="stretch"
			spacing={2}
		>
			<Grid size={12}>
				<Grid
					container
					direction="column"
					alignContent="flex-end"
					spacing={2}
				>
					<Grid size={6}>
						<CustomToolBar
							handleClick={handleClickAdd}
						></CustomToolBar>
					</Grid>
				</Grid>
			</Grid>
			<Grid size={12}>
				<form onSubmit={submit}>
					<Paper elevation={0}>
						<fieldset
							style={{
								padding: '20px',
								borderColor:
									theme.palette.primary
										.main,
								borderStyle: 'solid',
							}}
						>
							<legend>
								<Typography
									variant="caption"
									color="primary"
								>
									Ma recherche
								</Typography>
							</legend>
							<Grid
								container
								direction="column"
								alignContent="stretch"
								alignItems="stretch"
								spacing={2}
							>
								<Grid size={12}>
									<Grid
										container
										direction="row"
										spacing={2}
									>
										<Grid size={12}>
											<Grid
												container
												direction="row"
												spacing={
													2
												}
											>
												{!expand &&
													GenerateFields(
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
																	key={
																		'field' +
																		i
																	}
																	size={{
																		xs: 12,
																		md: 12,
																	}}
																>
																	{
																		field
																	}
																</Grid>
															);
														},
													)}
											</Grid>
										</Grid>
										<Grid size={12}>
											<Collapse
												in={
													expand
												}
											>
												<Grid
													container
													direction="row"
													spacing={
														2
													}
												>
													{GenerateFields(
														formValuesAdvanced,
														handleChangeAdvanced,
														formFieldsAdvanced,
													).map(
														(
															field,
															i,
														) => {
															return (
																<Grid
																	key={
																		'field_advanced' +
																		i
																	}
																	size={{
																		xs: 12,
																		md: 6,
																	}}
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
								</Grid>
								<Grid size={12}>
									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										spacing={3}
									>
										<Grid>
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
										<Grid>
											<Button
												variant="contained"
												color="secondary"
												onClick={() => {
													handleReset();
													handleResetAdvanced();
												}}
											>
												{t(
													'commons.search_forms.reset',
												)}
											</Button>
										</Grid>
										<Grid>
											<ExpandButton
												expand={
													expand
												}
												setExpand={
													handleExpand
												}
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</fieldset>
					</Paper>
				</form>
			</Grid>
		</Grid>
	);
};

export default SearchFormular;
