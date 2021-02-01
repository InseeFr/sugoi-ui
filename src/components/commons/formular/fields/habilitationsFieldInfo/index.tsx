import {
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Habilitation } from '../../../../../model/api/habilitation';
import PopButton from '../../../../commons/popButton/popButton';
import PopIcon from '../../../../commons/popIcon/popIcon';
import HabilitationFieldPopup from './habilitationFieldInfoPopup';

interface props {
	habilitations: Habilitation[];
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	handleChange: any;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
}

export const HabilitationFieldInfo = ({
	name,
	helpTextTitle,
	helpText,
	textButton,
	habilitations,
	handleChange,
	modifiable,
}: props) => {
	return (
		<>
			<Grid container direction="row" justify="center">
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography component="div" variant="body1">
						{name}
					</Typography>
					<PopIcon
						helpTextTitle={helpTextTitle}
						helpText={helpText}
					/>
				</div>
				<PopButton
					text={textButton || ''}
					title="Gestion habilitations"
					body={
						<HabilitationFieldPopup
							name={name}
							helpText={helpText}
							helpTextTitle={helpTextTitle}
							modifiable={modifiable}
							habilitations={habilitations}
							handleChange={handleChange}
						/>
					}
					color="primary"
					variant="contained"
				/>
			</Grid>
			<List dense={true}>
				{habilitations.map((value: Habilitation) => (
					<ListItem disableGutters>
						<ListItemText
							primary={
								value.application +
								'_' +
								value.role +
								'_' +
								value.property
							}
						/>
					</ListItem>
				))}
			</List>
		</>
	);
};

export default HabilitationFieldInfo;
