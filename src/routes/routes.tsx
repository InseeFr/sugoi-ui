import { SearchApplications } from '../components/searchApplications';
import CreateOrganization from '../components/createOrganization';
import CreateUsers from '../components/createUser';
import DetailsOrganization from '../components/detailsOrganization';
import DetailsUser from '../components/detailsUser';
import Home from '../components/home/home';
import RealmHome from '../components/realmHome';
import SearchOrganizations from '../components/searchOrganizations';
import SearchUsers from '../components/searchUsers';
import Settings from '../components/settings/settings';
import { DetailsApplication } from '../components/detailsApplication';
const IdDynamicBreadcrumb = ({ match }: any): string => {
	return match.params['id'];
};

const RealmDynamicBreadcrumb = ({ match }: any): string => {
	return 'Realm ' + match.params['realm'];
};
const UsDynamicBreadcrumb = ({ match }: any): string => {
	return 'UserStorage ' + match.params['userStorage'];
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
		path: '/realm/:realm/us/:userStorage/users',
		exact: true,
		breadcrumb: 'breadcrumb.users',
		component: SearchUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/users',
		exact: true,
		breadcrumb: 'breadcrumb.users',
		component: SearchUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/users/create',
		exact: true,
		breadcrumb: 'breadcrumb.create',
		component: CreateUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/users/:id',
		exact: true,
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsUser,
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
		path: '/realm/:realm/us/:userStorage/organizations',
		exact: true,
		breadcrumb: 'breadcrumb.organizations',
		component: SearchOrganizations,
		secure: true,
	},
	{
		path: '/realm/:realm/organizations',
		exact: true,
		breadcrumb: 'breadcrumb.organizations',
		component: SearchOrganizations,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/organizations/create',
		exact: true,
		breadcrumb: 'breadcrumb.create',
		component: CreateOrganization,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/organizations/:id',
		exact: true,
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsOrganization,
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
		path: '/realm/:realm/applications',
		exact: true,
		breadcrumb: 'Application',
		component: SearchApplications,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/applications',
		exact: true,
		breadcrumb: 'Application',
		component: SearchApplications,
		secure: true,
	},
	{
		path: '/realm/:realm/applications/:id',
		exact: true,
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsApplication,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage',
		exact: true,
		breadcrumb: UsDynamicBreadcrumb,
		component: RealmHome,
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
		breadcrumb: 'breadcrumb.settings',
		component: Settings,
		secure: true,
	},
	{
		path: '/',
		exact: true,
		breadcrumb: 'breadcrumb.home',
		component: Home,
		secure: false,
	},
];

export default routes;
