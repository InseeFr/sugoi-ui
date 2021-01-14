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
import { useLocalStorage } from '../../../../hooks/technics/useLocalStorage';

const LanguageButton = () => {
	const [lang, setLang] = useLocalStorage('lang', 'fr');

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null,
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const changeLanguage = (choice: string) => {
		setLang(choice);
		window.location.reload();
	};

	return (
		<>
			<Button
				color="inherit"
				startIcon={<TranslateIcon />}
				endIcon={<ArrowDropDownIcon />}
				onClick={handleClick}
			>
				{lang === 'fr' ? 'Français' : 'English'}
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
					<ListItem
						button
						onClick={() => changeLanguage('en')}
					>
						<ListItemText primary="English" />
					</ListItem>
					<ListItem
						button
						onClick={() => changeLanguage('fr')}
					>
						<ListItemText primary="Français" />
					</ListItem>
				</Box>
			</Popover>
		</>
	);
};
export default LanguageButton;
