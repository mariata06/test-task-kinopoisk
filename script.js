const apiKey = "P3RTS9G-2YH4XAV-QWKVWAZ-E9XFFDQ";
const apiUrl = "https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10";

async function fetchMovies() {
    const response = await fetch(apiUrl, {
        headers: {
        "X-API-KEY": apiKey,
        },
    });
    const data = await response.json();
    return data.docs;
}

function renderMovies(movies) {
    const movieGrid = document.getElementById("movie-grid");
    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie");
        const movieName = movie.name || movie.alternativeName || "Название не указано";
        movieCard.innerHTML = `
                <img src="${movie.poster.previewUrl}" alt="${movie.name}">
                <h3 class="movie__name">${movieName}</h3>
            `;
        movieGrid.appendChild(movieCard);
    });
}

async function init() {
    const movies = await fetchMovies();
    renderMovies(movies);
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
