document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  // Função para manipulação do carrossel (placeholder)
  setupCarousel();

  // Função para manipulação da barra de pesquisa
  setupSearch();

  // Função para manipulação de interações (hover effects, etc.)
  setupInteractions();

  loadMovieData("tt0111161"); // Exemplo de ID de filme

  loadPopularMovies();
});

function setupCarousel() {
  console.log("Carousel setup initialized");
}

function setupSearch() {
  console.log("Search setup initialized");

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
      performSearch(query);
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });
}

function setupInteractions() {
  console.log("Interactions setup initialized");

function loadMovieData(movieId) {
  const apiKey = "your_api_key_here"; // Substitua pela sua chave de API OMDb
  const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMovieData(data);
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
}

function displayMovieData(movie) {
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

function performSearch(query) {
  const apiKey = "your_api_key_here"; // Substitua pela sua chave de API OMDb
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displaySearchResults(data.Search);
    })
    .catch((error) => {
      console.error("Error fetching search results:", error);
    });
}

function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = "";

  if (results) {
    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.className = "result";
      resultElement.innerHTML = `
              <img src="${result.Poster}" alt="${result.Title}">
              <h3>${result.Title} (${result.Year})</h3>
          `;
      resultElement.addEventListener("click", () => {
        loadMovieData(result.imdbID);
        // Limpar os resultados da busca após clicar
        searchResultsContainer.innerHTML = "";
        document.getElementById("search-input").value = "";
      });
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

function loadPopularMovies() {
  const apiKey = "your_api_key_here"; // Substitua pela sua chave de API OMDb
  const url = `https://www.omdbapi.com/?s=popular&type=movie&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayCarousel(data.Search);
    })
    .catch((error) => {
      console.error("Error fetching popular movies:", error);
    });
}

function displayCarousel(movies) {
  const carouselContainer = document.getElementById("carousel-container");
  carouselContainer.innerHTML = "";

  if (movies) {
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.className = "carousel-item";
      movieElement.innerHTML = `
              <img src="${movie.Poster}" alt="${movie.Title}">
          `;
      movieElement.addEventListener("click", () => {
        loadMovieData(movie.imdbID);
      });
      carouselContainer.appendChild(movieElement);
    });
  } else {
    carouselContainer.innerHTML = "<p>No popular movies found.</p>";
  }
}
