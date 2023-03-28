import { createContext, useState, useEffect, useReducer } from "react";
import { IArtworkContext, IArtworkContextProps, IArtistData } from "../@types/artwork";
import { initialState } from "../reducers/dataReducer";
import dataReducer from "../reducers/dataReducer";

const ARTIST_SITE = import.meta.env.VITE_GET_ARTISTS;
const ARTIST_DATA = import.meta.env.VITE_ARTIST_DATA;
const ARTIST_ARTWORKS = import.meta.env.VITE_ARTIST_ARTWORKS;
const ARTWORKS_SITE = import.meta.env.VITE_GET_ARTWORKS;

export const artworkContext = createContext<IArtworkContext | null>(null);

const ArtworkContextProvider: React.FC<IArtworkContextProps> = ({ children }) => {
    const [navShown, setNavShown] = useState<boolean>(false);

    const [artworksPagination, setArtworksPagination] = useState<number>(1);
    const [artworksPictures, setArtworksPictures] = useState<string[]>();

    const [artistPagination, setArtistPagination] = useState<number>(1);
    const [artistID, setArtistID] = useState<number>();
    const [artistName, setArtistName] = useState<string>();
    const [artistArtworkPag, setArtistArtworkPag] = useState<number>(1);
    const [artworkID, setArtworkID] = useState<number>();

    const [artistState, dataDispatch] = useReducer(dataReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ARTIST_SITE}${artistPagination}`);

                if (!response.ok) {
                    throw new Error(response.statusText);
                };

                const data = await response.json();
                // console.log(data);
                dataDispatch({
                    type: "set_artists", payload: data.data.sort((a: any, b: any) => {
                        const actElement = a.title.charAt(0) + a.title.slice(1);
                        const nextElement = b.title.charAt(0) + b.title.slice(1);
                        return (actElement < nextElement) ? -1 : (actElement > nextElement) ? 1 : 0
                    })
                });

                dataDispatch({
                    type: "set_artist_max_page_num", payload: data.pagination.total_pages
                })

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [artistPagination]);

    useEffect(() => {
        if (artistName) {
            dataDispatch({ type: "actual_artist_artworks_URLS", payload: undefined })
            dataDispatch({ type: "loading", payload: true })
            const fetchData = async () => {
                try {
                    const response = await fetch(`${ARTIST_ARTWORKS}search?size=100&from=${(artistArtworkPag * 100) - 100}&q=${artistName}`);

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    };

                    const data = await response.json();

                    console.log(data);

                    const imageSites: IArtistData[] = [];

                    Object.values(data.data).forEach((el: any, idx: number) => {
                        {
                            const fetchAPI = async () => {
                                try {
                                    const response = await fetch(`${el.api_link}`);
                                    const imgdata = await response.json();
                                    imageSites.push({
                                        url: `${imgdata.config.iiif_url}/${imgdata.data.image_id}`,
                                        title: `${el.title}`,
                                        id: `${el.id}`,
                                        lqip: `${el.thumbnail?.lqip}`
                                    });
                                    if (imageSites.length === data.data.length) {
                                        dataDispatch({ type: "actual_artist_artworks_URLS", payload: imageSites })
                                        dataDispatch({ type: "loading", payload: false })
                                    }
                                } catch (error) {
                                    console.log(error)
                                }

                            }
                            fetchAPI();
                        }
                    }
                    )

                    dataDispatch({
                        type: "actual_artist_related_artworks", payload: data.data
                    });
                    dataDispatch({
                        type: "actual_artist_artwork_max_page_num", payload: data.pagination.total_pages > 10 ? 10 : data.pagination.total_pages
                    })

                } catch (error) {
                    console.log(error)
                }
            }

            fetchData();
        }

    }, [artistName, artistArtworkPag]);

    useEffect(() => {
        console.log("artworks data added")
    }, [artistName, artistArtworkPag])

    useEffect(() => {
        if (artistID) {

            const fetchData = async () => {
                try {
                    const response = await fetch(`${ARTIST_DATA}${artistID}`);

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    };

                    const data = await response.json();
                    console.log(data)
                    dataDispatch({ type: "set_actual_artist", payload: data.data });

                } catch (error) {
                    console.log(error)
                }
            }
            fetchData();

        }
    }, [artistID]);

    useEffect(() => {
        if (artworkID) {

            const fetchData = async () => {
                try {
                    const response = await fetch(`${ARTIST_ARTWORKS}${artworkID}`);

                    if (!response.ok) {
                        throw new Error(response.statusText);
                    };

                    const data = await response.json();
                    console.log(data)
                    dataDispatch({ type: "set_actual_artwork", payload: data.data });
                    dataDispatch({ type: "set_actual_artwork_URL", payload: data.config.iiif_url });
                    dataDispatch({ type: "set_actual_artwork_ID", payload: data.data.image_id })

                } catch (error) {
                    console.log(error)
                }
            }
            fetchData();

        }
    }, [artworkID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ARTWORKS_SITE}${artworksPagination}`);

                if (!response.ok) {
                    throw new Error(response.statusText);
                };

                const data = await response.json();
                console.log(data);
                dataDispatch({
                    type: "set_artworks", payload: data.data.sort((a: any, b: any) => {
                        const actElement = a.title.charAt(0) + a.title.slice(1);
                        const nextElement = b.title.charAt(0) + b.title.slice(1);
                        return (actElement < nextElement) ? -1 : (actElement > nextElement) ? 1 : 0
                    })
                });

                dataDispatch({
                    type: "set_artworks_max_page_num", payload: data.pagination.total_pages
                })

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [artworksPagination]);

    return (
        <artworkContext.Provider value={{
            message: "ALIVE",
            artists: artistState.artists,
            artistPagination: artistPagination,
            artistMaxPage: artistState.artist_max_page_num,
            setArtistPagination: setArtistPagination,
            setArtistID: setArtistID,
            actual_artist: artistState.actual_artist,
            setArtistName: setArtistName,
            artistArtworks: artistState.artist_related_artworks,
            artistArtworkMaxPage: artistState.actual_artist_artwork_max_page,
            artistArtworkPag: artistArtworkPag,
            setArtistArtworkPag: setArtistArtworkPag,
            setArtworkID: setArtworkID,
            actual_artwork: artistState.actual_artwork,
            actual_artwork_url: artistState.actual_artwork_URL,
            actual_artwork_id: artistState.actual_artwork_ID,
            artworks: artistState.artworks,
            artworksMaxPage: artistState.artworks_max_page_num,
            artworksPagination: artworksPagination,
            setArtworksPagination: setArtworksPagination,
            navShown: navShown,
            setNavShown: setNavShown,
            actualArtistArtworksURLS: artistState.actual_artist_artworks_URLS,
            loading: artistState.loading,
        }}>
            {children}
        </artworkContext.Provider>
    )
}

export default ArtworkContextProvider;