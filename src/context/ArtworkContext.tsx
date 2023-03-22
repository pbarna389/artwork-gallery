import { createContext, useState, useEffect, useReducer } from "react";
import { IArtworkContext, IArtworkContextProps } from "../@types/artwork";
import { initialState } from "../reducers/dataReducer";
import dataReducer from "../reducers/dataReducer";

export const artworkContext = createContext<IArtworkContext | null>(null);

const ArtworkContextProvider: React.FC<IArtworkContextProps> = ({ children }) => {
    const [artworks, setArtworks] = useState<any>([]);

    const [artistState, dataDispatch] = useReducer(dataReducer, initialState);
    const [artistPagination, setArtistPagination] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.artic.edu/api/v1/artists?page=${artistPagination}&limit=100`);

                if (!response.ok) {
                    throw new Error(response.statusText);
                };

                const data = await response.json();
                console.log(data);
                dataDispatch({
                    type: "set_artists", payload: data.data.sort((a: any, b: any) => {
                        const actElement = a.title.charAt(0) + a.title.slice(1);
                        const nextElement = b.title.charAt(0) + b.title.slice(1);
                        return (actElement < nextElement) ? -1 : (actElement > nextElement) ? 1 : 0
                    })
                });

                dataDispatch({
                    type: "set_artist_pagination", payload: data.pagination.total_pages
                })

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [artistPagination]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("https://api.artic.edu/api/v1/artworks/");

    //             if (!response.ok) {
    //                 throw new Error(response.statusText);
    //             };

    //             const data = await response.json();
    //             setArtworks(data);

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     fetchData();
    // }, []);

    return (
        <artworkContext.Provider value={{
            message: "ALIVE",
            artworks: artworks,
            artists: artistState.artists,
            artistPagination: artistPagination,
            artistMaxPage: artistState.artist_pagination,
            setArtistPagination: setArtistPagination,
        }}>
            {children}
        </artworkContext.Provider>
    )
}

export default ArtworkContextProvider;