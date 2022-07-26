import { SearchApplications } from 'src/components/pages/searchApplications';
import CreateOrganization from 'src/components/pages/createOrganization';
import CreateUsers from 'src/components/pages/createUser';
import DetailsOrganization from 'src/components/pages/detailsOrganization';
import DetailsUser from 'src/components/pages/detailsUser';
import Home from 'src/components/pages/home/home';
import RealmHome from '../pages/realmHome';
import SearchOrganizations from 'src/components/pages/searchOrganizations';
import SearchUsers from 'src/components/pages/searchUsers';
import Settings from 'src/components/pages/settings';
import { DetailsApplication } from 'src/components/pages/detailsApplication';

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
}
const routes: Iroutes[] = [
	{
		path: '/realm/:realm/us/:userStorage/users',
		breadcrumb: 'breadcrumb.users',
		component: SearchUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/users',
		breadcrumb: 'breadcrumb.users',
		component: SearchUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/users/create',
		breadcrumb: 'breadcrumb.create',
		component: CreateUsers,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/users/:id',
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsUser,
		secure: true,
	},
	{
		path: '/realm/:realm/users/:id',
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsUser,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/organizations',
		breadcrumb: 'breadcrumb.organizations',
		component: SearchOrganizations,
		secure: true,
	},
	{
		path: '/realm/:realm/organizations',
		breadcrumb: 'breadcrumb.organizations',
		component: SearchOrganizations,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/organizations/create',
		breadcrumb: 'breadcrumb.create',
		component: CreateOrganization,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage/organizations/:id',
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsOrganization,
		secure: true,
	},
	{
		path: '/realm/:realm/organizations/:id',
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsOrganization,
		secure: true,
	},
	{
		path: '/realm/:realm/applications',
		breadcrumb: 'Application',
		component: SearchApplications,
		secure: true,
	},
	{
		path: '/realm/:realm/applications/:id',
		breadcrumb: IdDynamicBreadcrumb,
		component: DetailsApplication,
		secure: true,
	},
	{
		path: '/realm/:realm/us/:userStorage',
		breadcrumb: UsDynamicBreadcrumb,
		component: RealmHome,
		secure: true,
	},
	{
		path: '/realm/:realm',
		breadcrumb: RealmDynamicBreadcrumb,
		component: RealmHome,
		secure: true,
	},
	{
		path: '/settings',
		breadcrumb: 'breadcrumb.settings',
		component: Settings,
		secure: true,
	},
	{
		path: '/',
		breadcrumb: 'breadcrumb.home',
		component: Home,
		secure: false,
	},
];

export default routes;
