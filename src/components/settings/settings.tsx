import React, { useEffect, useState } from 'react';
import { getRealms } from '../../api/api';
import { Realm } from '../../model/interface';
import Notification from './../notification/notification';

const Settings = () => {
	const [, setLoading] = useState(true);
	const [, setRealms] = useState<Realm[]>([]);
	useEffect(() => {
		getRealms()
			.then((r) => {
				setRealms(r);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				return Notification(
					'Erreur ',
					'Erreur lors de la récupération des realms',
				);
			});
	}, []);
	return <div>Settings</div>;
};

export default Settings;
