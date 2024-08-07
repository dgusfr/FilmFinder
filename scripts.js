// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  // Função para manipulação do carrossel
  setupCarousel();

  // Função para manipulação da barra de pesquisa
  setupSearch();

  // Função para manipulação de interações (hover effects, etc.)
  setupInteractions();

  // Carregar dados do filme
  loadMovieData("tt0111161"); // Exemplo de ID de filme

  // Carregar filmes populares
  loadPopularMovies();

  // Configurar favoritos
  setupFavorites();
});

function setupFavorites() {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("favorite-btn")) {
      const movieId = event.target.getAttribute("data-movie-id");
      toggleFavorite(movieId, event.target);
    }
  });

  loadFavorites();
}

function toggleFavorite(movieId, element) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.includes(movieId)) {
    favorites = favorites.filter((id) => id !== movieId);
    element.classList.remove("favorited");
  } else {
    favorites.push(movieId);
    element.classList.add("favorited");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    const movieId = button.getAttribute("data-movie-id");
    if (favorites.includes(movieId)) {
      button.classList.add("favorited");
    }
  });
}

// Atualize a função displayMovieData para incluir o botão de favoritos
function displayMovieData(movie) {
  const favoriteButton = document.querySelector(".details .favorite-btn");
  favoriteButton.setAttribute("data-movie-id", movie.imdbID);
  loadFavorites(); // Atualize o estado do botão de favoritos

  document.querySelector(".poster img").src = movie.Poster;
  document.querySelector(".details h1").innerText = movie.Title;
  document.querySelector(
    ".details p:nth-of-type(1)"
  ).innerText = `Rating: ${movie.imdbRating}/10`;
  document.querySelector(
    ".details p:nth-of-type(2)"
  ).innerText = `Release Date: ${movie.Released}`;
  document.querySelector(
    ".details p:nth-of-type(3)"
  ).innerText = `Duration: ${movie.Runtime}`;
  document.querySelector(
    ".details p:nth-of-type(4)"
  ).innerText = `Genre: ${movie.Genre}`;
  document.querySelector(".details p:nth-of-type(5)").innerText = movie.Plot;
  document.querySelector(".details ul").innerHTML = movie.Actors.split(", ")
    .map((actor) => `<li>${actor}</li>`)
    .join("");
  document.querySelector(
    ".details iframe"
  ).src = `https://www.youtube.com/embed/${movie.trailer}`; // Ajuste conforme necessário
}

function displayCarousel(movies) {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = "";

  if (movies) {
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.className = "carousel-item";
      movieElement.innerHTML = `
              <img src="${movie.Poster}" alt="${movie.Title}">
              <button class="favorite-btn" data-movie-id="${movie.imdbID}">❤️</button>
          `;
      movieElement.addEventListener("click", () => {
        loadMovieData(movie.imdbID);
      });
      carousel.appendChild(movieElement);
    });

    loadFavorites(); // Atualize o estado dos botões de favoritos no carrossel
  } else {
    carousel.innerHTML = "<p>No popular movies found.</p>";
  }
}
