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

  setupMovieDetails();
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

function setupLoadMoreButton() {
  const loadMoreButton = document.getElementById("load-more-button");
  loadMoreButton.addEventListener("click", () => {
    currentPage++;
    loadPopularMovies(currentPage);
  });
}

function setupMovieDetails() {
  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", () => {
    document.getElementById("movie-details").classList.add("hidden");
    document.querySelector("main").classList.remove("hidden");
  });
}

function loadPopularMovies(page = 1) {
  const popularMoviesContainer = document.getElementById("popular-movies");

  // Exemplo de filmes populares por página
  const moviesPerPage = [
    [
      {
        imdbID: "tt0111161",
        Title: "The Shawshank Redemption",
        Poster:
          "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        Genre: "Drama, Crime",
      },
      {
        imdbID: "tt0468569",
        Title: "The Dark Knight",
        Poster:
          "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
        Genre: "Action, Crime, Drama",
      },
    ],
    [
      {
        imdbID: "tt0137523",
        Title: "Fight Club",
        Poster:
          "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
        Genre: "Drama",
      },
      {
        imdbID: "tt0120737",
        Title: "The Lord of the Rings: The Fellowship of the Ring",
        Poster:
          "https://image.tmdb.org/t/p/w500/56zTpe2xvaA4alU51sRWPoKPYZy.jpg",
        Genre: "Adventure, Fantasy, Action",
      },
    ],
    // Adicione mais páginas conforme necessário
  ];

  const movies = moviesPerPage[page - 1] || [];
  if (movies.length === 0) {
    const loadMoreButton = document.getElementById("load-more-button");
    loadMoreButton.style.display = "none";
    return;
  }

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

function loadMovieData(movieId) {
  const movie = {
    Title: "The Shawshank Redemption",
    Year: "1994",
    Rated: "R",
    Released: "14 Oct 1994",
    Runtime: "142 min",
    Genre: "Drama",
    Director: "Frank Darabont",
    Writer: "Stephen King, Frank Darabont",
    Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Language: "English",
    Country: "USA",
    Awards: "Nominated for 7 Oscars. Another 21 wins & 36 nominations total.",
    Poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    imdbRating: "9.3",
  };

  const movieDetailsSection = document.getElementById("movie-details");
  const movieInfoDiv = document.getElementById("movie-info");

  movieInfoDiv.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title} (${movie.Year})</h3>
      <p><strong>Rating:</strong> ${movie.imdbRating}</p>
      <p><strong>Runtime:</strong> ${movie.Runtime}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>Director:</strong> ${movie.Director}</p>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
  `;

  document.querySelector("main").classList.add("hidden");
  movieDetailsSection.classList.remove("hidden");
}
