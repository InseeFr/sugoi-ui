import CreateOrganization from '../components/createOrganization';
import CreateUsers from '../components/createUser';
import DetailsOrganization from '../components/details/detailsOrganization';
import DetailsUser from '../components/details/detailsUser';
import Home from '../components/home/home';
import RealmHome from '../components/realmHome';
import SearchOrganizations from '../components/searchOrganization';
import SearchUsers from '../components/searchUser';
import Settings from '../components/settings/settings';

const IdDynamicBreadcrumb = ({ match }: any): string => {
	return match.params['id'];
};

const RealmDynamicBreadcrumb = ({ match }: any): string => {
	return 'Realm ' + match.params['realm'];
};
interface Iroutes {
	path: string;
	breadcrumb: any;
	component: () => JSX.Element;
	secure: boolean;
	exact: boolean;
}
const routes: Iroutes[] = [
	{
		path: '/realm/:realm/users',
		exact: true,
		breadcrumb: 'Utilisateurs',
		component: SearchUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/users/create',
		exact: true,
		breadcrumb: 'Création',
		component: CreateUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/users/:id',
		exact: true,
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsUser,
		secure: true,
	},
	{
		path: '/realm/:realm/organizations',
		exact: true,
		breadcrumb: 'Organisations',
		component: SearchOrganizations,
		secure: true,
	},
	{
		path: '/realm/:realm/organization/create',
		exact: true,
		breadcrumb: 'Création',
		component: CreateOrganization,
		secure: true,
	},
	{
		path: '/realm/:realm/organizations/:id',
		exact: true,
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsOrganization,
		secure: true,
	},
	{
		path: '/realm/:realm',
		exact: true,
		breadcrumb: RealmDynamicBreadcrumb,
		component: RealmHome,
		secure: true,
	},
	{
		path: '/settings',
		exact: true,
		breadcrumb: 'Paramètres',
		component: Settings,
		secure: true,
	},
	{
		path: '/',
		exact: true,
		breadcrumb: 'Accueil',
		component: Home,
		secure: false,
	},
];

export default routes;
