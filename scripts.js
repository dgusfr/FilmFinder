// scripts.js

// Função para exibir uma notificação
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.add("show");

  // Remover a notificação após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Modificar as funções de adicionar e remover favoritos para incluir notificações
function addFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showNotification("Filme adicionado aos favoritos!");
  }
}

function removeFavorite(movieId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((id) => id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  showNotification("Filme removido dos favoritos!");
  displayFavorites();
}
