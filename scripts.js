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
