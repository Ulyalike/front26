// Моковые данные о фильмах для имитации API

const MockAPI = {
    // Получение популярных фильмов
    getPopularMovies() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.movies);
            }, 500); // Имитация задержки сети
        });
    },

    // Поиск фильмов
    searchMovies(query) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const filteredMovies = this.movies.filter(movie =>
                    movie.title.toLowerCase().includes(query.toLowerCase()) ||
                    movie.overview.toLowerCase().includes(query.toLowerCase())
                );
                resolve(filteredMovies);
            }, 300);
        });
    },

    // Получение детальной информации о фильме
    getMovieDetails(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const movie = this.movies.find(m => m.id === parseInt(id));
                if (movie) {
                    resolve(movie);
                } else {
                    reject(new Error('Фильм не найден'));
                }
            }, 200);
        });
    },

    // Массив фильмов
    movies: [
        {
            id: 1,
            title: "Интерстеллар",
            year: 2014,
            rating: 8.6,
            poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            overview: "Фантастический эпос о путешествии группы исследователей, которые используют недавно обнаруженный пространственно-временной тоннель, чтобы обойти ограничения космических путешествий человека и покорить огромные расстояния на межзвёздном корабле.",
            genres: ["Фантастика", "Драма", "Приключения"],
            duration: "169 мин",
            director: "Кристофер Нолан",
            cast: [
                { name: "Мэттью Макконахи", character: "Купер", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Энн Хэтэуэй", character: "Амелия Брэнд", photo: "https://images.unsplash.com/photo-1494790108755-2616b786d4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Джессика Честейн", character: "Мёрф", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Майкл Кейн", character: "Профессор Брэнд", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
            ]
        },
        {
            id: 2,
            title: "Паразиты",
            year: 2019,
            rating: 8.6,
            poster: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            overview: "Бедная корейская семья вступает в сложные отношения с богатой семьей, для которой они работают. Фильм исследует тему социального неравенства.",
            genres: ["Драма", "Комедия", "Триллер"],
            duration: "132 мин",
            director: "Пон Джун Хо",
            cast: [
                { name: "Сон Кан Хо", character: "Ким Ки Тэк", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Ли Сон Гюн", character: "Пак Дон Ик", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Чо Ё Чон", character: "Чхве Ён Гё", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
            ]
        },
        {
            id: 3,
            title: "Властелин колец: Возвращение короля",
            year: 2003,
            rating: 9.0,
            poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            overview: "Завершение эпической трилогии о Средиземье, где хоббит Фродо пытается уничтожить Кольцо Всевластия, в то время как Арагорн готовится к последней битве за Минас-Тирит.",
            genres: ["Фэнтези", "Приключения", "Драма"],
            duration: "201 мин",
            director: "Питер Джексон",
            cast: [
                { name: "Элайджа Вуд", character: "Фродо Бэггинс", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Вигго Мортенсен", character: "Арагорн", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Иэн Маккеллен", character: "Гэндальф", photo: "https://images.unsplash.com/photo-1548372295-8e7d71c5b48f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
            ]
        },
        {
            id: 4,
            title: "Крестный отец",
            year: 1972,
            rating: 9.2,
            poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            overview: "Эпическая история криминальной семьи Корлеоне, сосредоточенная на переходе власти от отца к младшему сыну.",
            genres: ["Криминал", "Драма"],
            duration: "175 мин",
            director: "Фрэнсис Форд Коппола",
            cast: [
                { name: "Марлон Брандо", character: "Вито Корлеоне", photo: "https://images.unsplash.com/photo-1548372295-8e7d71c5b48f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Аль Пачино", character: "Майкл Корлеоне", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
                { name: "Джеймс Каан", character: "Сонни Корлеоне", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
            ]
        },
        {
            id: 5,
            title: "Начало",
            year: 2010,
            rating: 8.8,
            poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            overview: "Вор, специализирующийся на краже идей путем проникновения в подсознание, получает задание внедрить идею в сознание
