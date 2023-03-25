import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

interface IPaginationProps {
    related: "artist_artworks_list" | "related_list",
    pageNumMax: number,
    setPagination: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IPaginationProps> = ({ related, pageNumMax, setPagination }) => {
    const [pagType, setPagType] = useState<"artist_artworks_list" | "related_list">(related);
    const params = useParams();

    useEffect(() => {
        setPagType(related);
    }, [related]);

    console.log(params, pageNumMax, related)
    const currentPage: number = related === "artist_artworks_list" ? Number(params.page) : Number(params.artworkpage);
    // const pageLinks = Array.from({ length: pageNumMax }, (_, i) => i + 1);
    const pageLinks =
        pageNumMax < 4 ? Array.from({ length: pageNumMax }, (_, i) => i + 1)
            : currentPage < 3 ? [1, 2, 3, "...", pageNumMax]
                : currentPage === pageNumMax - 1 || currentPage === pageNumMax ? [1, "...", pageNumMax - 2, pageNumMax - 1, pageNumMax]
                    : [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", pageNumMax];

    const handleClick = (e: any, num: number): void => {
        setPagination(num)
    };

    return (
        <>
            {
                pageNumMax && pagType ?
                    pagType === "artist_artworks_list" ?
                        pageLinks.map(el => typeof el === "string" ? <span>{el}</span> : <Link key={el} to={`/artists/${el}`} onClick={e => handleClick(e, el)}>{el}</Link>)
                        :
                        pageLinks.map(el => typeof el === "string" ? <span>{el}</span> : <Link key={el} to={`/artists/${params.page}/${params.personid}/${el}`} onClick={e => handleClick(e, el)}>{el}</Link>)
                    : null
            }
        </>
    )
}

export default Pagination