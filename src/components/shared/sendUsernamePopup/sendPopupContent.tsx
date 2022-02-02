import {
	Box,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { TemplateProperties } from '../../../lib/model/api/TemplateProperties';
import User from 'src/lib/model/api/user';

interface props {
	user?: User;
	changeATemplateProperty?: any;
	templateProperties: TemplateProperties;
}
export const SendPopupContent = ({
	user,
	templateProperties,
	changeATemplateProperty,
}: props) => {
	const [includeNameApp, setincludeNameApp] = useState(false);
	const [includeAssistMail, setincludeAssistMail] = useState(false);

	return (
		<Grid container direction="column" spacing={3}>
			<Grid item>
				<Typography variant="h6">
					Personnaliser le message
				</Typography>
				<Typography>
					Vous pouvez personnaliser le mail d'envoi du
					nouveau mot de passe.
				</Typography>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={includeNameApp}
								onChange={() =>
									setincludeNameApp(
										!includeNameApp,
									)
								}
								name="includeNameApp"
								color="primary"
							/>
						}
						label="Inclure le nom de l'application"
					/>
					{includeNameApp ? (
						<TextField
							label="Nom de l'application"
							name="application"
							value={
								templateProperties.application ||
								''
							}
							onChange={changeATemplateProperty}
						/>
					) : (
						templateProperties.application &&
						changeATemplateProperty('application')
					)}
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={includeAssistMail}
								onChange={() =>
									setincludeAssistMail(
										!includeAssistMail,
									)
								}
								name="includeAssistMail"
								color="primary"
							/>
						}
						label="Inclure un mail d'assistance"
					/>
					{includeAssistMail ? (
						<TextField
							label="Mail assistance"
							name="assistMail"
							value={
								templateProperties.assistMail ||
								''
							}
							onChange={changeATemplateProperty}
						/>
					) : (
						templateProperties.senderEmail &&
						changeATemplateProperty('assistMail')
					)}
				</div>
			</Grid>
			<Grid item>
				<Divider />
			</Grid>
			<Grid item>
				<Typography variant="h6">Aperçu du message</Typography>
				<Typography component="div">
					<Box m={2}>Bonjour,</Box>
					<Box m={2}>
						Suite à votre demande,voici votre nouveau
						identifiant
						{includeNameApp
							? " pour l'accès  à  l'application " +
							  templateProperties.application +
							  ' :'
							: ' :'}
					</Box>
					<Box fontStyle="italic" m={2}>
						{user?.username}
					</Box>
					<Box m={2}>
						Attention, vous devez respecter les
						majuscules, minuscules et caractères
						spéciaux.
					</Box>

					{includeAssistMail ? (
						<Box m={2}>
							Pour toute demande d'assistance, vous
							pouvez contacter{' '}
							{templateProperties.assistMail} par
							courrier electronique.
						</Box>
					) : null}
					<Box m={2}>Cordialement,</Box>
					<Box m={2}>
						<TextField
							label="Signature"
							name="signature"
							value={
								templateProperties.signature ||
								''
							}
							onChange={changeATemplateProperty}
						/>
					</Box>
				</Typography>
			</Grid>
		</Grid>
	);
};
