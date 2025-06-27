import {RouteType} from "../../types/route.type";
import {Home} from "../../views/home/home";

export const routes: RouteType[] = [
    {
        route: '',
        title: 'Главная',
        template: '/views/home/home.html',
        styles: '/views/home/home.css',
        load: () => {
            new Home()
        }
    },
];