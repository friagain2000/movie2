const url = "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzNjMGJiYmM1MjE4YjM3ZDE3OWUyZGJjNjhhYzkwNSIsIm5iZiI6MTczMzI5MTI2OC42ODQsInN1YiI6IjY3NGZlZDA0ZjA4Zjk1YzY1MjIyYmMwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ti-7IGwOB-itpRkRjylHSK8H2zmn7xdVw2KT21-rtbI",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
