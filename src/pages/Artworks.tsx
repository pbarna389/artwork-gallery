import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { IArtworkContext } from "../@types/artwork";
import { artworkContext } from "../context/ArtworkContext";
import Pagination from "../components/Pagination";

const Artworks = () => {
    const { artworks, artworksMaxPage, artworksPagination, setArtworksPagination, setArtworkID } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params)

    const handleClick = (e: any, id: number): void => {
        setArtworkID(id)
    }

    return (
        <div>
            <div>Current page: {artworksPagination}</div>
            <ul>
                {
                    artworks ?
                        artworks.map((el: any) => <li key={el.id}><Link to={`/artworks/${params.artworkpage}/${el.id}`} onClick={e => handleClick(e, el.id)}>{el.title}</Link></li>)
                        : null
                }
            </ul>
            <Pagination related={"artwork_list"} pageNumMax={artworksMaxPage} setPagination={setArtworksPagination} />
        </div>
    )
}

export default Artworks