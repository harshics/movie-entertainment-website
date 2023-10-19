// Movie data
const movies = [
    { title: "Leo", releaseDate: "october 19, 2023", duration: "2.5 hr", budget: "20 cr", language: ["Tamil", "Hindi","kannada","hindi"] },
    { title: "Salaar", releaseDate: "December 22, 2023", duration: "2.5 hr", budget: "20 cr", language: ["Telugu"] },
    { title: "Movie 3", releaseDate: "May 5, 2023", duration: "1.8 hr", budget: "60 cr", language: ["English", "French"] },
    { title: "Movie 4", releaseDate: "August 20, 2023", duration: "2.2 hr", budget: "80 cr", language: ["English", "German"] },
    // Add more movies as needed
];

// Function to display movie details
function displayMovieDetails1(movie) {
    const content = document.getElementById("content");
    
    content.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Release Date: ${movie.releaseDate}</p>
        <p>Duration: ${movie.duration}</p>
        <p>Budget: ${movie.budget}</p>
        <p>Language: ${movie.language.join(", ")}</p>
        
        
    `;
}

// Add click event listeners to movie elements
const movieContainers1 = document.querySelectorAll(".movie");
movieContainers1.forEach((movieContainer, index) => {
    movieContainer.addEventListener("click", () => {
        displayMovieDetails(newMovies[index]);
    });
});

// Function to display movies and initialize slideshow
function displayMovies(startIndex, endIndex) {
    const upcomingMoviesSection = document.getElementById("upcoming-movies");
    upcomingMoviesSection.innerHTML = "<h2 class='movie-header1'>Upcoming Movies</h2>";

    // Display movies in the specified range
    function generateImageUrl(folder, movieIndex) {
        return `${folder}/img${movieIndex}.jpg`;
    }

    function initializeSlideshow(showElement) {
        const images = showElement.querySelectorAll("img");
        let currentIndex = 0;

        const showNextImage = () => {
            images.forEach((image) => {
                image.style.display = "none";
            });

            images[currentIndex].style.display = "block";
            currentIndex = (currentIndex + 1) % images.length;
        };

        showNextImage();
        setInterval(showNextImage, slideInterval);
    }

    for (let i = startIndex; i <= endIndex; i++) {
        const movie = movies[i];
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        const movie1Index = i * 2;
        const movie2Index = i * 2 + 1;
        movieElement.innerHTML = `
            <div class="show">
                <p>slideshow images</p>
                <img src="${generateImageUrl("sid", movie1Index)}" alt="Movie 1">
                <img src="${generateImageUrl("sid", movie2Index)}" alt="Movie 2">
            </div>
            <div class="movie-info">
                <img src="${generateImageUrl("redu", i)}" alt="Movie ${i + 1}">
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.releaseDate}</p>
            </div>
            <button class="see-more-button">See More</button>
        `;
        movieElement.querySelector(".see-more-button").addEventListener("click", () => {
            displayMovieDetails1(movie);
        });
        upcomingMoviesSection.appendChild(movieElement);

        // Initialize the slideshow for the current movie
        const showElement = movieElement.querySelector(".show");
        initializeSlideshow(showElement);
    }

    // Display "See More" button if there are remaining movies
    if (endIndex < movies.length - 1) {
        const seeMoreButton = document.createElement("button");
        seeMoreButton.id = "see-more-button";
        seeMoreButton.textContent = "See More";
        upcomingMoviesSection.appendChild(seeMoreButton);

        seeMoreButton.addEventListener("click", () => {
            upcomingMoviesSection.removeChild(seeMoreButton);
            displayMovies(endIndex + 1, endIndex + 2); // Display next two movies
        });
    }
}

// Set the interval between slides in milliseconds
const slideInterval = 3000;

// Display initial two movies
displayMovies(0, 1);



//--------------------------------------serach data----------------------------------------------------------------------->>>>
// Function to perform the search
function searchMovies(query) {
    query = query.toLowerCase();
    const results = movies.filter(movie => {
        const titleMatch = movie.title.toLowerCase().includes(query);
        const languageMatch = movie.language.some(lang => lang.toLowerCase().includes(query));
        return titleMatch || languageMatch;
    });
    return results;
}

// Function to display search results
function displayResults(results) {
    const newPage = window.open("", "_blank"); // Open a new blank page
    newPage.document.write("<html><head><title>Search Results</title></head><body></body></html>"); // Create the HTML structure
    const resultsContainer = newPage.document.createElement("div"); // Create a container for the search results
    newPage.document.body.appendChild(resultsContainer); // Add the container to the new page

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
    } else {
        results.forEach(movie => {
            const movieDiv = newPage.document.createElement("div"); // Create a div for each movie
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.releaseDate}</p>
                <p>Duration: ${movie.duration}</p>
                <p>Budget: ${movie.budget}</p>
                <p>Languages: ${movie.language.join(", ")}</p>
            `;
            resultsContainer.appendChild(movieDiv); // Add the movie div to the container
        });
    }
}

