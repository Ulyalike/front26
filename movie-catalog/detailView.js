// Вью детальной страницы фильма

const DetailView = {
    render(movieId) {
        return `
            <div class="loader-container" id="detail-loader">
                <div class="loader"></div>
                <p>Загрузка информации о фильме...</p>
            </div>
        `;
    },

    afterRender(movieId) {
        // Загружаем данные фильма
        MockAPI.getMovieDetails(movieId)
            .then(movie => {
                const mainContent = document.getElementById('main-content');
                mainContent.innerHTML = MovieDetailComponent.render(movie);
                MovieDetailComponent.afterRender();
            })
            .catch(error => {
                document.getElementById('main-content').innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Фильм не найден</h3>
                        <p>К сожалению, мы не смогли найти запрашиваемый фильм.</p>
                        <button class="detail-btn primary" id="go-home-btn">
                            <i class="fas fa-home"></i> Вернуться на главную
                        </button>
                    </div>
                `;

                document.getElementById('go-home-btn').addEventListener('click', () => {
                    document.dispatchEvent(new CustomEvent('viewChange', {
                        detail: { view: 'home' }
                    }));
                });
            });
    }
};