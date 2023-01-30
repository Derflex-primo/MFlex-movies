// https://www.omdbapi.com/?apikey=7093b65d&s=
// https://api.themoviedb.org/3/movie/550?api_key=59a2cc2fa5db4670eabfee80c179fa9a
// https://api.themoviedb.org/3/trending/all/day?api_key=59a2cc2fa5db4670eabfee80c179fa9a
// https://api.themoviedb.org/3/discover/movie?api_key=59a2cc2fa5db4670eabfee80c179fa9a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate

const movieListEl = document.querySelector(".movies");
 


async function main() {
    const movies = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=59a2cc2fa5db4670eabfee80c179fa9a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate")
    const moviesData = await movies.json();
    console.log(moviesData)
    movieListEl.innerHTML = moviesData.results.map(movie => moviesTrend(movie)).join("");
       
}

main()
function moviesTrend(movie) {
    return `<div class="movie"> 
    <figure class="movies__wrapper">
      <img class="movie__img" src="https://www.themoviedb.org/t/p/w500${movie.poster_path}" alt="">
    </figure>
    <div class="movie__description"> 
     <h4 class="movie__title">
     ${movie.original_title}
     </h4>
     <h4 class="movie__year" class="text-color1">${movie.vote_average}</h4>
    </div>
    <div class="movie__description2">
        <h4 class="movie__statss">
        ${movie.original_language}
        </h4>
        <h4 class="movie__stats"><i class="fa-solid fa-thumbs-up"></i> ${movie.popularity}</h4> 
    </div>
 </div> `
}





















 