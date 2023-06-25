//Function to select an element from the DOM by its selector.

const $ = (selector) => document.querySelector(selector);

//Function to retrieve data from the local storage.

const getDataInLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

//Variables and constants

const MOVIES = getDataInLocalStorage("MOVIES")
const USERS = getDataInLocalStorage("USERS")

//DOM element selection
const userIdInput = $("#user-id")
const rateInput = $("#rate")
const fromDateInput = $("#from-date")
const toDateInput = $("#to-date")
const form = $("#consult-form")
const formContainer =$("#form-container")
const welcomeSection = $("#cover")
const cardsContainer = $("#cards-container")
const showFormButton = $("#show-form-button")
const filteredMoviesCardsContainer = $("#filtered-movies-cards-container")
const filterAgainButton = $("#filter-again-button")
const homeButton = $("#home-button")
const homeLink =$("#home")
const githubButton = $("#github-button")
const linkedinButton = $("#linkedin-button")
const modal = $("#modal");
const closeModalButton = $("#closeModalButton");
const noResultsMessage = $("#no-results-message");
const footer = $("footer")


//Filtering functions

//Filters movies by date within a specific range.

const filterMoviesByDate = (fromDate, toDate, movies) =>{
    return movies.filter(movie=>{
        const movieDate = new Date(movie.watched)
        if(movieDate >= fromDate && movieDate <= toDate){
            return true
        } else{
            return false
        }
        })
}

//Filters movies based on various criteria.

const filterMovies = ({movies,users, userId, rate, fromDate, toDate}) =>{
    const moviesToFilter = [...movies]
    let filteredMovies = filterMoviesByDate(fromDate,toDate,moviesToFilter)

    filteredMovies = filteredMovies.filter(movie=> movie.rate >= Number(rate))

    if(userId){
        filteredMovies = filteredMovies.filter(movie=> movie.userId === Number(userId))
    }
    filteredMovies = filteredMovies.map(movie => {
        const user = users.find(user => user.id === movie.userId)
        return{
            id: user.id,
            username:user.username,
            email: user.email,
            fullAdress: `${user.address.street} - ${user.address.city}`,
            company: user.company.name,
            movie: movie.title,
            rate: movie.rate
        }
        })
    return filteredMovies
}

//Manipulating dom functions

const clean = (idHtml) => idHtml.classList.add("hidden"); //Hides an element in the DOM.
const show = (idHtml) => idHtml.classList.remove("hidden"); //Shows an element in the DOM.

//Removes all movie cards from the cards container.
const cleanCards = () =>{
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }
}
// Creates movie cards based on the filtered movies.
const createCards = (filteredMovies) =>{
    const moviesCards = []

    for(const movie of filteredMovies){
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const cardMovieTitle = document.createElement("h2")
        cardMovieTitle.classList.add("movie-card-title");
        cardMovieTitle.textContent = movie.movie; 
        movieCard.appendChild(cardMovieTitle);

        const cardMovieUser = document.createElement("p")
        cardMovieUser.classList.add("cardsInfo")
        cardMovieUser.textContent = `User: ${movie.username}`
        movieCard.appendChild(cardMovieUser);

        const cardMovieUserId = document.createElement("p")
        cardMovieUserId.classList.add("cardsInfo")
        cardMovieUserId.textContent = `User id: ${movie.id}`
        movieCard.appendChild(cardMovieUserId);

        const email = document.createElement("p")
        email.classList.add("cardsInfo")
        email.textContent = `User's email: ${movie.email
        }`
        movieCard.appendChild(email);

        const cardFullAdress = document.createElement("p")
        cardFullAdress.classList.add("cardsInfo")
        cardFullAdress.textContent = `User's adress:  ${movie.fullAdress
        }`
        movieCard.appendChild(cardFullAdress);

        const cardMovieRate = document.createElement("p")
        cardMovieRate.classList.add("cardsInfo")
        cardMovieRate.textContent = `Movie's rate: ${movie.rate
        }`
        movieCard.appendChild(cardMovieRate);

        const movieCompany = document.createElement("p")
        movieCompany.classList.add("cardsInfo")
        movieCompany.textContent = `Movie's company: ${movie.company
        }`
        movieCard.appendChild(movieCompany);

        moviesCards.push(movieCard)
    }
        return moviesCards
}
//Shows the "No results found" message if there are no visible movie cards.
const showNoResultsMessage = () => {
    if (cardsContainer.childElementCount === 0) {
      show(noResultsMessage);
    } else {
      clean(noResultsMessage);
    }
  };
//Shows the filtered movie cards in the container.
const showCards = (filteredMovies) =>{
    show(filteredMoviesCardsContainer)
    cleanCards()
    const moviesCards = createCards(filteredMovies) 
    for(const movieCard of moviesCards){
    cardsContainer.appendChild(movieCard);
    }
    showNoResultsMessage();
}
// Function to show a modal with a message
const showModal = (message) =>{
    const modalMessage = $("#modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
}


// Event handling functions
const handleSubmit = (event) => {
    event.preventDefault()
    const userIdValue = userIdInput.value;
    const rateValue = rateInput.value
    const fromDateValue = fromDateInput.value
    const toDateValue = toDateInput.value
    if (!rateValue || !toDateValue || !fromDateValue){
        showModal("Please fill in all required fields.")
        return
    }
    if(isNaN(userIdValue)){
        showModal("The entered user is not valid. Please enter a number")
        return
    }
    if(isNaN(rateValue)){
        showModal("The entered rate is not valid. Please enter a number")
        return
    }
    clean(formContainer)
    const filteredMovies = filterMovies({
        movies: MOVIES,
        users: USERS,
        userId: userIdValue,
        fromDate: new Date($("#from-date").value),
        toDate: new Date($("#to-date").value),
        rate: rateValue
    })
    form.reset()

    showCards(filteredMovies)
}
const handleShowFormButton = () => {
    clean(welcomeSection)
    show(formContainer)
}
const handleFilterAgainButton = () => {
    clean(filteredMoviesCardsContainer)
    show(formContainer)
}
const handleHomeButton = () => {
    clean(formContainer)
    clean(filteredMoviesCardsContainer)
    show(welcomeSection)
}
const handleHomeLink = () => {
    clean(formContainer)
    clean(filteredMoviesCardsContainer)
    show(welcomeSection)
}
const handleGithubButton = () => {
    window.location.href = "https://github.com/MacaAC";
}
const handleLinkedinButton = () => {
    window.location.href = "https://www.linkedin.com/in/maria-macarena-%C3%A1lvarez-castillo-56445a176/";
}
const handleCloseModalButton = () =>{
    modal.style.display = 'none';
}


//Assign the event handlers

form.addEventListener("submit", handleSubmit)
showFormButton.addEventListener("click", handleShowFormButton)
filterAgainButton.addEventListener("click", handleFilterAgainButton)
homeButton.addEventListener("click", handleHomeButton)
homeLink.addEventListener("click", handleHomeLink)
githubButton.addEventListener("click",handleGithubButton )
linkedinButton.addEventListener("click", handleLinkedinButton);
closeModalButton.addEventListener('click', handleCloseModalButton);








