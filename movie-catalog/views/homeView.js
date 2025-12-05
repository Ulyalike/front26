// Вью главной страницы

const HomeView = {
    render() {
        return `
            <div class="view-header">
                <h1 class="view-title">Популярные фильмы</h1>
                <div class="view-tabs">
                    <button class="tab-btn active" data-sort="popular">Популярные</button>
                    <button class="tab-btn" data-sort="rating">По рейтингу</button>
                    <button class="tab-btn" data-sort="newest">Новинки</button>
                </div>
            </div>
            <div class="movies-grid" id="movies-grid">
                <!-- Фильмы будут загружены здесь -->
            </div>
        `;
    },

    afterRender(movies) {
        // Сортировка фильмов
        const sortButtons = document.querySelectorAll('.tab-btn');
        let currentSort = 'popular';

        sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Обновляем активную кнопку
                sortButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentSort = btn.dataset.sort;
                this.sortAndRenderMovies(movies, currentSort);
            });
        });

        // Первоначальная отрисовка фильмов
        this.sortAndRenderMovies(movies, currentSort);
    },

    sortAndRenderMovies(movies, sortType) {
        let sortedMovies = [...movies];

        switch(sortType) {
            case 'rating':
                sortedMovies.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                sortedMovies.sort((a, b) => b.year - a.year);
                break;
            case 'popular':
            default:
                // Оставляем исходный порядок (уже популярные)
                break;
        }

        const moviesGrid = document.getElementById('movies-grid');
        moviesGrid.innerHTML = sortedMovies.map(movie =>
            MovieCardComponent.render(movie)
        ).join('');

        // Инициализируем обработчики событий для карточек
        MovieCardComponent.afterRender();
    }
};