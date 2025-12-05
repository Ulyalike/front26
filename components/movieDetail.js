// Компонент детальной страницы фильма

const MovieDetailComponent = {
    render(movie) {
        const isFavorite = StorageManager.isFavorite(movie.id);
        const isInWatchlist = StorageManager.isInWatchlist(movie.id);
        const ratingClass = this.getRatingClass(movie.rating);

        return `
            <div class="movie-detail-container">
                <div class="movie-detail-header">
                    <div class="detail-poster">
                        <img src="${movie.poster}" alt="${movie.title}">
                    </div>
                    <div class="detail-info">
                        <h1 class="detail-title">${movie.title}</h1>
                        <div class="detail-meta">
                            <span class="detail-rating ${ratingClass}">${movie.rating.toFixed(1)}</span>
                            <span class="detail-year">${movie.year}</span>
                            <span class="detail-duration">${movie.duration}</span>
                        </div>
                        <div class="detail-genres">
                            ${movie.genres.map(genre =>
                                `<span class="genre-tag">${genre}</span>`
                            ).join('')}
                        </div>
                        <div class="detail-actions">
                            <button class="detail-btn primary" data-action="toggleFavorite" data-id="${movie.id}">
                                <i class="fas ${isFavorite ? 'fa-heart' : 'fa-heart'}"></i>
                                ${isFavorite ? 'Удалить из избранного' : 'В избранное'}
                            </button>
                            <button class="detail-btn secondary" data-action="toggleWatchlist" data-id="${movie.id}">
                                <i class="fas ${isInWatchlist ? 'fa-bookmark' : 'fa-bookmark'}"></i>
                                ${isInWatchlist ? 'Удалить из списка' : 'Хочу посмотреть'}
                            </button>
                        </div>
                        <p class="detail-overview">${movie.overview}</p>
                    </div>
                </div>

                <div class="movie-detail-body">
                    <div class="detail-section">
                        <h3>Актерский состав</h3>
                        <div class="cast-grid">
                            ${movie.cast.map(actor => `
                                <div class="cast-card">
                                    <img src="${actor.photo}" alt="${actor.name}" class="cast-photo">
                                    <div class="cast-name">${actor.name}</div>
                                    <div class="cast-character">${actor.character}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3>Информация о фильме</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;">
                            <div>
                                <strong>Режиссер:</strong> ${movie.director}
                            </div>
                            <div>
                                <strong>Год выхода:</strong> ${movie.year}
                            </div>
                            <div>
                                <strong>Продолжительность:</strong> ${movie.duration}
                            </div>
                            <div>
                                <strong>Рейтинг:</strong> ${movie.rating.toFixed(1)}/10
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        // Кнопка "Назад"
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Назад к списку фильмов';
        backButton.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('viewChange', {
                detail: { view: 'home' }
            }));
        });

        document.getElementById('main-content').insertBefore(backButton, document.querySelector('.movie-detail-container'));

        // Обработчики кнопок действий
        document.querySelectorAll('[data-action="toggleFavorite"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const movieId = parseInt(btn.dataset.id);
                const isFavorite = StorageManager.isFavorite(movieId);

                if (isFavorite) {
                    StorageManager.removeFromFavorites(movieId);
                    btn.innerHTML = '<i class="fas fa-heart"></i> В избранное';
                    if (btn.classList.contains('primary')) {
                        btn.classList.remove('primary');
                        btn.classList.add('secondary');
                    }
                } else {
                    StorageManager.addToFavorites(movieId);
                    btn.innerHTML = '<i class="fas fa-heart"></i> Удалить из избранного';
                    if (btn.classList.contains('secondary')) {
                        btn.classList.remove('secondary');
                        btn.classList.add('primary');
                    }
                }
            });
        });

        document.querySelectorAll('[data-action="toggleWatchlist"]').forEach(btn => {
            btn.addEventListener('click', () => {
                const movieId = parseInt(btn.dataset.id);
                const isInWatchlist = StorageManager.isInWatchlist(movieId);

                if (isInWatchlist) {
                    StorageManager.removeFromWatchlist(movieId);
                    btn.innerHTML = '<i class="fas fa-bookmark"></i> Хочу посмотреть';
                    if (btn.classList.contains('primary')) {
                        btn.classList.remove('primary');
                        btn.classList.add('secondary');
                    }
                } else {
                    StorageManager.addToWatchlist(movieId);
                    btn.innerHTML = '<i class="fas fa-bookmark"></i> Удалить из списка';
                    if (btn.classList.contains('secondary')) {
                        btn.classList.remove('secondary');
                        btn.classList.add('primary');
                    }
                }
            });
        });
    },

    getRatingClass(rating) {
        if (rating >= 8.0) return 'high';
        if (rating >= 6.0) return 'medium';
        return 'low';
    }
};
