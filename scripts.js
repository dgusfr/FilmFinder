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
      });
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
  }
}
