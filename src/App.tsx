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
import Background from "./components/Background";
import Footer from "./components/Footer";
import InfoCard from "./components/InfoCard";

import './App.css';

function App() {
	const { userState } = useContext(artworkContext) as IArtworkContext;
	console.log(auth?.currentUser)

	return (
		<>
			<Background />
			<InfoCard />
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
												<Route path=":artworkid" element={<Artwork parent="Artist" />} />
											</Route>
										</Route>
									</Route>
								</Route>
								<Route path="/artworks">
									<Route path=":artworkspage">
										<Route index element={< Artworks />} />
										<Route path=":artworkid" element={<Artwork parent="Artwork" />} />
									</Route>
								</Route>
								<Route path="/profile">
									<Route index element={<Profile />} />
									<Route path="/profile/artist">
										<Route path=":personid">
											<Route path=":artworkpage">
												<Route index element={<Artist type="profile" />} />
												<Route path=":artworkid" element={<Artwork parent="Profile_Artist" />} />
											</Route>
										</Route>
									</Route>
									<Route path="/profile/artwork">
										<Route path=":artworkid" element={<Artwork parent="Profile" />} />
									</Route>
								</Route>
							</Routes>
							<Footer />
						</BrowserRouter>
					</div>
			}
		</>
	)
}

export default App
