import { useState } from "react";
import { movieAPI } from "../../../API/API";
import MovieCard from "./MovieCard";
import "./MovieCard.css";
import { Spin } from "antd";
import PropTypes from "prop-types";

const RatedMovieCardWrapper = ({ id, rating }) => {
	const [movie, setMovie] = useState(0);
	const [error, setError] = useState();

	if (!movie && !error) {
		movieAPI
			.getFilmById(id)
			.then((r) => {
				setMovie(r);
			})
			.catch((error) => setError(error));
		return <Spin />;
	} else if (error) {
		return <>{error}</>;
	} else {
		let genresList = [];

		movie.genres.forEach((item) => genresList.push(item.name));

		return (
			<MovieCard
				posterUrl={
					movie.poster_path
						? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
						: "https://www.tattoomediaink.com/wp-content/uploads/woocommerce-placeholder-435x604.png"
				}
				name={movie.title}
				date={movie.release_date}
				genres={genresList}
				description={movie.overview}
				id={movie.id}
				voteAverage={movie.vote_average}
				rating={rating}
			/>
		);
	}
};

RatedMovieCardWrapper.propTypes = {
	id: PropTypes.string,
	rating: PropTypes.number,
	genres: PropTypes.array,
};

export default RatedMovieCardWrapper;