// Event listener for the search button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input");
    const query = searchInput.value.trim();
    const results = searchMovies(query);
    displayResults(results);
});

// Optionally, you can also perform a search when the user presses Enter in the input field
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        const results = searchMovies(query);
        displayResults(results);
    }
});


//-----------------------------------------------------------Get the sidebar element-----------------------------------------
const sidebar = document.getElementById("sidebar");

// Add a click event listener to the sidebar
sidebar.addEventListener("click", function(event) {
  // Prevent the default behavior of the link
  event.preventDefault();

  // Get the year from the clicked link
  const year = event.target.innerText;

  // Filter the movies array to get only the movies released in the clicked year
  const moviesInYear = movies.filter(movie => movie.releaseDate.includes(year));

  // Create a new page to display the movies
  const newPage = window.open("", "_blank");

  // Add the movies to the new page
  moviesInYear.forEach(movie => {
    newPage.document.write(`<h2>${movie.title}</h2>`);
    newPage.document.write(`<p>Release Date: ${movie.releaseDate}</p>`);
    newPage.document.write(`<p>Duration: ${movie.duration}</p>`);
    newPage.document.write(`<p>Budget: ${movie.budget}</p>`);
    newPage.document.write(`<p>Language: ${movie.language.join(", ")}</p>`);
    newPage.document.write(`<hr>`);
  });
});


///------------------------------------------- Theme button ----------------------------------------------------------------------------->>>>>

const themeButton = document.getElementById('themeButton');
const body = document.body;

themeButton.addEventListener('click', toggleTheme);

function toggleTheme() {
    if (body.classList.contains('night-light-theme')) {
        // Switch to light theme
        body.classList.remove('night-light-theme');
    } else {
        // Switch to night light theme
        body.classList.add('night-light-theme');
    }
}

//========================================================================================================================

//============================================================ featured movies(top movies) =============================================================

// Movie data
const newMovies = [
    { title: "Inception", releaseDate: "July 16, 2010", duration: "2.8 hr", budget: "16 cr", languages: ["English", "French","japanese"],videoSource: "videos/video1.mp4" },
    { title: "The Dark Knight", releaseDate: "July 18, 2008", duration: "2.3 hr", budget: "18.5 cr", languages: ["English"],videoSource: "videos/video2.mp4"},
    { title: "Sita Ramam", releaseDate: "August 5, 2022", duration: "2.4 hr", budget: "3 cr", languages: ["Telugu"],videoSource: "videos/video3.mp4"},
    { title: "777 Charlie", releaseDate: "June 10, 2022", duration: "2.2 hr", budget: "3 cr", languages: ["Kannada"],videoSource: "videos/video4.mp4"},
    // Add more movies as needed
];

