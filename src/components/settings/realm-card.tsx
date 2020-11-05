import React from 'react';
import { Realm } from '../../model/interface';

interface props {
	realm: Realm;
}

const RealmCard = (props: props) => {
	const { realm } = props;
	return <div>Realm</div>;
};

export default RealmCard;
