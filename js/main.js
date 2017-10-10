$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
})

getMovies = (searchText) => {
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + searchText)
    .then((response) => {
      console.log(response.data.results);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        console.log('move_path:' + movie.poster_path);
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${'https://image.tmdb.org/t/p/w185' + movie.poster_path}
">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${searchText}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `
      })

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

movieSelected = (searchStr) => {
  sessionStorage.setItem('searchTxt', searchStr);
  window.location = 'movie.html';
  return false;
}

getMovie = () => {
  let searchStr = sessionStorage.getItem('searchTxt');

  axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + searchStr)
    .then((response) => {
      console.log(response);
      let movies = response.data.results;

      let output = '';
      $.each(movies, (index, movie) => {
        console.log('movie_path:' + movie.poster_path);
        output += `
          <div class="row">
            <div class="col-md-4">
              <img src="${'https://image.tmdb.org/t/p/w185' + movie.poster_path}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${movie.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${movie.genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${movie.genre_ids}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${movie.overview}
              <hr>
                <a href="index.html" class="btn btn-default">Go Back To Search</a>
              </div>
            </div>
            `;
      })

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    })
}
