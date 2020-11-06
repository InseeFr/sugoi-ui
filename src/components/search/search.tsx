import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUsers } from '../../api/api';
import SearchForm from '../formular/formular';
import Notification from './../notification/notification';

interface formValues {
	Domaine: string;
}

const Search = () => {
	const [values, setValues] = useState<formValues | null>(null);
	const [users, setUsers] = useState<any[]>([]);
	const [, setLoading] = useState(false);
	const { realm } = useParams<any>();
	console.log(realm);
	useEffect(() => {
		if (values) {
			setLoading(true);
			getUsers(realm)
				.then((r) => {
					setUsers(r.results);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					return Notification(
						'Erreur lors de la récupération des realms',
						err,
					);
				});
		}
	}, [values, realm]);

	return (
		<>
			<Typography variant="h2" component="h2">
				Realm {realm}
			</Typography>
			<SearchForm setValues={setValues} />
			{/* <Row justify="center">
				<Col span={24}>
					<Title>Rechercher</Title>
				</Col>
				<Divider />
				<Col span={24}>
					<Card
						style={{
							marginTop: 16,
							width: '100%',
							borderRadius: 8,
							boxShadow:
								'5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
						}}
						title="Ma recherche: "
					>
						<SearchForm setValues={setValues} />
					</Card>
				</Col>
				<Divider />
				<Col span={24}>
					<Spin spinning={loading}>
						<Card
							style={{
								marginTop: 16,
								width: '100%',
								borderRadius: 8,
								boxShadow:
									'5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
							}}
						>
							<SearchResults datasource={users} />
						</Card>
					</Spin>
				</Col>
				{users.length > 0 ? (
					<Col span={12}>
						<Spin spinning={loading}>
							<Card
								style={{
									marginTop: 16,
									width: '100%',
									borderRadius: 8,
									boxShadow:
										'5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
								}}
							>
								<Alert
									message={
										D.search_alert_limit
									}
									type="info"
								/>
							</Card>
						</Spin>
					</Col>
				) : null}
			</Row> */}
			search
		</>
	);
};

export default Search;
