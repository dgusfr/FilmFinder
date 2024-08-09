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
});

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
                  <button class="remove-favorite" data-id="${movie.imdbID}">Remover</button>
              `;
        movieElement.addEventListener("click", () => {
          loadMovieData(movie.imdbID);
        });
        favoritesContainer.appendChild(movieElement);
      });
    });

    document.querySelectorAll(".remove-favorite").forEach((button) => {
      button.addEventListener("click", (event) => {
        const movieId = event.target.getAttribute("data-id");
        removeFavorite(movieId);
      });
    });
  } else {
    favoritesContainer.innerHTML = "<p>No favorite movies found.</p>";
  }

  pageIndicator.textContent = `Página ${currentPage}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = end >= favorites.length;
}

function removeFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((id) => id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

function fetchMovieData(movieId, callback) {
  const apiKey = "your_api_key_here";
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

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function addFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showNotification("Filme adicionado aos favoritos!");
  }
}
