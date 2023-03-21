import { useContext } from "react";
import { artworkContext } from "./context/ArtworkContext";
import { IArtworkContext } from "./@types/artwork";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import './App.css'


function App() {
	const { message, artworks } = useContext(artworkContext) as IArtworkContext;
	console.log(message, artworks);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
