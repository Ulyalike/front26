// Компонент хедера с поиском и навигацией

const HeaderComponent = {
    render() {
        return `
            <header class="app-header">
                <div class="header-content">
                    <a href="#" class="logo" data-view="home">
                        <i class="fas fa-film"></i>
                        <span>FilmFlow</span>
                    </a>

                    <div class="search-container">
                        <form class="search-form" id="search-form">
                            <input
                                type="text"
                                class="search-input"
                                id="search-input"
                                placeholder="Найти фильм по названию или описанию..."
                                autocomplete="off"
                            >
                            <button type="submit" class="search-button">
                                <i class="fas fa-search"></i> Поиск
                            </button>
                        </form>
                    </div>

                    <div class="user-actions">
                        <button class="action-btn" data-view="favorites" title="Избранное">
                            <i class="fas fa-heart"></i>
                            <span class="badge" id="favorites-badge">0</span>
                        </button>
                        <button class="action-btn" data-view="watchlist" title="Хочу посмотреть">
                            <i class="fas fa-bookmark"></i>
                            <span class="badge" id="watchlist-badge">0</span>
                        </button>
                    </div>
                </div>
            </header>
        `;
    },

    afterRender() {
        // Обновляем бейджи с количеством
        this.updateBadges();

        // Подписываемся на обновления хранилища
        StorageManager.subscribe('favoritesUpdated', () => this.updateBadges());
        StorageManager.subscribe('watchlistUpdated', () => this.updateBadges());

        // Обработчик формы поиска
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // Ищем фильмы и показываем результаты
                this.performSearch(query);
            }
        });

        // Обработчики для кнопок навигации
        document.querySelectorAll('.logo, .action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const view = btn.dataset.view;
                if (view) {
                    // Диспатчим событие смены вью
                    document.dispatchEvent(new CustomEvent('viewChange', {
                        detail: { view, query: '' }
                    }));
                }
            });
        });
    },

    updateBadges() {
        const favoritesCount = StorageManager.getFavorites().length;
        const watchlistCount = StorageManager.getWatchlist().length;

        const favoritesBadge = document.getElementById('favorites-badge');
        const watchlistBadge = document.getElementById('watchlist-badge');

        if (favoritesBadge) {
            favoritesBadge.textContent = favoritesCount || '';
            favoritesBadge.style.display = favoritesCount > 0 ? 'flex' : 'none';
        }

        if (watchlistBadge) {
            watchlistBadge.textContent = watchlistCount || '';
            watchlistBadge.style.display = watchlistCount > 0 ? 'flex' : 'none';
        }
    },

    performSearch(query) {
        // Показываем лоадер
        document.getElementById('main-content').innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                <p>Ищем "${query}"...</p>
            </div>
        `;

        // Имитируем поиск через API
        MockAPI.searchMovies(query)
            .then(movies => {
                // Диспатчим событие с результатами поиска
                document.dispatchEvent(new CustomEvent('viewChange', {
                    detail: {
                        view: 'search',
                        query,
                        movies
                    }
                }));
            });
    }
};
