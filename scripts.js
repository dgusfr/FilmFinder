document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  // Função para manipulação do carrossel (placeholder)
  setupCarousel();

  // Função para manipulação da barra de pesquisa
  setupSearch();

  // Função para manipulação de interações (hover effects, etc.)
  setupInteractions();

  // Carregar dados do filme
  loadMovieData("tt0111161"); // Exemplo de ID de filme
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
  // Placeholder para interações adicionais
  // Implementação será adicionada nos próximos dias
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
