import MoviesList from "../MoviesList/MoviesList";
import "./SearchPage";
import Search from "../../Search/Search";
import { Alert, Pagination } from "antd";
import PropTypes from "prop-types";

const SearchPage = ({ movies, page, setPage, totalPages, setSearchRequest, error }) => {
	const moviesRender = () => {
		if (movies) {
			if (movies.length === 0) {
				return <div className="nothing-found">Nothing found!</div>;
			}

			return <MoviesList movies={movies} />;
		} else if (error) {
			return (
				<div className="error">
					<Alert message={error} type="error" />
				</div>
			);
		}
	};

	return (
		<div>
			<Search setSearchRequest={setSearchRequest} />
			{moviesRender()}
			<Pagination
				current={page}
				total={totalPages}
				showSizeChanger={false}
				pageSize={20}
				onChange={(page) => setPage(page)}
			/>
		</div>
	);
};

SearchPage.propTypes = {
	movies: PropTypes.array,
	page: PropTypes.number,
	setPage: PropTypes.func,
	totalPages: PropTypes.number,
	setSearchRequest: PropTypes.func,
	error: PropTypes.object,
};

export default SearchPage;
