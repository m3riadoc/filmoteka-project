const queueButton = document.querySelector('.queue-button');

window.addEventListener('load', () => {
  const movie = getMovieDataFromSessionStorage();
  if (movie) {
    updateQueueButton(movie);
  }
});

queueButton.addEventListener('click', () => {
  const movie = getMovieDataFromSessionStorage();
  if (movie) {
    if (!isMovieInQueue(movie)) {
      if (!isMovieInWatchedList(movie)) { 
        addToQueue(movie);
        console.log('Movie added to queue.', movie);
        displayNotification('Movie added to queue.');
      } else {
        console.log('Movie already in watched list. Cannot add to queue.');
        displayNotification('Movie already in watched list. Cannot add to queue.');
      }
    } else {
      removeFromQueue(movie);
      console.log('Movie removed from queue.', movie);
      displayNotification('Movie removed from queue.');
    }
    updateQueueButton(movie);
  } else {
    console.log('No movie data found in session storage.');
  }
});

function isMovieInWatchedList(movie) {
  let moviesOnWatched = JSON.parse(localStorage.getItem('watched')) || [];
  return moviesOnWatched.some(item => item.id === movie.id); 
}

function updateQueueButton(movie) {
  const isInQueue = isMovieInQueue(movie);
  if (isInQueue) {
    queueButton.textContent = 'Remove from Queue';
  } else {
    queueButton.textContent = 'Add to Queue';
  }
}

function getMovieDataFromSessionStorage() {
  const sessionKey = 'currentMovie';
  const movieData = sessionStorage.getItem(sessionKey);
  return movieData ? JSON.parse(movieData) : null;
}

function addToQueue(movie) {
  let moviesOnQueue = JSON.parse(localStorage.getItem('queue')) || [];
  moviesOnQueue.push(movie);
  localStorage.setItem('queue', JSON.stringify(moviesOnQueue));
}

function isMovieInQueue(movie) {
  let moviesOnQueue = JSON.parse(localStorage.getItem('queue')) || [];
  return moviesOnQueue.some(item => item.id === movie.id);
}

function removeFromQueue(movie) {
  let moviesOnQueue = JSON.parse(localStorage.getItem('queue')) || [];
  let updatedQueueList = moviesOnQueue.filter(item => item.id !== movie.id);
  localStorage.setItem('queue', JSON.stringify(updatedQueueList));
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