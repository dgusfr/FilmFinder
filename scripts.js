document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("search-bar");
  const searchButton = document.getElementById("search-button");
  const carousel = document.getElementById("carousel");
  const movieDetails = document.getElementById("movie-details");
  const favoritesContainer = document.getElementById("favorites-container");
  const watchLaterContainer = document.getElementById("watch-later-container");
  const historyList = document.getElementById("history-list");
  const comparisonContainer = document.getElementById("comparison-container");
  const movieData = [];
  const favorites = [];
  const watchLater = [];
  const searchHistory = [];

  searchButton.addEventListener("click", function () {
    const query = searchBar.value.trim();
    if (query) {
      searchMovies(query);
      addToSearchHistory(query);
    }
  });

  function searchMovies(query) {
    carousel.innerHTML = "";
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((movie) => {
          const movieElement = createMovieElement(movie);
          carousel.appendChild(movieElement);
          movieData.push(movie);
        });
      });
  }

  function createMovieElement(movie) {
    const movieElement = document.createElement("div");
    movieElement.classList.add("carousel-item");
    movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
      `;
    movieElement.addEventListener("click", () => showMovieDetails(movie));
    return movieElement;
  }

  function showMovieDetails(movie) {
    movieDetails.classList.remove("hidden");
    movieDetails.querySelector("h2").textContent = movie.title;
    movieDetails.querySelector(
      "#movie-poster"
    ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieDetails.querySelector("#movie-description").textContent =
      movie.overview;
    document.getElementById("favorite-button").onclick = () =>
      addToFavorites(movie);
    document.getElementById("watch-later-button").onclick = () =>
      addToWatchLater(movie);
  }

  function addToFavorites(movie) {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      favorites.push(movie);
      updateFavoritesList();
    }
  }

  function addToWatchLater(movie) {
    if (!watchLater.some((watch) => watch.id === movie.id)) {
      watchLater.push(movie);
      updateWatchLaterList();
    }
  }

  function updateFavoritesList() {
    favoritesContainer.innerHTML = "";
    favorites.forEach((movie) => {
      const movieElement = createMovieElement(movie);
      favoritesContainer.appendChild(movieElement);
    });
  }

  function updateWatchLaterList() {
    watchLaterContainer.innerHTML = "";
    watchLater.forEach((movie) => {
      const movieElement = createMovieElement(movie);
      watchLaterContainer.appendChild(movieElement);
    });
  }

  function addToSearchHistory(query) {
    if (!searchHistory.includes(query)) {
      searchHistory.push(query);
      const historyItem = document.createElement("li");
      historyItem.textContent = query;
      historyItem.addEventListener("click", () => searchMovies(query));
      historyList.appendChild(historyItem);
    }
  }

  document.getElementById("prev-button").addEventListener("click", function () {
    carousel.scrollBy({ left: -200, behavior: "smooth" });
  });

  document.getElementById("next-button").addEventListener("click", function () {
    carousel.scrollBy({ left: 200, behavior: "smooth" });
  });

  const starRating = document.getElementById("star-rating");
  starRating.addEventListener("click", function (e) {
    if (e.target.classList.contains("star")) {
      const rating = e.target.dataset.value;
      starRating.querySelectorAll(".star").forEach((star) => {
        star.classList.toggle("selected", star.dataset.value <= rating);
      });
    }
  });

  document
    .getElementById("share-button")
    .addEventListener("click", function () {
      navigator
        .share({
          title: document.querySelector("#movie-details h2").textContent,
          text: "Veja este filme incrível!",
          url: window.location.href,
        })
        .catch(console.error);
    });
});
