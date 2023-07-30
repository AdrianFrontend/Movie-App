import axios from "axios";

const movieAPIInstance = axios.create({
	headers: {
		accept: "application/json;charset=utf-8",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzExZWZiZWM4YzhjZjU3NzgzNzk0YjIyYmZmOTEwNyIsInN1YiI6IjY0YjkwZTU5NmFhOGUwMDBiMGIwODZmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0gmbvMpxymPSxS5HWKM81xXFJ5RUTdwOGN6_u0ve_ks",
	},
});

export const movieAPI = {
	getMovies(searchRequest, page) {
		return movieAPIInstance
			.get(`https://api.themoviedb.org/3/search/movie?query=${searchRequest}&page=${page}`)
			.then((r) => {
				return r.data;
			});
	},

	getFilmById(id) {
		return movieAPIInstance.get(`https://api.themoviedb.org/3/movie/${id}`).then((r) => {
			return r.data;
		});
	},

	getGenres() {
		return movieAPIInstance.get("https://api.themoviedb.org/3/genre/movie/list").then((r) => {
			return r.data;
		});
	},
};
