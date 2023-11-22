 


(function () {
  let API_KEY = "api_key=59a2cc2fa5db4670eabfee80c179fa9a";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = `/discover/movie?sort_by=popularity.desc&${API_KEY}`;
  const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}`;
  const movieListEl = document.querySelector(".movies");
  const movieContainerEl = document.querySelector(".movie-container");

  const form = document.querySelector(".form");
  const search = document.querySelector("#search");
  const fa = document.querySelector(".fa");

  async function fetchMovies(url) {
    const response = await fetch(url);
    const moviesData = await response.json();
    console.log(moviesData);
    movieListEl.innerHTML = moviesData.results
      .map((movie) => moviesTrend(movie))
      .filter((movieHTML) => movieHTML !== null) // Filter out movies with null value
      .join("");
  }

  const searchIcon = document.querySelector(".fa");
  searchIcon.addEventListener("click", () => {
    form.dispatchEvent(new Event("submit"));
    scrollToSection();
  });

  async function main() {
    await fetchMovies(BASE_URL + API_URL);
  }

  main();

  function moviesTrend(movie) {
    if (!movie.poster_path) {
      return null; // Skip movies without a poster image
    }

    return `
      <div class="movie"> 
        <figure class="movies__wrapper">
          <img class="movie__img" src="https://www.themoviedb.org/t/p/w500${movie.poster_path}" alt="">
        </figure>
        <div class="movie__description"> 
          <h4 class="movie__title">
            ${movie.original_title}
          </h4>
          <h4 class="movie__year text-color1">${movie.vote_average}</h4>
        </div>
        <div class="movie__description2">
          <h4 class="movie__statss">
            ${movie.original_language}
          </h4>
          <h4 class="movie__stats"><i class="fa-solid fa-thumbs-up"></i> ${movie.popularity}</h4> 
        </div>
      </div>`;
  }

  // Search

  const clearInput = () => {
    search.value = "";
  };

  const clearBtn = document.getElementById("clear-btn");
  clearBtn.addEventListener("click", clearInput);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
      const searchUrl = `${SEARCH_URL}&query=${searchTerm}`;
      await fetchMovies(searchUrl);
      clearInput();
      scrollToSection();
    }
  });

  function scrollToSection() {
    movieContainerEl.scrollIntoView({
      behavior: "smooth",
    });
  }
})();

 