const apiKey = "P3RTS9G-2YH4XAV-QWKVWAZ-E9XFFDQ";
const apiUrl = "https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10";
// const apiUrl = "https://api.kinopoisk.dev/v1.4/mov?rating.imdb=8-10"; // заведомо некорректный URL
// const apiUrl = "https://api.kinopoisk.dev/v1.4/movie?rating.imdb=invalid"; // заведомо некорректный URL

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                "X-API-KEY": apiKey,
            },
        });

        // Проверяем статус ответа
        switch (response.status) {
            case 200:
                // Успешный запрос
                const data = await response.json();
                return data.docs; // Предполагается, что data.docs - это массив фильмов
            case 400:
                throw new Error("Ошибка 400: Неверный запрос.");
            case 401:
                throw new Error("Ошибка 401: Неавторизованный доступ.");
            case 403:
                throw new Error("Ошибка 403: Доступ запрещен.");
            case 404:
                throw new Error("Ошибка 404: Не найдено.");
            case 500:
                throw new Error("Ошибка 500: Внутренняя ошибка сервера.");
            case 502:
                throw new Error("Ошибка 502: Плохой шлюз.");
            case 503:
                throw new Error("Ошибка 503: Сервис недоступен.");
            default:
                throw new Error(`Неизвестная ошибка ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        showError(error.message);
        return []; // Возвращаем пустой массив, чтобы не нарушить работу рендеринга
    }
}

const placeholderImage = 'https://via.placeholder.com/150'; // Пример онлайн-заглушки

function renderMovies(movies) {
    const movieGrid = document.getElementById("movie-grid");
    movieGrid.innerHTML = ''; // Очистка предыдущих карточек
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie");
        const movieName = movie.name || movie.alternativeName || "Название не указано";
        movieCard.innerHTML = `
                <img src="${movie.poster?.previewUrl || placeholderImage}" alt="${movieName}">
                <h3 class="movie__name">${movieName}</h3>
            `;
        movieGrid.appendChild(movieCard);
    });
}

async function init() {
    const movies = await fetchMovies();
    if (movies.length > 0) {
        renderMovies(movies);
    } else {
        // Можно добавить сообщение о том, что фильмы не найдены или произошла ошибка
        console.log('Фильмы не найдены или произошла ошибка при получении данных.');
    }
}

init();

function validateForm() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (name.trim() === '') {
        alert('Пожалуйста, введите имя.');
        return false;
    }

    const phonePattern = /^\+7\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Введите корректный номер телефона в формате +7XXXXXXXXXX");
        return false;
    }

    alert("Форма успешно отправлена");
    return true;
}

document.getElementById("phone").addEventListener("input", (evt) => {
    let x = evt.target.value.replace(/\D/g, "");
    if (x.length > 0) {
        x = "+7" + x.substring(1, 11);
    }
    evt.target.value = x;
});