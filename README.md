# Лёгкий SPA-фреймворк на TypeScript
Минималистичный фреймворк с компонентной архитектурой, похожей на Angular, но проще. Подходит для небольших и средних SPA.

# Почему не Angular/React?
Если у вас простое приложение с несколькими страницами и лёгкой логикой — нет смысла тянуть тяжёлые фреймворки.

## Возможности

- Компоненты из трёх файлов: `.ts`, `.html`, `.scss`  
- Сборка на Webpack с TypeScript и SCSS  
- Простой роутинг с параметрами и вложенными маршрутами  

## Быстрый старт

```bash
npm install
npm run dev       # разработка с хот-релоадом
npm run build     # продакшн-сборка
```



# Роутинг
Роутинг — массив маршрутов, где каждый описан так:

```ts
export const routes: RouteType[] = [
  {
    route: '',                    // путь
    title: 'Главная',             // заголовок страницы
    template: '/views/home/home.html', // html-шаблон
    load: () => new Home()        // загрузка компонента
  },
  {
    route: 'user/:id', 
    title: 'Профиль',
    template: '/views/user/profile.html',
    load: (params) => new UserProfile(params.id),
  },
  {
    route: 'dashboard',
    title: 'Панель',
    template: '/views/dashboard/dashboard.html',
    load: () => new Dashboard(),
    children: [
      {
        route: 'settings',
        title: 'Настройки',
        template: '/views/dashboard/settings.html',
        load: () => new Settings()
      }
    ]
  }
];
```
Использование стилей в компоненте
Импортируйте scss прямо в ts:

```ts
import './home.scss';

export class Home {
  constructor() {
    this.init();
  }
  private init(): void {
    console.log('Home работает');
  }
}
```
