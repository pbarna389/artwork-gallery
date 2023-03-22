import { useContext, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";
import Pagination from '../components/Pagination';

const Artists = () => {
    const { artists, setArtistPagination, artistMaxPage } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
    }, [])

    return (
        <div>
            <div>Current page: {params.page}</div>
            <ul>
                {
                    artists ?
                        artists.map((el: any) => <li><Link key={el.id} to={`/artists/${params.page}/${el.id}`}>{el.title}</Link></li>)
                        : null
                }
            </ul>
            <Pagination pageNumMax={artistMaxPage} setArtistPagination={setArtistPagination} />
        </div>
    )
}

export default Artists