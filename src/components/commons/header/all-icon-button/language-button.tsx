import {
	Box,
	Button,
	ListItem,
	ListItemText,
	Popover,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TranslateIcon from '@material-ui/icons/Translate';
import React from 'react';
import { useTranslation } from 'react-i18next';

const languages: Record<string, string> = {
	en: 'English',
	fr: 'Français',
};

const LanguageButton = () => {
	const { i18n, t } = useTranslation();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	console.log(i18n.language);
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
