import { Box, Button, ListItem, ListItemText, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TranslateIcon from '@mui/icons-material/Translate';
import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

const languages: Record<string, string> = {
	en: 'English',
	fr: 'Français',
};

const LanguageButton = () => {
	const { i18n, t } = useTranslation();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const changeLanguage = (choice: string) => {
		i18n.changeLanguage(choice);
	};

	return (
		<>
			<Button
				color="inherit"
				startIcon={<TranslateIcon />}
				endIcon={<ArrowDropDownIcon />}
				onClick={handleClick}
				title={t('commons.header.buttons.language')}
			>
				{languages[i18n.language] as String}
			</Button>
			<Popover
				id={id}
				open={open}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<Box
					alignItems="center"
					display="flex"
					flexDirection="column"
				>
					{Object.keys(languages).map((language) => (
						<ListItem
							button
							onClick={() =>
								changeLanguage(language)
							}
							key={
								'language-' +
								languages[language]
							}
						>
							<ListItemText
								primary={languages[language]}
							/>
						</ListItem>
					))}
				</Box>
			</Popover>
		</>
	);
};
export default LanguageButton;
