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
import { TemplateProperties } from 'src/lib/model/api/TemplateProperties';

interface props {
	changeATemplateProperty: any;
	templateProperties: TemplateProperties;
}

export const ResetPasswordPopupContent = ({
	templateProperties,
	changeATemplateProperty,
}: props) => {
	const [includeNameApp, setincludeNameApp] = useState(false);
	const [includeAssistMail, setincludeAssistMail] = useState(false);
	const [changeSenderMail, setChangeSenderMail] = useState(false);
	const [changeReceiverMail, setChangeReceiverMail] = useState(false);
	return (
		<Grid container direction="column" spacing={3}>
			<Grid item>
				<Typography>
					Attention le mot de passe va être réinitialisé.
				</Typography>
			</Grid>
			<Grid item>
				<Typography>
					Un mail contenant le nouveau mot de passe va être
					envoyé à l'adresse mail suivante :{' '}
					{templateProperties.mail}
				</Typography>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={changeSenderMail}
								onChange={() =>
									setChangeSenderMail(
										!changeSenderMail,
									)
								}
								name="changeSenderMail"
								color="primary"
							/>
						}
						label="Changer adresse mail expediteur"
					/>
					{changeSenderMail ? (
						<TextField
							label="Mail expéditeur"
							name="senderEmail"
							value={
								templateProperties.senderEmail ||
								''
							}
							onChange={changeATemplateProperty}
						/>
					) : null}
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={changeReceiverMail}
								onChange={() =>
									setChangeReceiverMail(
										!changeReceiverMail,
									)
								}
								name="email"
								color="primary"
							/>
						}
						label="Envoyer le mail a une autre adresse"
					/>
					{changeReceiverMail ? (
						<TextField
							label="Mail"
							name="mail"
							value={templateProperties.mail || ''}
							onChange={changeATemplateProperty}
						/>
					) : null}
				</div>
			</Grid>
			<Grid item>
				<Divider />
			</Grid>
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
					) : null}
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
					) : null}
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
						mot de passe
						{includeNameApp
							? " pour l'accès  à  l'application " +
							  templateProperties.application +
							  ' :'
							: ' :'}
					</Box>
					<Box fontStyle="italic" m={2}>
						Nouveau mot de passe de l'agent
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
