export type RouteType = {
    route: string;
    title: string;
    template?: string;
    styles?: string;
    load: (params: Record<string, string>) => void;
    children?: RouteType[];
    meta?: Record<string, any>;
}