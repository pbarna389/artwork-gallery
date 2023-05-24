import { useState, useEffect, useContext } from "react";
import { artworkContext } from "../context/ArtworkContext";
import { IArtworkContext } from "../@types/artwork";
import RecommendationCard from "../components/RecommendationCard";
import "../styles/pages/Home.css";

const Home = () => {
    const [artistTimeout, setArtistTimeout] = useState<NodeJS.Timeout>();
    const [artworkTimeout, setArtworkTimeout] = useState<NodeJS.Timeout>();
    const { recState, recDispatch, artists, artworks, handleSetArtist, artistArtworkPag } = useContext(artworkContext) as IArtworkContext;

    const artistTO = 11000;
    const artworkTO = 8000;

    useEffect(() => {
        if (artists) {
            const newArtistID: number = Math.floor(Math.random() * artists.length);
            if (recState.artist_id === undefined) {
                recDispatch({ type: "artist_id", payload: newArtistID });
                console.log(recState.artist);
            } else {
                const id = setTimeout(() => {
                    recDispatch({ type: "artist_id", payload: newArtistID });
                    console.log(recState.artist);
                }, artistTO);

                setArtistTimeout(id);

                return () => clearTimeout(artistTimeout);
            }
        }
    }, [recState.artist_id]);

    useEffect(() => {
        if (artworks) {
            const newArtworkID = Math.floor(Math.random() * artworks.length);

            if (recState.artwork_id === undefined) {
                recDispatch({ type: "artwork_id", payload: newArtworkID });
                console.log(recState.artwork);
            } else {
                const id = setTimeout(() => {
                    recDispatch({ type: "artwork_id", payload: newArtworkID });
                    console.log(recState.artwork);
                }, artworkTO);

                setArtworkTimeout(id);

                return () => clearTimeout(artworkTimeout);
            }
        }
    }, [recState.artwork_id]);

    return (
        <main className="home-wrapper">
            {
                recState.artist && recState.artwork ?
                    <>
                        <RecommendationCard id={recState.artist.id ? recState.artist.id : 0} title={recState.artist.title} type="artist" handleSetArtist={handleSetArtist} artistArtworkPag={artistArtworkPag} artistTO={artistTO} />
                        <RecommendationCard id={recState.artwork.id ? recState.artwork.id : 0} title={recState.artwork.title} type="artwork" url={recState.artwork.iiif_url} img_id={recState.artwork.image_id} artworkTO={artworkTO} />
                    </>
                    : null
            }
        </main>
    );
};

export default Home;