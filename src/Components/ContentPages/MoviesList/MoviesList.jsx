import { useContext } from "react";
import MovieCard from "../MovieCard/MovieCard";
import RatedMovieCardWrapper from "../MovieCard/RatedMovieCardWrapper";
import "./MoviesList.css";
import PropTypes from "prop-types";
import { GenresContext } from "../../../Context/Context";

const MoviesList = ({ movies, isRated }) => {
	let renderMovies;

	const genres = useContext(GenresContext);

	if (genres) {
		if (isRated) {
			let ratedMoviesIds = Object.keys(localStorage);

			renderMovies = ratedMoviesIds.map((item) => {
				return (
					<li key={item}>
						<RatedMovieCardWrapper id={item} rating={Number(localStorage.getItem(item))} />
					</li>
				);
			});
		} else {
			renderMovies = movies.map((item) => {
				let genresList = [];

				for (let i = 0; i < genres.length; i++) {
					item.genre_ids.forEach((item) => {
						if (genres[i].id === item) {
							genresList.push(genres[i].name);
						}
					});
				}

				return (
					<li key={item.id}>
						<MovieCard
							posterUrl={
								item.poster_path
									? `https://image.tmdb.org/t/p/w500${item.poster_path}`
									: "https://www.tattoomediaink.com/wp-content/uploads/woocommerce-placeholder-435x604.png"
							}
							name={item.title}
							date={item.release_date}
							genres={genresList}
							description={item.overview}
							id={item.id}
							voteAverage={item.vote_average}
							rating={localStorage.getItem(item.id) ? Number(localStorage.getItem(item.id)) : 0}
						/>
					</li>
				);
			});
		}

		return <ul className="list">{renderMovies}</ul>;
	}
};

MoviesList.propTypes = {
	movies: PropTypes.array,
	isRated: PropTypes.bool,
};

export default MoviesList;
