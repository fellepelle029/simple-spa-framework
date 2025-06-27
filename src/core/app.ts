import {Router} from "./routing/router";
import {routes} from "./routing/routes";
import '../assets/styles/styles.scss';

class App {
    public router: Router;
    constructor() {
        this.router = new Router(routes);
        void this.router.loadRoute();

        (window as any).navigateTo = (path: string): void => {
            this.router.navigateTo(path);
        };
    }
}

new App();