// Function to display movie details
function displayMovieDetails2(movie) {
    const movieInfo = document.getElementById("content");
    movieInfo.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Release Date: ${movie.releaseDate}</p>
        <p>Duration: ${movie.duration}</p>
        <p>Budget: ${movie.budget}</p>
        <p>Languages: ${movie.languages.join(", ")}</p>
    `;
}

// Add click event listeners to movie elements
const movieContainers = document.querySelectorAll(".movie");
movieContainers.forEach((movieContainer, index) => {
    movieContainer.addEventListener("click", () => {
        displayMovieDetails2(newMovies[index]);
    });
});

// Function to display movies
function displayNewMovies(startIndex, endIndex) {
    const featuredMoviesSection = document.getElementById("featured-movies");
    featuredMoviesSection.innerHTML = "<h2 class='movie-header'>Top Movies</h2>";

    // Generate a unique image URL for each movie
    function generateImageUrl(folder, movieIndex) {
        // Replace "redu" with your desired image directory name
        return `${folder}/img${movieIndex + 1}.jpg`;
    }

    // Display movies in the specified range
    for (let i = startIndex; i <= endIndex; i++) {
        const newMovie = newMovies[i];
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie");
        movieContainer.innerHTML = `
            <img src="${generateImageUrl("top", i)}" alt="${newMovie.title}">
            <h3>${newMovie.title}</h3>
            <p>Release Date: ${newMovie.releaseDate}</p>
            <br>
            <h1>Trailer</h1>
            <div class="video">
                <video width="500" height="200" controls>
                    <source src="${newMovie.videoSource}" type="video/mp4">
                </video>
            </div>
            <div class="movie-feedback">
        <button class="like-button">Like</button>
        <button class="dislike-button">Dislike</button>
        <div class="feedback-percentage">Like: 0% | Dislike: 0%</div>
    </div>
            <button class="see-more-button">See More</button>
           
        `;
        movieContainer.querySelector(".see-more-button").addEventListener("click", () => {
            displayMovieDetails2(newMovie);
        });
        featuredMoviesSection.appendChild(movieContainer);
    }

     

    // Display "See More" button if there are remaining movies
    if (endIndex < newMovies.length - 1) {
        const seeMoreButton = document.createElement("button");
        seeMoreButton.id = "see-more-button2";
        seeMoreButton.textContent = "See More";
        featuredMoviesSection.appendChild(seeMoreButton);

        seeMoreButton.addEventListener("click", () => {
            featuredMoviesSection.removeChild(seeMoreButton);
            displayNewMovies(endIndex + 1, endIndex + 2); // Display next two movies
        });
    }
}

// Display initial two movies
displayNewMovies(0, 1);


//======================================================


// Function to handle movie feedback (like and dislike)
// Function to handle movie feedback (like and dislike)
function handleMovieFeedback() {
    const likeButtons = document.querySelectorAll('.like-button');
    const dislikeButtons = document.querySelectorAll('.dislike-button');
    const feedbackPercentages = document.querySelectorAll('.feedback-percentage');

    likeButtons.forEach((likeButton, index) => {
        let likes = 0;
        let dislikes = 0;

        const dislikeButton = dislikeButtons[index];
        const feedbackPercentage = feedbackPercentages[index];

        likeButton.addEventListener("click", () => {
            likes++;
            updateFeedbackPercentage();
        });

        dislikeButton.addEventListener("click", () => {
            dislikes++;
            updateFeedbackPercentage();
        });

        function updateFeedbackPercentage() {
            const totalVotes = likes + dislikes;
            const likePercentage = totalVotes === 0 ? 0 : (likes / totalVotes) * 100;
            const dislikePercentage = totalVotes === 0 ? 0 : (dislikes / totalVotes) * 100;

            feedbackPercentage.textContent = `Like: ${likePercentage.toFixed(1)}% | Dislike: ${dislikePercentage.toFixed(1)}%`;
        }
    });
}

// Call the function to handle feedback for all movies
handleMovieFeedback();














