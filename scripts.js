let currentPage = 1; // Página atual para a funcionalidade "Ver Mais"

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

  // Configurar paginação
  setupPagination();

  // Carregar e exibir favoritos
  displayFavorites();

  // Configurar filtro por gênero
  setupGenreFilter();

  // Configurar botão de "Ver Mais"
  setupLoadMoreButton();
});

function setupGenreFilter() {
  const genreSelect = document.getElementById("genres");
  genreSelect.addEventListener("change", () => {
    const selectedGenre = genreSelect.value;
    filterMoviesByGenre(selectedGenre);
  });
}

function filterMoviesByGenre(genre) {
  const movieItems = document.querySelectorAll(".movie-item");
  movieItems.forEach((item) => {
    const movieGenres = item.getAttribute("data-genres").split(", ");
    if (genre === "all" || movieGenres.includes(genre)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function loadPopularMovies() {
  // Substitua essa parte com a lógica para carregar filmes populares,
  // e adicione o atributo data-genres com os gêneros do filme
  const popularMoviesContainer = document.getElementById("popular-movies");

  // Exemplo de filmes populares
  const movies = [
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      Genre: "Drama, Crime",
    },
    {
      imdbID: "tt0468569",
      Title: "The Dark Knight",
      Poster: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
      Genre: "Action, Crime, Drama",
    },
  ];

  popularMoviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie-item";
    movieElement.setAttribute("data-genres", movie.Genre);
    movieElement.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
      `;
    movieElement.addEventListener("click", () => {
      loadMovieData(movie.imdbID);
    });
    popularMoviesContainer.appendChild(movieElement);
  });
}
