import { createContext, useState, useEffect } from "react";
import { IArtworkContext, IArtworkContextProps } from "../@types/artwork";

export const artworkContext = createContext<IArtworkContext | null>(null);

const ArtworkContextProvider: React.FC<IArtworkContextProps> = ({ children }) => {
    const [artworks, setArtworks] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.artic.edu/api/v1/artworks");

                if (!response.ok) {
                    throw new Error(response.statusText);
                };

                const data = await response.json();
                setArtworks(data);

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, []);

    return (
        <artworkContext.Provider value={{
            message: "ALIVE",
            artworks: artworks
        }}>
            {children}
        </artworkContext.Provider>
    )
}

export default ArtworkContextProvider;