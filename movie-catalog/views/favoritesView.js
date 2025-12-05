// Вью страницы избранного и "хочу посмотреть"

const FavoritesView = {
    render(viewType = 'favorites') {
        const title = viewType === 'favorites' ? 'Избранные фильмы' : 'Хочу посмотреть';

        return `
            <div class="view-header">
                <h1 class="view-title">${title}</h1>
                <div class="view-tabs">
                    <button class="tab-btn ${viewType === 'favorites' ? 'active' : ''}"
                            data-view="favorites">Избранное</button>
                    <button class="tab-btn ${viewType === 'watchlist' ? 'active' : ''}"
                            data-view="watchlist">Хочу посмотреть</button>
                </div>
            </div>
            <div class="movies-grid" id="favorites-grid">
                <!-- Фильмы будут загружены здесь -->
            </div>
        `;
    },

    afterRender(viewType = 'favorites') {
        // Обработчики переключения вкладок
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newViewType = btn.dataset.view;
                document.dispatchEvent(new CustomEvent('viewChange', {
                    detail: { view: newViewType }
                }));
            });
        });

        // Загружаем фильмы
        this.loadMovies(viewType);

        // Подписываемся на обновления хранилища
        const eventType = viewType === 'favorites' ? 'favoritesUpdated' : 'watchlistUpdated';
        StorageManager.subscribe(eventType, () => {
            this.loadMovies(viewType);
        });
    },

    loadMovies(viewType) {
        const movieIds = viewType === 'favorites'
            ? StorageManager.getFavorites()
            : StorageManager.getWatchlist();

        const moviesGrid = document.getElementById('favorites-grid');

        if (movieIds.length === 0) {
            moviesGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-${viewType === 'favorites' ? 'heart' : 'bookmark'}"></i>
                    <h3>${viewType === 'favorites' ? 'Нет избранных фильмов' : 'Список "Хочу посмотреть" пуст'}</h3>
                    <p>${viewType === 'favorites'
                        ? 'Добавляйте фильмы в избранное, чтобы они появились здесь'
                        : 'Добавляйте фильмы в список "Хочу посмотреть", чтобы они появились здесь'}</p>
                    <button class="detail-btn primary" id="browse-movies-btn">
                        <i class="fas fa-film"></i> Смотреть фильмы
                    </button>
                </div>
            `;

            document.getElementById('browse-movies-btn').addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('viewChange', {
                    detail: { view: 'home' }
                }));
            });

            return;
        }

        // Показываем лоадер
        moviesGrid.innerHTML = `
            <div class="loader-container" style="grid-column: 1 / -1;">
                <div class="loader"></div>
                <p>Загрузка...</p>
            </div>
        `;

        // Загружаем информацию о каждом фильме
        Promise.all(
            movieIds.map(id => MockAPI.getMovieDetails(id))
        ).then(movies => {
            moviesGrid.innerHTML = movies.map(movie =>
                MovieCardComponent.render(movie)
            ).join('');

            // Инициализируем обработчики событий для карточек
            MovieCardComponent.afterRender();
        }).catch(error => {
            moviesGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Ошибка загрузки</h3>
                    <p>Не удалось загрузить фильмы. Пожалуйста, попробуйте позже.</p>
                </div>
            `;
        });
    }
};