
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
