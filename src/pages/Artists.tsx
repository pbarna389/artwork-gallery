import { useContext, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { artworkContext } from '../context/ArtworkContext';
import { IArtworkContext } from "../@types/artwork";
import Pagination from '../components/Pagination';

const Artists = () => {
    const { artists, setArtistPagination, artistMaxPage, setArtistID, setArtistName, artistArtworkPag } = useContext(artworkContext) as IArtworkContext;
    const params = useParams();
    console.log(params);

    useEffect(() => {
        if (params.page) setArtistPagination(Number(params.page))
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number): void => {
        const target = e.target as unknown as HTMLAnchorElement;
        console.log(target.innerHTML);
        setArtistID(id);
        setArtistName(target.innerHTML.split(" ").slice(-1).join(""));
    };

    return (
        <div>
            <div>Current page: {params.page}</div>
            <ul>
                {
                    artists ?
                        artists.map((el: any) => <li><Link key={el.id} to={`/artists/${params.page}/${el.id}/${artistArtworkPag}`} onClick={e => handleClick(e, el.id)}>{el.title}</Link></li>)
                        : null
                }
            </ul>
            <Pagination pageNumMax={artistMaxPage} setPagination={setArtistPagination} related={"artist_list"} />
        </div>
    )
}

export default Artists