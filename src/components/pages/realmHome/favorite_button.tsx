import { Button } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { saveFavoriteRealm } from 'src/lib/redux/actions/app';
import { RootState } from 'src/lib/configuration/store-configuration';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FavoriteButtonProps {
	realm: string;
	userStorage?: string;
}

const FavoriteButton = ({ realm, userStorage }: FavoriteButtonProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const favoriteRealm = useSelector(
		(state: RootState) => state.app.favoriteRealm,
	);

	const favoriteUs = useSelector(
		(state: RootState) => state.app.favoriteUs,
	);

	const [check, setCheck] = useState(
		favoriteRealm === realm &&
			(favoriteUs ? favoriteUs === userStorage : true),
	);

	const handleClick = () => {
		check
			? dispatch(saveFavoriteRealm(undefined))
			: dispatch(saveFavoriteRealm(realm, userStorage));
		setCheck(!check);
	};

	return (
		<Button
			variant="contained"
			color="primary"
			startIcon={
				check ? (
					<StarIcon
						style={{
							color: '#ff9800',
						}}
					/>
				) : (
					<StarIcon />
				)
			}
			onClick={handleClick}
		>
			{t('global_search.favorite_button')}
		</Button>
	);
};

export default FavoriteButton;
