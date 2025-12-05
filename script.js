// Основной файл приложения - роутинг и управление состоянием

class MovieCatalogApp {
    constructor() {
        this.currentView = 'home';
        this.currentData = null;
        this.init();
    }

    init() {
        // Подписываемся на событие смены вью
        document.addEventListener('viewChange', (e) => {
            this.navigateTo(e.detail.view, e.detail);
        });

        // Инициализируем хедер
        this.renderHeader();

        // Загружаем начальную страницу
        this.navigateTo('home');
    }

    renderHeader() {
        const headerContainer = document.getElementById('header');
        headerContainer.innerHTML = HeaderComponent.render();
        HeaderComponent.afterRender();
    }

    navigateTo(view, data = {}) {
        this.currentView = view;
        this.currentData = data;

        // Обновляем URL в адресной строке (без перезагрузки)
        window.history.pushState(
            { view, data },
            '',
            this.getUrlForView(view, data)
        );

        // Рендерим контент
        this.renderContent(view, data);
    }

    getUrlForView(view, data) {
        switch(view) {
            case 'detail':
                return `#/movie/${data.movieId}`;
            case 'favorites':
                return '#/favorites';
            case 'watchlist':
                return '#/watchlist';
            case 'search':
                return `#/search?q=${encodeURIComponent(data.query)}`;
            case 'home':
            default:
                return '#/';
        }
    }

    renderContent(view, data) {
        const mainContent = document.getElementById('main-content');

        switch(view) {
            case 'home':
                mainContent.innerHTML = HomeView.render();
                // Загружаем фильмы
                MockAPI.getPopularMovies()
                    .then(movies => {
                        HomeView.afterRender(movies);
                    });
                break;

            case 'detail':
                mainContent.innerHTML = DetailView.render(data.movieId);
                DetailView.afterRender(data.movieId);
                break;

            case 'favorites':
                mainContent.innerHTML = FavoritesView.render('favorites');
                FavoritesView.afterRender('favorites');
                break;

            case 'watchlist':
                mainContent.innerHTML = FavoritesView.render('watchlist');
                FavoritesView.afterRender('watchlist');
                break;

            case 'search':
                mainContent.innerHTML = `
                    <div class="view-header">
                        <h1 class="view-title">Результаты поиска: "${data.query}"</h1>
                        <button class="detail-btn secondary" id="clear-search-btn">
                            <i class="fas fa-times"></i> Очистить поиск
                        </button>
                    </div>
                    <div class="movies-grid" id="search-results">
                        <!-- Результаты поиска будут здесь -->
                    </div>
                `;

                if (data.movies && data.movies.length > 0) {
                    const resultsGrid = document.getElementById('search-results');
                    resultsGrid.innerHTML = data.movies.map(movie =>
                        MovieCardComponent.render(movie)
                    ).join('');
                    MovieCardComponent.afterRender();
                } else {
                    document.getElementById('search-results').innerHTML = `
                        <div class="empty-state" style="grid-column: 1 / -1;">
                            <i class="fas fa-search"></i>
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить запрос или посмотрите популярные фильмы</p>
                            <button class="detail-btn primary" id="browse-popular-btn">
                                <i class="fas fa-film"></i> Смотреть популярные фильмы
                            </button>
                        </div>
                    `;

                    document.getElementById('browse-popular-btn').addEventListener('click', () => {
                        this.navigateTo('home');
                    });
                }

                document.getElementById('clear-search-btn').addEventListener('click', () => {
                    this.navigateTo('home');
                });
                break;

            default:
                mainContent.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-exclamation-circle"></i>
                        <h3>Страница не найдена</h3>
                        <p>Запрашиваемая страница не существует.</p>
                        <button class="detail-btn primary" id="go-home-btn">
                            <i class="fas fa-home"></i> На главную
                        </button>
                    </div>
                `;

                document.getElementById('go-home-btn').addEventListener('click', () => {
                    this.navigateTo('home');
                });
        }
    }

    // Обработка навигации по истории браузера
    setupHistory() {
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.currentView = e.state.view;
                this.currentData = e.state.data;
                this.renderContent(e.state.view, e.state.data);
            }
        });
    }
}

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const app = new MovieCatalogApp();
    app.setupHistory();

    // Прячем лоадер после загрузки
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }, 500);
});
