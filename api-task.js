// task 1. Fetch Movie Data by Title
// Fetch data for a specific movie by its title(e.g., "Inception") and log the movie title and release year.

// const btn = document.querySelector("#GetMovieBtn");
// btn.addEventListener("click", () => {

//     const url = 'https://www.omdbapi.com'

//     fetch(url)
//         .then(response => response.json())
//         .then(movie => {
//             console.log("Movie Title", movie.Title);
//             console.log("Movie Year", movie.Year);
//         })
//         .catch(error => {
//             console.error("Xeta ", error);
//         });
// });

// task 2. Search Movies by Keyword
// Use the OMDB API to search for movies by a keyword(e.g., "Batman").Log the first 5 movie titles from the search results.

// const btn = document.querySelector("#GetMovieBtn");
// btn.addEventListener("click", () => {

//     const url = 'https://www.omdbapi.com'

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const movies = data.Search.slice(0, 5);
//             console.log(" - ilk 5 Film -");
//             firstFiveMoivues.foreach((movie, index) => {
//                 console.log(`${index + 1}. ${movie.Title}`);
//             });
//         })
//         .catch(error => {
//             console.error("Xeta ", error);
//         });
// });

// task 3. Handle Errors Gracefully
// Fetch data for a movie using an invalid API key.Use.catch() to handle errors and log "Failed to fetch" when an error occurs.

// const btn = document.querySelector("#GetMovieBtn");
// btn.addEventListener("click", () => {

//     const sehvurl = 'https://www.omdbapi.com/?t=Inception&apikey=sehv_API_KEY'

//     fetch(sehvurl)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch (error => {
//         console.error("Xeta ", error);
//     });
// });

// task 4. Check Movie Ratings
// Fetch a movie's data (e.g., "The Matrix") and log all available ratings (e.g., IMDb, Rotten Tomatoes) from the Ratings array.

// const btn = document.querySelector("#GetMovieBtn");
// btn.addEventListener("click", () => {

//     const url = 'https://www.omdbapi.com/?t=Inception&apikey=a407a7b3'

//     fetch(url)
//         .then(response => response.json())
//         .then(movie => {
//             console.log(`--- ${movie.Title} Reyting---`);
//             movie.Ratings.forEach(rating => {
//                 console.log(`${rating.Source}: ${rating.Value}`);
//             });
//         })
//         .catch(error => {
//             console.error("Xeta ", error);
//         });
// });


// task  1.1
// SEARCH TASK 
const movieInput = document.querySelector("#movieInput");
const searchBtn = document.querySelector("#searchBtn");
const resultContainer = document.querySelector("#resultContainer");
const movieCardTemplate = document.querySelector("#movieCardTemplate");
const apiKey = "a407a7b3";

function searchMovie() {
    const movieName = movieInput.value.trim();
    if (!movieName) {
        resultContainer.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }
    // API SEARCH
    resultContainer.innerHTML = "<p style='color: white'>Loading...</p>";
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                resultContainer.innerHTML = "<p>Movie not found! Please try a different title.</p>";
            } else {
                // kart
                resultContainer.innerHTML = "";
                data.Search.forEach(movie => {
                    const movieCard = movieCardTemplate.content.cloneNode(true);
                    const poster = movieCard.querySelector(".moviePoster");

                    poster.src = movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x440?text=No+Poster";
                    poster.alt = `${movie.Title} poster`;
                    movieCard.querySelector(".movieTitle").textContent = movie.Title;
                    movieCard.querySelector(".movieYear").textContent = movie.Year;
                    resultContainer.appendChild(movieCard);
                });
            }
        })
        .catch(error => {
            resultContainer.innerHTML = "<p style='color: red;'>Network error occurred!</p>";
            console.error(error);
        });
}

// axtarış 
searchBtn.addEventListener("click", searchMovie);
movieInput.addEventListener("keydown", event => {
    if (event.key === "Enter") searchMovie();
});