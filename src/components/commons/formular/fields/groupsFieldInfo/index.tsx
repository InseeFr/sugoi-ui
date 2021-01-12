import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import get from 'lodash.get';
import React from 'react';
import User from '../../../../../model/api/user';
import PopButton from '../../../../commons/popButton/popButton';
import PopIcon from '../../../../commons/popIcon/popIcon';
import GroupsField from './groupesFIeldPopup';

interface props {
	data: User;
	textButton?: string;
	helpTextTitle?: string;
	helpText?: string;
	path: string;
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
	data,
	path,
	handleChange,
	modifiable,
}: props) => {
	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography component="div" variant="body1">
					{name}
				</Typography>
				<PopIcon
					helpTextTitle={helpTextTitle}
					helpText={helpText}
				/>
				<div style={{ float: 'right' }}>
					<PopButton
						text={textButton || ''}
						title="Gestion habilitations"
						body={
							<GroupsField
								name={name}
								helpText={helpText}
								helpTextTitle={helpTextTitle}
								modifiable={modifiable}
								data={data}
								handleChange={handleChange}
								path={path}
							/>
						}
						color="primary"
						variant="contained"
					/>
				</div>
			</div>
			<List dense={true}>
				{get(data, path, []).map((value: string) => (
					<ListItem disableGutters>
						<ListItemText primary={value} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default groupsFieldButton;
