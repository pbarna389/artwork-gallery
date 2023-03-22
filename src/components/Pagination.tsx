import React from 'react';
import { Link, useParams } from "react-router-dom";

interface IPaginationProps {
    pageNumMax: number,
    setArtistPagination: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IPaginationProps> = ({ pageNumMax, setArtistPagination }) => {
    const params = useParams();
    const currentPage: number = Number(params.page);
    // const pageLinks = Array.from({ length: pageNumMax }, (_, i) => i + 1);
    const pageLinks =
        currentPage < 3 ? [1, 2, 3, "...", pageNumMax]
            : currentPage === pageNumMax - 1 || currentPage === pageNumMax ? [1, "...", pageNumMax - 2, pageNumMax - 1, pageNumMax]
                : [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", pageNumMax];

    const handleClick = (e: any, num: number): void => {
        setArtistPagination(num)
    };

    return (
        <>
            {
                pageNumMax ?
                    pageLinks.map(el => typeof el === "string" ? <span>{el}</span> : <Link key={el} to={`/artists/${el}`} onClick={e => handleClick(e, el)}>{el}</Link>)
                    : null
            }
        </>
    )
}

export default Pagination