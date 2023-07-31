import "./App.css";
import Layout, { Content, Header } from "antd/es/layout/layout";
import Navigation from "./Components/Navigation/Navigation";
import SearchPage from "./Components/ContentPages/SearchPage/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RatedPage from "./Components/ContentPages/RatedPage/RatedPage";
import { movieAPI } from "./API/API";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { GenresContext } from "./Context/Context";

const App = () => {
	const [movies, setMovies] = useState();
	const [genres, setGenres] = useState([]);

	const [searchRequest, setSearchRequest] = useState("A");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	const [error, setError] = useState();

	useEffect(() => {
		setMovies(0);
		setPage(1);
	}, [searchRequest]);

	useEffect(() => {
		setMovies(0);
	}, [page]);

	useEffect(() => {
		setPage(1);
	}, [currentPath]);

	let renderContentPage = () => {
		if (currentPath === "/search") {
			if (!movies) {
				if (error) {
					return <div>Please, use VPN!</div>;
				}
				movieAPI
					.getMovies(searchRequest, page)
					.then((responce) => {
						setMovies(responce.results);
						setTotalPages(responce.total_pages * 20);
					})
					.catch((error) => setError(error));

				return (
					<div className="preloader">
						<Spin size="large" />
					</div>
				);
			} else {
				return (
					<SearchPage
						movies={movies}
						page={page}
						setPage={setPage}
						totalPages={totalPages}
						setSearchRequest={setSearchRequest}
						error={error}
					/>
				);
			}
		} else if (currentPath === "/rated") {
			return <RatedPage />;
		}
	};

	if (genres.length === 0 && !error) {
		movieAPI
			.getGenres()
			.then((r) => setGenres(r))
			.catch((err) => setError(err));
	}

	return (
		<div className="movie-app">
			<BrowserRouter>
				<Layout>
					<Header className="header">
						<Navigation currentPath={currentPath} setCurrentPath={setCurrentPath} />
					</Header>

					<Content className="content">
						<GenresContext.Provider value={genres.genres}>
							<Routes>
								<Route path="/" element={<div></div>} />
								<Route path="/search" element={renderContentPage()} />
								<Route path="/rated" element={renderContentPage()} />
							</Routes>
						</GenresContext.Provider>
					</Content>
				</Layout>
			</BrowserRouter>
		</div>
	);
};

export default App;
