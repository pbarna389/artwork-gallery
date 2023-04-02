import { useContext } from "react";
import { artworkContext } from "./context/ArtworkContext";
import { IArtworkContext } from "./@types/artwork";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Artists from "./pages/Artists";
import Artist from "./pages/Artist";
import Artworks from "./pages/Artworks";
import Artwork from "./pages/Artwork";
import Login from "./pages/Login";

import './App.css';

function App() {
	// const { message, artworks } = useContext(artworkContext) as IArtworkContext;

	return (
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
									<Route index element={<Artist />} />
									<Route path=":artworkid" element={<Artwork />} />
								</Route>
							</Route>
						</Route>
					</Route>
					<Route path="/artworks">
						<Route path=":artworkspage">
							<Route index element={< Artworks />} />
							<Route path=":artworkid" element={<Artwork />}></Route>
						</Route>
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
