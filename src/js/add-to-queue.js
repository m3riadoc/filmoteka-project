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
        displayNotification('Movie added to queue.');
      } else {
        displayNotification('Movie already in watched list. Cannot add to queue.');
      }
    } else {
      removeFromQueue(movie);
      displayNotification('Movie removed from queue.');
    }
    updateQueueButton(movie);
  } else {
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
  const currentUrl = window.location.href;
  if (!currentUrl.includes('index.html')) {
    location.reload(); 
  }
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