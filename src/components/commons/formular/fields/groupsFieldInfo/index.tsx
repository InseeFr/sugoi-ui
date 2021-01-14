import {
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@material-ui/core';
import React from 'react';
import PopButton from '../../../../commons/popButton/popButton';
import PopIcon from '../../../../commons/popIcon/popIcon';
import GroupsField from './groupesFIeldPopup';

interface props {
	groups: any;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	name?: string;
	handleChange: any;
	addTitle?: string;
	deleteTitle?: string;
	modifiable: boolean;
}

export const groupsFieldButton = ({
	name,
	helpTextTitle,
	helpText,
	textButton,
	groups,
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
						<GroupsField
							name={name}
							helpText={helpText}
							helpTextTitle={helpTextTitle}
							modifiable={modifiable}
							groups={groups}
							handleChange={handleChange}
						/>
					}
					color="primary"
					variant="contained"
				/>
			</Grid>
			<List dense={true}>
				{groups.map((group: string) => (
					<ListItem disableGutters>
						<ListItemText primary={group} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default groupsFieldButton;
