// scripts.js

let currentPage = 1;
const itemsPerPage = 4; // Número de filmes favoritos por página

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

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

  // Configurar paginação
  setupPagination();

  // Carregar e exibir favoritos
  displayFavorites();
});

function setupPagination() {
  document.getElementById("prevPage").addEventListener("click", () => {
    currentPage--;
    displayFavorites();
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    displayFavorites();
  });
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.getElementById("favorites");
  const pageIndicator = document.getElementById("pageIndicator");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");

  favoritesContainer.innerHTML = "";
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedFavorites = favorites.slice(start, end);

  if (paginatedFavorites.length > 0) {
    paginatedFavorites.forEach((movieId) => {
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

  // Atualizar estado dos botões de paginação
  pageIndicator.textContent = `Página ${currentPage}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = end >= favorites.length;
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
