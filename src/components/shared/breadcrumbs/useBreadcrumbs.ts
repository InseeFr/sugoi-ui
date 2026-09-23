import { matchPath, useLocation } from 'react-router';

type Params = Record<string, string | undefined>;

export interface BreadcrumbMatch {
	pathname: string;
	params: Params;
}

export type BreadcrumbLabel =
	string | ((props: { match: BreadcrumbMatch }) => string);

export interface BreadcrumbRoute {
	path: string;
	breadcrumb?: BreadcrumbLabel | null;
}

export interface Crumb {
	match: BreadcrumbMatch;
	breadcrumb: BreadcrumbLabel;
}

const capitalize = (segment: string) => {
	const s = decodeURIComponent(segment);
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export function useBreadcrumbs(
	routes: BreadcrumbRoute[],
	{ excludePaths = [] }: { excludePaths?: string[] } = {},
): Crumb[] {
	const { pathname } = useLocation();
	const segments = pathname.split('/').filter(Boolean);
	const paths = [
		'/',
		...segments.map((_, i) => '/' + segments.slice(0, i + 1).join('/')),
	];

	return paths.flatMap((path): Crumb[] => {
		if (
			excludePaths.some((p) =>
				matchPath({ path: p, end: true }, path),
			)
		) {
			return [];
		}

		// First route to matche win (Array order is important)
		for (const route of routes) {
			const m = matchPath({ path: route.path, end: true }, path);
			if (!m) continue;
			if (route.breadcrumb === null) return [];
			if (route.breadcrumb) {
				return [
					{
						match: { pathname: path, params: m.params },
						breadcrumb: route.breadcrumb,
					},
				];
			}
			break;
		}

		// Fallback
		return [
			{
				match: { pathname: path, params: {} },
				breadcrumb: capitalize(path.split('/').pop()!),
			},
		];
	});
}
