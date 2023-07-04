const API_KEY = "api_key=59a2cc2fa5db4670eabfee80c179fa9a";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `/discover/movie?sort_by=popularity.desc&${API_KEY}`;

async function getDiscover() {
  try {
    const response = await fetch(BASE_URL + API_URL);
    const responseDiscover = await response.json();
    return responseDiscover;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

function placeDiscover(movie) {
    if (!movie.backdrop_path) {
      return null;
    }
  
    // Split the movie title into words
    const words = movie.title.split(" ");
  
    // Check if the number of words is 4 or more
    const shouldReduceFontSize = words.length >= 4;
  
    // Apply the appropriate class based on the condition
    const titleClass = shouldReduceFontSize ? "discover__title reduced-font" : "discover__title";
  
    // Reduce font size by 70px for titles with 4 or more words
    const title = shouldReduceFontSize ? `<span style="font-size: 70px">${movie.title}</span>` : movie.title;
  
    return `
      <div class="swiper-slide">
        <img class="backDropimg" src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="">
        <div class="discover__wrapper--title">
          <h1 class="${titleClass}">${title}</h1>
          <p class="discover__title--releaseDate">${movie.release_date}</p>
          <p class="discover__title--para">${movie.overview}</p>
          <i class="fa-solid fa-play"><a class="discover__play" href="">Play</a></i>   
        </div>
      </div>`;
  }
  
  

async function populateDiscover() {
  try {
    const responseDiscover = await getDiscover();
    if (responseDiscover) {
      const movies = responseDiscover.results;
      const movieElements = movies.map(placeDiscover).join("");
      document.querySelector('.swiper-wrapper').innerHTML = movieElements;
    }
  } catch (error) {
    console.error("Error populating discover section:", error);
  }
}
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Swiper
  const swiper = new Swiper('.swiper-container', {
    speed: 1000,
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    zoom: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    mousewheel: {
      invert: true,
    },
    autoplay: {
      delay: 4000,
    },
    loop: true,

  });

  // Start the autoplay manually
  swiper.autoplay.start();

  // Populate the discover section
  populateDiscover();
});
