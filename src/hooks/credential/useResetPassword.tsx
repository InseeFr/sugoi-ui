import { useEffect, useState } from 'react';
import { PasswordChangeRequest } from '../../model/api/passwordChangeRequest';
import { resetPassword } from './../../api';

export const useResetPassword = () => {
	const [todo, setTodo] = useState<any>(undefined);
	useEffect(() => {
		if (todo) {
		}
	}, [todo]);

	const execute = (
		realm: string,
		userid: string,
		pcr: PasswordChangeRequest,
	) => {
		setTodo({ realm: realm, userId: userid, pcr: pcr });
	};

	return { execute };
};
