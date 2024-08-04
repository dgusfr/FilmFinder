
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
}

function loadMovieData(movieId) {
  const apiKey = "your_api_key_here";
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
  ).src = `https://www.youtube.com/embed/${movie.trailer}`;
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
      });
      searchResultsContainer.appendChild(resultElement);
    });
  } else {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
  }
}
