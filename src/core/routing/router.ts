import {RouteType} from "../../types/route.type";

type MatchedRoute = {
    route: RouteType,
    params: Record<string, string>,
} | null

export class Router {
    routes: RouteType[];
    template: HTMLElement | null = null;

    constructor(routes: RouteType[]) {
        this.routes = routes
    }

    public async loadRoute(): Promise<void> {
        const url = new URL(window.location.href);
        const pathParts = url.pathname.split('/').filter(part => part !== '');
        const matchedRoute = this.findRoute(this.routes, pathParts);
        this.template = document.getElementById('app');

        if (matchedRoute && this.template) {
            const route = matchedRoute.route;
            if (route.template) {
                this.template.innerHTML = await this.fetchHTML(route.template);
            }
            route.load(matchedRoute.params);
        } else {
            this.redirectToHome()
            throw new Error(`Path ${url.pathname} not found!`)
        }
    }

    public navigateTo(path: string): void {
        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
            void this.loadRoute();
        }
    }

    private findRoute(routes: RouteType[], pathParts: string[]): MatchedRoute | null {
        if (pathParts.length === 0) {
            const route = findRouteInPath(routes, '');
            return route ? {route, params: {}} : null;
        }

        const currentPart = pathParts[0];

        let currentRoute = findRouteInPath(routes, currentPart)

        if (!currentRoute) {
            currentRoute = routes.find((route: RouteType) => route.route.startsWith(':'));
        }
        if (!currentRoute) return null;

        let params: Record<string, string> = {};
        if (currentRoute.route.startsWith(':')) {
            const paramName = currentRoute.route.slice(1);
            params[paramName] = currentPart;
        }

        if (pathParts.length === 1) {
            return {route: currentRoute, params};
        }

        if (currentRoute.children) {
            const childResult: MatchedRoute | undefined = this.findRoute(currentRoute.children, pathParts.slice(1));
            if (childResult) {
                return {
                    route: childResult.route,
                    params: {...params, ...childResult.params}
                }
            }
        }
        return null;
    }

    private redirectToHome(): void {
        window.history.pushState({}, '', '/');
        const homeRoute = findRouteInPath(this.routes, '');
        if (homeRoute) {
            homeRoute.load({});
        }
    }

    private async fetchHTML(path: string): Promise<string> {
        const result = await fetch(path);
        if (!result.ok) throw new Error(`${path} loading error!`)
        return await result.text();
    }
}

function findRouteInPath(routes: RouteType[], path: string) {
    return routes.find((route: RouteType) => route.route === path);
}
