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

  setupSharing();

  setupRecommendations();

  setupUserRating();

  setupNotifications();

  setupActorSearch();
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

function setupRecommendations() {
  const recommendedMoviesContainer =
    document.getElementById("recommended-movies");
  const recommendationsSection = document.getElementById("recommendations");

  const favoriteMovies =
    JSON.parse(localStorage.getItem("favoriteMovies")) || [];

  if (favoriteMovies.length === 0) {
    recommendationsSection.classList.add("hidden");
    return;
  }
  const recommendedMovies = getRecommendations(favoriteMovies);

  recommendedMovies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.className = "movie-item";
    movieElement.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
      `;
    movieElement.addEventListener("click", () => {
      loadMovieData(movie.imdbID);
    });
    recommendedMoviesContainer.appendChild(movieElement);
  });

  recommendationsSection.classList.remove("hidden");
}

function getRecommendations(favoriteMovies) {
  const allMovies = [
    {
      imdbID: "tt0109830",
      Title: "Forrest Gump",
      Poster: "https://image.tmdb.org/t/p/w500/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg",
      Genre: "Drama, Romance",
    },
    {
      imdbID: "tt0317248",
      Title: "City of God",
      Poster: "https://image.tmdb.org/t/p/w500/4nWnHqndkzA9USOwa6WN4cjsGMk.jpg",
      Genre: "Drama, Crime",
    },
    {
      imdbID: "tt6751668",
      Title: "Parasite",
      Poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      Genre: "Drama, Thriller",
    },
  ];

  return allMovies.filter(
    (movie) => !favoriteMovies.some((fav) => fav.imdbID === movie.imdbID)
  );
}
function setupUserRating() {
  const stars = document.querySelectorAll("#stars .star");
  const ratingMessage = document.getElementById("user-rating-message");
  let userRating = 0;

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      userRating = star.getAttribute("data-value");
      saveUserRating(userRating);
      updateStarSelection(userRating);
      ratingMessage.textContent = `Você avaliou este filme com ${userRating} estrelas.`;
    });

    star.addEventListener("mouseover", () => {
      updateStarSelection(star.getAttribute("data-value"));
    });

    star.addEventListener("mouseout", () => {
      updateStarSelection(userRating);
    });
  });
}

function updateStarSelection(rating) {
  const stars = document.querySelectorAll("#stars .star");
  stars.forEach((star) => {
    star.classList.remove("selected");
    if (star.getAttribute("data-value") <= rating) {
      star.classList.add("selected");
    }
  });
}

function saveUserRating(rating) {
  const movieId = document.querySelector("#movie-info h3").textContent;
  const ratings = JSON.parse(localStorage.getItem("userRatings")) || {};
  ratings[movieId] = rating;
  localStorage.setItem("userRatings", JSON.stringify(ratings));
  showNotification("Sua avaliação foi salva!");
}

function loadUserRating(movieId) {
  const ratings = JSON.parse(localStorage.getItem("userRatings")) || {};
  return ratings[movieId] || 0;
}

function setupNotifications() {
  const notification = document.getElementById("notification");

  document.addEventListener("showNotification", (e) => {
    notification.textContent = e.detail.message;
    notification.classList.remove("hidden");
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
      notification.classList.add("hidden");
    }, 3000);
  });
}

function showNotification(message) {
  const event = new CustomEvent("showNotification", { detail: { message } });
  document.dispatchEvent(event);
}

function toggleFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  if (favorites.includes(movieId)) {
    favorites = favorites.filter((id) => id !== movieId);
    showNotification("Filme removido dos favoritos.");
  } else {
    favorites.push(movieId);
    showNotification("Filme adicionado aos favoritos!");
  }
  localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  updateFavoriteButton(movieId);
}

function setupActorSearch() {
  const searchInput = document.getElementById("search-input");
  const actorMoviesContainer = document.getElementById("actor-movies");
  const actorSearchSection = document.getElementById("actor-search");
  const actorNameElement = document.getElementById("actor-name");

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        searchByActor(query);
      }
    }
  });

  function searchByActor(actorName) {
    actorNameElement.textContent = actorName;
    actorMoviesContainer.innerHTML = "";
    const movies = [
      {
        imdbID: "tt1375666",
        Title: "Inception",
        Poster:
          "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
        Actors: "Leonardo DiCaprio",
      },
      {
        imdbID: "tt0816692",
        Title: "Interstellar",
        Poster:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        Actors: "Matthew McConaughey",
      },
      {
        imdbID: "tt0111161",
        Title: "The Shawshank Redemption",
        Poster:
          "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        Actors: "Morgan Freeman",
      },
    ];

    const actorMovies = movies.filter((movie) =>
      movie.Actors.includes(actorName)
    );

    if (actorMovies.length > 0) {
      actorMovies.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.className = "movie-item";
        movieElement.innerHTML = `
              <img src="${movie.Poster}" alt="${movie.Title}">
              <h3>${movie.Title}</h3>
          `;
        movieElement.addEventListener("click", () => {
          loadMovieData(movie.imdbID);
        });
        actorMoviesContainer.appendChild(movieElement);
      });
      actorSearchSection.classList.remove("hidden");
    } else {
      actorSearchSection.classList.add("hidden");
      showNotification("Nenhum filme encontrado para o ator pesquisado.");
    }
  }
}

function setupMovieComparison() {
  const comparisonContainer = document.getElementById("comparison-container");
  const comparisonSection = document.getElementById("movie-comparison");
  let selectedMovies = [];

  document.addEventListener("selectMovieForComparison", (e) => {
    const movieData = e.detail.movieData;
    if (selectedMovies.length < 2) {
      selectedMovies.push(movieData);
      updateComparisonUI();
    } else {
      showNotification("Você só pode comparar dois filmes por vez.");
    }
  });

  function updateComparisonUI() {
    if (selectedMovies.length === 2) {
      selectedMovies.forEach((movie, index) => {
        const movieContainer = comparisonContainer.querySelector(
          `#movie-${index + 1}`
        );
        movieContainer.innerHTML = `
              <h3>${movie.Title}</h3>
              <img src="${movie.Poster}" alt="${movie.Title}">
              <p><strong>Avaliação:</strong> ${movie.imdbRating}</p>
              <p><strong>Gênero:</strong> ${movie.Genre}</p>
              <p><strong>Duração:</strong> ${movie.Runtime}</p>
          `;
      });
      comparisonSection.classList.remove("hidden");
    }
  }
}
