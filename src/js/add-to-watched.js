const watchedButton = document.querySelector('.watched-button');

window.addEventListener('load', () => {
  const movie = getMovieDataFromSessionStorage();
  if (movie && isMovieInWatchedList(movie)) {
    updateWatchedButton(movie);
  }
});

watchedButton.addEventListener('click', () => {
  const movie = getMovieDataFromSessionStorage();
  if (movie) {
    if (!isMovieInWatchedList(movie)) {
      if (!isMovieInQueue(movie)) { 
        addToWatched(movie);
        console.log('Movie added to watched list.', movie);
        displayNotification('Movie added to watched list.');
      } else {
        console.log('Movie already in queue. Cannot add to watched.');
        displayNotification('Movie already in queue. Cannot add to watched.');
      }
    } else {
      removeFromWatched(movie);
      console.log('Movie removed from watched list.', movie);
      displayNotification('Movie removed from watched list.');
    }
    updateWatchedButton(movie);
  } else {
    console.log('No movie data found in session storage.');
  }
});

function isMovieInQueue(movie) {
  let moviesOnQueue = JSON.parse(localStorage.getItem('queue')) || [];
  return moviesOnQueue.some(item => item.id === movie.id);
}

function updateWatchedButton(movie) {
  const isInWatched = isMovieInWatchedList(movie);
  if (isInWatched) {
    watchedButton.textContent = 'Remove from Watched';
  } else {
    watchedButton.textContent = 'Add to Watched';
  }
}

function getMovieDataFromSessionStorage() {
  const sessionKey = 'currentMovie';
  const movieData = sessionStorage.getItem(sessionKey);
  return movieData ? JSON.parse(movieData) : null;
}

function addToWatched(movie) {
  let moviesOnWatched = JSON.parse(localStorage.getItem('watched')) || [];
  moviesOnWatched.push(movie);
  localStorage.setItem('watched', JSON.stringify(moviesOnWatched));
}

function isMovieInWatchedList(movie) {
  let moviesOnWatched = JSON.parse(localStorage.getItem('watched')) || [];
  return moviesOnWatched.some(item => item.id === movie.id); 
}

function removeFromWatched(movie) {
  let moviesOnWatched = JSON.parse(localStorage.getItem('watched')) || [];
  let updatedWatchedList = moviesOnWatched.filter(item => item.id !== movie.id);
  localStorage.setItem('watched', JSON.stringify(updatedWatchedList));
}

function displayNotification(message) {
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
