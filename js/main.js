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
      console.log(response);
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
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `
      })

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    })
}
