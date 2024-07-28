// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  // Função para manipulação do carrossel (placeholder)
  setupCarousel();

  // Função para manipulação da barra de pesquisa
  setupSearch();

  // Função para manipulação de interações (hover effects, etc.)
  setupInteractions();
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
      // Implementação futura: realizar a busca com a API e exibir os resultados
    }
  });
}

function setupInteractions() {
  console.log("Interactions setup initialized");
  // Placeholder para interações adicionais
  // Implementação será adicionada nos próximos dias
}
