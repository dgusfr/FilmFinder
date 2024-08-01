

document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");

  setupCarousel();

  setupSearch();

  setupInteractions();
});

function setupCarousel() {
  console.log("Carousel setup initialized");

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
