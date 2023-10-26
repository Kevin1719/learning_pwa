const container = document.getElementById("root");
const moviename = document.getElementById("query");
const search = document.getElementsByClassName("btn")[0];
const spinner = document.getElementById("spinner");

// const url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
const API_KEY="f91017a8a042da0d3b251a9187da7f97"
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTEwMTdhOGEwNDJkYTBkM2IyNTFhOTE4N2RhN2Y5NyIsInN1YiI6IjY1MzRiYmM0YzhhNWFjMDBlMmI3MDQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmIpDTzM8iPA7irTZ1HjUs2fzT4tHweFnH_Bi777ws8'
  }
};

search.addEventListener('click', async () => {
  search.style.display = "none"; // Disable the search button
  spinner.style.display = "block"; // Show the spinner
  let output = "";
  if(moviename.value !== ""){
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${moviename.value}&api_key=${API_KEY}`, options)
    .then(res => {
      if(!res.ok){
        return [];
      }
      return res.json();
    })
      spinner.style.display = "none"; // Show the spinner
      search.style.display = "inline"; // Re-enable the search button
      data?.results.map((movie) =>
      (output += `
        <div class="col">
          <div class="card">
            <a class="card-media" href="https://image.tmdb.org/t/p/w500${movie?.poster_path}">
              <img src="https://image.tmdb.org/t/p/w500${movie?.poster_path}" alt="No image" width="100%" />
            </a>
            <div class="card-content">
              <div class="card-cont-header">
                <div class="cont-left">
                  <h3 style="font-weight: 600">${movie?.original_title}</h3>
                  <span style="color: #12efec">${movie?.release_date}</span>
                </div>
              </div>
              <div class="describe">
                ${movie?.overview}
              </div>
            </div>
          </div>
        </div>
      `)
    );
    container.innerHTML = output;
  }
  else{
    alert("Champ de recherche vide")
  }
})

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
