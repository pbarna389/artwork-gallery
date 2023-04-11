import { useContext } from "react";
import { artworkContext } from "./context/ArtworkContext";
import { IArtworkContext } from "./@types/artwork";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./config/firebase-config"

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Artworks from "./pages/Artworks";
import Artwork from "./pages/Artwork";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Profile from "./pages/Profile";

import './App.css';

function App() {
	const { userState } = useContext(artworkContext) as IArtworkContext;
	console.log(auth?.currentUser)

	return (
		<>
			{
				!userState.login ?
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/registration" element={<Register />} />
						</Routes>
					</BrowserRouter>
					:
					<div className="App">
						<BrowserRouter>
							<Navbar />
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/artists">
									<Route path=":page">
										<Route index element={<Artists />} />
										<Route path=":personid">
											<Route path=":artworkpage">
												<Route index element={<Artist type="browse" />} />
												<Route path=":artworkid" element={<Artwork />} />
											</Route>
										</Route>
									</Route>
								</Route>
								<Route path="/artworks">
									<Route path=":artworkspage">
										<Route index element={< Artworks />} />
										<Route path=":artworkid" element={<Artwork />} />
									</Route>
								</Route>
								<Route path="/profile">
									<Route index element={<Profile />} />
									<Route path="/profile/artist">
										<Route path=":personid">
											<Route path=":artworkpage">
												<Route index element={<Artist type="profile" />} />
												<Route path=":artworkid" element={<Artwork />} />
											</Route>
										</Route>
									</Route>
									<Route path="/profile/artwork">
										<Route path=":artworkid" element={<Artwork />} />
									</Route>
								</Route>
							</Routes>
						</BrowserRouter>
					</div>
			}
		</>
	)
}

export default App
