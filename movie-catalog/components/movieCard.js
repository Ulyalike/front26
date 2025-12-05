// Компонент карточки фильма

const MovieCardComponent = {
    render(movie) {
        const isFavorite = StorageManager.isFavorite(movie.id);
        const isInWatchlist = StorageManager.isInWatchlist(movie.id);

        const ratingClass = this.getRatingClass(movie.rating);

        return `
            <div class="movie-card" data-id="${movie.id}">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span class="movie-year">${movie.year}</span>
                        <span class="movie-rating ${ratingClass}">${movie.rating.toFixed(1)}</span>
                    </div>
                    <p class="movie-description">${movie.overview}</p>
                    <div class="movie-actions">
                        <button class="action-btn-small favorite-btn ${isFavorite ? 'active' : ''}"
                                data-action="toggleFavorite" data-id="${movie.id}">
                            <i class="fas ${isFavorite ? 'fa-heart' : 'fa-heart'}"></i>
                            ${isFavorite ? 'В избранном' : 'В избранное'}
                        </button>
                        <button class="action-btn-small watchlist-btn ${isInWatchlist ? 'active' : ''}"
                                data-action="toggleWatchlist" data-id="${movie.id}">
                            <i class="fas ${isInWatchlist ? 'fa-bookmark' : 'fa-bookmark'}"></i>
                            ${isInWatchlist ? 'Буду смотреть' : 'Хочу посмотреть'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    afterRender() {
        // Обработчики для кнопок действий
        document.querySelectorAll('[data-action="toggleFavorite"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const movieId = parseInt(btn.dataset.id);
                const isFavorite = StorageManager.isFavorite(movieId);

                if (isFavorite) {
                    StorageManager.removeFromFavorites(movieId);
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i> В избранное';
                } else {
                    StorageManager.addToFavorites(movieId);
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-heart"></i> В избранном';
                }
            });
        });

        document.querySelectorAll('[data-action="toggleWatchlist"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const movieId = parseInt(btn.dataset.id);
                const isInWatchlist = StorageManager.isInWatchlist(movieId);

                if (isInWatchlist) {
                    StorageManager.removeFromWatchlist(movieId);
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-bookmark"></i> Хочу посмотреть';
                } else {
                    StorageManager.addToWatchlist(movieId);
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-bookmark"></i> Буду смотреть';
                }
            });
        });

        // Обработчики клика по карточке для перехода к деталям
        document.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.action-btn-small')) {
                    const movieId = card.dataset.id;
                    document.dispatchEvent(new CustomEvent('viewChange', {
                        detail: { view: 'detail', movieId }
                    }));
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