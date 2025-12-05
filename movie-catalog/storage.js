// Модуль для работы с localStorage (имитация Redux состояния)

const StorageManager = {
    // Ключи для localStorage
    KEYS: {
        FAVORITES: 'filmflow_favorites',
        WATCHLIST: 'filmflow_watchlist'
    },

    // Инициализация состояния
    init() {
        // Проверяем, есть ли данные в localStorage, если нет - инициализируем
        if (!this.getFavorites()) {
            this.setFavorites([]);
        }

        if (!this.getWatchlist()) {
            this.setWatchlist([]);
        }

        console.log('StorageManager инициализирован');
    },

    // Получение избранных фильмов
    getFavorites() {
        const favorites = localStorage.getItem(this.KEYS.FAVORITES);
        return favorites ? JSON.parse(favorites) : [];
    },

    // Сохранение избранных фильмов
    setFavorites(favorites) {
        localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favorites));
        this.dispatchEvent('favoritesUpdated', favorites);
    },

    // Добавление фильма в избранное
    addToFavorites(movieId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(movieId)) {
            favorites.push(movieId);
            this.setFavorites(favorites);
            return true;
        }
        return false;
    },

    // Удаление фильма из избранного
    removeFromFavorites(movieId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(movieId);
        if (index !== -1) {
            favorites.splice(index, 1);
            this.setFavorites(favorites);
            return true;
        }
        return false;
    },

    // Проверка, находится ли фильм в избранном
    isFavorite(movieId) {
        const favorites = this.getFavorites();
        return favorites.includes(movieId);
    },

    // Получение списка "Хочу посмотреть"
    getWatchlist() {
        const watchlist = localStorage.getItem(this.KEYS.WATCHLIST);
        return watchlist ? JSON.parse(watchlist) : [];
    },

    // Сохранение списка "Хочу посмотреть"
    setWatchlist(watchlist) {
        localStorage.setItem(this.KEYS.WATCHLIST, JSON.stringify(watchlist));
        this.dispatchEvent('watchlistUpdated', watchlist);
    },

    // Добавление фильма в "Хочу посмотреть"
    addToWatchlist(movieId) {
        const watchlist = this.getWatchlist();
        if (!watchlist.includes(movieId)) {
            watchlist.push(movieId);
            this.setWatchlist(watchlist);
            return true;
        }
        return false;
    },

    // Удаление фильма из "Хочу посмотреть"
    removeFromWatchlist(movieId) {
        const watchlist = this.getWatchlist();
        const index = watchlist.indexOf(movieId);
        if (index !== -1) {
            watchlist.splice(index, 1);
            this.setWatchlist(watchlist);
            return true;
        }
        return false;
    },

    // Проверка, находится ли фильм в "Хочу посмотреть"
    isInWatchlist(movieId) {
        const watchlist = this.getWatchlist();
        return watchlist.includes(movieId);
    },

    // Система событий для имитации Redux
    events: {},

    // Подписка на события
    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },

    // Отправка события
    dispatchEvent(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
};

// Инициализируем при загрузке
document.addEventListener('DOMContentLoaded', () => {
    StorageManager.init();
});