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

  // Carregar e exibir favoritos
  displayFavorites();
});

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.getElementById("favorites");
  favoritesContainer.innerHTML = "";

  if (favorites.length > 0) {
    favorites.forEach((movieId) => {
      fetchMovieData(movieId, (movie) => {
        const movieElement = document.createElement("div");
        movieElement.className = "favorite-item";
        movieElement.innerHTML = `
                  <img src="${movie.Poster}" alt="${movie.Title}">
                  <h3>${movie.Title}</h3>
              `;
        movieElement.addEventListener("click", () => {
          loadMovieData(movie.imdbID);
        });
        favoritesContainer.appendChild(movieElement);
      });
    });
  } else {
    favoritesContainer.innerHTML = "<p>No favorite movies found.</p>";
  }
}

function fetchMovieData(movieId, callback) {
  const apiKey = "your_api_key_here"; // Substitua pela sua chave de API OMDb
  const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
}
