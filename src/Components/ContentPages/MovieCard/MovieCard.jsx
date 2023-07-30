import { Image, Rate } from "antd";
import "./MovieCard.css";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import PropTypes from "prop-types";

const MovieCard = ({ posterUrl, name, date, genres, description, id, voteAverage, rating }) => {
	const [currentRating, setCurrentRating] = useState(rating);

	const cutText = (text, maxLength) => {
		if (maxLength > text.length) {
			return text;
		}

		let lastSpace = text.slice(0, maxLength).lastIndexOf(" ");
		return text.slice(0, lastSpace) + "...";
	};

	const movieGenres = genres.slice(0, 3).map((item) => {
		return (
			<li className="genre" key={id + item}>
				{item}
			</li>
		);
	});

	const addRatedMovie = (newRating) => {
		if (newRating > 0 && newRating != rating) {
			localStorage.setItem(id, newRating);
			setCurrentRating(newRating);
		} else {
			localStorage.removeItem(id);
			setCurrentRating(0);
		}
	};

	const releaseDate = date ? format(parseISO(date), "MMMM d, y") : null;

	const ratingStyle = {
		borderColor:
			voteAverage < 3 ? "#E90000" : voteAverage < 5 ? "#E97E00" : voteAverage < 7 ? "#E9D100" : "6#6E900",
	};

	return (
		<div className="card">
			<Image width={180} src={posterUrl} className="poster" />
			<h2 className="name">{cutText(name, 30)}</h2>
			<div className="rating" style={ratingStyle}>
				{String(voteAverage).slice(0, 3)}
			</div>
			<div className="release-date">{releaseDate}</div>
			<ul className="genres">{movieGenres}</ul>
			<div className="description">{cutText(description, 200)}</div>
			<Rate
				count={10}
				className="rating-stars"
				onChange={(value) => addRatedMovie(value)}
				value={currentRating}
			/>
		</div>
	);
};

MovieCard.propTypes = {
	posterUrl: PropTypes.string,
	name: PropTypes.string,
	date: PropTypes.string,
	genres: PropTypes.array,
	description: PropTypes.string,
	id: PropTypes.number,
	voteAverage: PropTypes.number,
	rating: PropTypes.number,
};

export default MovieCard;
