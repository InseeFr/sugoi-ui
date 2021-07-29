import {
	Grid,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Collapse,
} from '@material-ui/core';
import { useState } from 'react';
import { useGetRealm } from '../../../hooks/realm';

import Title from '../title/title';
import InfoIcon from '@material-ui/icons/Info';
import PopIcon from '../popIcon/popIcon';
import parse from 'html-react-parser';

interface Props {
	realmName: string;
}

export const Description = ({ realmName }: Props) => {
	const { result: realm } = useGetRealm(realmName);
	const [hide, setHide] = useState(false);
	return (
		<Card variant="outlined">
			<CardHeader
				title={
					<Title
						title={'Description ' + realmName}
						variant="caption"
					/>
				}
			/>
			<CardContent>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12}>
						{realm?.properties.description &&
							parse(realm?.properties.description)}
					</Grid>
					<Grid item xs={12}></Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export const ButtonDescription = ({ realmName }: Props) => {
	const { result: realm } = useGetRealm(realmName);
	return (
		<PopIcon
			helpTextTitle={'Description ' + realmName}
			helpText={
				realm?.properties.description &&
				parse(realm?.properties.description)
			}
		/>
	);
};

Description.defaultProps = {
	closeable: false,
};

export default Description;
