import "./Search.css";
import { debounce } from "lodash";
import PropTypes from "prop-types";

const Search = ({ setSearchRequest }) => {
	return (
		<div className="search">
			<input
				type="text"
				placeholder="Type to search..."
				onChange={debounce((event) => setSearchRequest(event.target.value), 1000)}
			/>
		</div>
	);
};

Search.propTypes = {
	setSearchRequest: PropTypes.func,
};

export default Search;
