let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  setupCarousel();

  setupSearch();

  setupInteractions();

  loadMovieData("tt0111161");

  loadPopularMovies();

  setupFavorites();

  setupPagination();

  displayFavorites();

  setupGenreFilter();

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

function setupSharing() {
  const shareButton = document.getElementById("share-button");
  const copyLinkButton = document.getElementById("copy-link-button");
  const movieInfoDiv = document.getElementById("movie-info");

  shareButton.addEventListener("click", () => {
    if (navigator.share) {
      navigator
        .share({
          title: movieInfoDiv.querySelector("h3").innerText,
          text: "Confira este filme no FilmFinder!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Compartilhamento não suportado neste navegador.");
    }
  });

  copyLinkButton.addEventListener("click", () => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copiado para a área de transferência!");
      })
      .catch((error) => console.log("Error copying link:", error));
  });
}
