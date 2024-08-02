// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  setupCarousel();

  setupSearch();

  setupInteractions();

  // Carregar dados do filme
  loadMovieData("tt0111161");
});

function setupCarousel() {
  console.log("Carousel setup initialized");
  // Placeholder para configuração do carrossel
  // Implementação será adicionada nos próximos dias
}

function setupSearch() {
  console.log("Search setup initialized");

  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
      alert(`You searched for: ${query}`);
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
}

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
