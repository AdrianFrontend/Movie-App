import "./Navigation.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({ currentPath, setCurrentPath }) => {
	return (
		<div className="navigation">
			<Link
				to="search"
				className={`search-link ${currentPath === "/search" ? "active" : null}`}
				onClick={() => setCurrentPath("/search")}
			>
				Search
			</Link>
			<Link
				to="rated"
				className={`rated-link ${currentPath === "/rated" ? "active" : null}`}
				onClick={() => setCurrentPath("/rated")}
			>
				Rated
			</Link>
		</div>
	);
};

Navigation.propTypes = {
	currentPath: PropTypes.string,
	setCurrentPath: PropTypes.func,
};

export default Navigation;
