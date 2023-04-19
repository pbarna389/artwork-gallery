import { createContext, useState, useEffect, useReducer } from "react";
import { IArtworkContext, IArtworkContextProps, IArtistData } from "../@types/artwork";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";

import { initialState } from "../reducers/dataReducer";
import { userInitialState } from "../reducers/userReducer";
import dataReducer from "../reducers/dataReducer";
import userReducer from "../reducers/userReducer";
import { NavigateFunction } from "react-router-dom";

const ARTIST_SITE = import.meta.env.VITE_GET_ARTISTS;
const ARTIST_DATA = import.meta.env.VITE_ARTIST_DATA;
const ARTIST_ARTWORKS = import.meta.env.VITE_ARTIST_ARTWORKS;
const ARTWORKS_SITE = import.meta.env.VITE_GET_ARTWORKS;

export const artworkContext = createContext<IArtworkContext | null>(null);

const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return {
        width
    }
};

interface IWindowWidth {
    width: number
};

const ArtworkContextProvider: React.FC<IArtworkContextProps> = ({ children }) => {
    const [navShown, setNavShown] = useState<boolean>(false);

    const [artworksPagination, setArtworksPagination] = useState<number>(1);

    const [artistPagination, setArtistPagination] = useState<number>(1);
    const [artistID, setArtistID] = useState<number>();
    const [artistName, setArtistName] = useState<string>();
    const [artistArtworkPag, setArtistArtworkPag] = useState<number>(1);
    const [artworkID, setArtworkID] = useState<number>();

    const [windowWidth, setWindowWidth] = useState<IWindowWidth>(getWindowDimensions());
    const [mobileView, setMobileView] = useState<boolean>(false);

    const [artistState, dataDispatch] = useReducer(dataReducer, initialState);
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);

    useEffect(() => {
        console.log("Update sceduled");
        fetchUserData();
        userDispatch({ type: "setUpdate", payload: false });
        console.log("Updated")
    }, [userState.update])

    useEffect(() => {
        const handleResize = (): void => {
            setWindowWidth(getWindowDimensions())
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    useEffect(() => {
        if (windowWidth.width > 319 && windowWidth.width < 640) setMobileView(true);
        else setMobileView(false);
    }, [windowWidth]);

    useEffect(() => {
        dataDispatch({ type: "set_artists", payload: undefined })
        dataDispatch({ type: "loading", payload: true })
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
                dataDispatch({ type: "loading", payload: false })
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
                                    console.log(`Imagedata:`, imgdata)
                                    imageSites.push({
                                        url: `${imgdata.config.iiif_url}/${imgdata.data.image_id}`,
                                        title: `${el.title}`,
                                        id: `${el.id}`,
                                        lqip: `${imgdata.data.thumbnail?.lqip}`
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
        dataDispatch({ type: "loading", payload: true });
        dataDispatch({ type: "set_actual_artwork", payload: undefined });
        dataDispatch({ type: "set_actual_artwork_URL", payload: undefined });
        dataDispatch({ type: "set_actual_artwork_ID", payload: undefined });
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
                    dataDispatch({ type: "loading", payload: false });
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData();

        }
    }, [artworkID]);

    useEffect(() => {
        dataDispatch({ type: "loading", payload: true })
        const fetchData = async () => {
            try {
                const response = await fetch(`${ARTWORKS_SITE}${artworksPagination}`);

                if (!response.ok) {
                    throw new Error(response.statusText);
                };

                const data = await response.json();

                const newData: any[] = [];

                // Object.values(data.data).forEach((el: any) => newData.push(Object.assign({ iiif_url: data.config.iiif_url }, el)));

                Object.values(data.data).forEach((el: any, idx: number) => {
                    {
                        const fetchAPI = async () => {
                            try {
                                const response = await fetch(`${el.api_link}`);
                                const imgdata = await response.json();

                                newData.push(Object.assign({ iiif_url: imgdata.config.iiif_url }, imgdata.data))

                                if (newData.length === data.data.length) {
                                    console.log(newData);

                                    dataDispatch({
                                        type: "set_artworks", payload: newData.sort((a: any, b: any) => {
                                            const actElement = a.title.charAt(0) + a.title.slice(1);
                                            const nextElement = b.title.charAt(0) + b.title.slice(1);
                                            return (actElement < nextElement) ? -1 : (actElement > nextElement) ? 1 : 0
                                        })
                                    });

                                    dataDispatch({ type: "loading", payload: false })
                                }
                            } catch (error) {
                                console.log(error)
                            }

                        }
                        fetchAPI();
                    }
                })

                dataDispatch({
                    type: "set_artworks_max_page_num", payload: data.pagination.total_pages
                })

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [artworksPagination]);

    const fetchUserData = async () => {
        if (auth.currentUser?.uid) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);

            console.log(userSnap.data());

            userDispatch({ type: "setUserData", payload: userSnap.data() });
            userDispatch({ type: "setFavouriteArtists", payload: userSnap.data()?.favArtist });
            userDispatch({ type: "setFavouriteArtworks", payload: userSnap.data()?.favArtworks });
        }
    };

    const handleTimeout = (setState: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction, destination: string, timeout: NodeJS.Timeout | undefined, timeoutSetter: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>): void => {
        setState(false);
        const id = setTimeout(() => {
            navigate(destination)
        }, 600);

        timeoutSetter(id)
        if (timeout) clearTimeout(timeout)
    }

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
            userState: userState,
            userDispatch: userDispatch,
            fetchUserData: fetchUserData,
            mobileView: mobileView,
            handleTimeout: handleTimeout,
        }}>
            {children}
        </artworkContext.Provider>
    )
}

export default ArtworkContextProvider;