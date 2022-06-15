import {
	Button,
	Collapse,
	Grid,
	Tooltip,
	Box,
	Paper,
	Typography,
	useTheme,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
				<Paper elevation={0}>
					<fieldset
						style={{
							padding: '20px',
							borderColor:
								theme.palette.primary.main,
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

						<Grid container direction="row" spacing={2}>
							<Grid item xs={12}>
								<Grid
									container
									direction="row"
									spacing={2}
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
														item
														xs={
															12
														}
														md={
															12
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
							</Grid>
							<Grid item xs={12}>
								<Collapse in={expand}>
									<Grid
										container
										direction="row"
										spacing={2}
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
														item
														xs={
															12
														}
														md={
															6
														}
														key={
															'field_advanced' +
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
							<Grid item>
								<ExpandButton
									expand={expand}
									setExpand={handleExpand}
								/>
							</Grid>
						</Grid>
					</fieldset>
				</Paper>
			</form>
		</>
	);
};

export default SearchFormular;
