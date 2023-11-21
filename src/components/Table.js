import React, { useState } from 'react';
import "./styles/table.css";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Table = ({moviesData, setMoviesData, searchText}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(Math.ceil(moviesData.totalResults/10))

    const tableHeaders = ["Poster", "Title", "Type", "Year"];


    // console.log(moviesData)

    const handlePageClick = async (event)=>{
        setCurrentPage(event.selected+1);
        const {data} = await axios.get(`https://omdbapi.com/?apikey=d24be522&s=${searchText}&page=${event.selected+1}`);
        console.log("data->", data)
        setMoviesData(data);
    }

  return (
    <div className='table-container'>
        <table>
            <thead>
                <tr>
                    {
                        tableHeaders.map((head, index)=>{
                            return(
                                <th key={index}>
                                    <span>{head}</span>
                                </th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    moviesData.Search.map((movie)=>{
                        return(
                            <tr key={movie.imdbID} >
                                <td><img src={movie.Poster} alt={movie.Title} /></td>
                                <td>{movie.Title}</td>
                                <td>{movie.Type}</td>
                                <td>{movie.Year}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName={currentPage === 1?"page-num prev": "page-num"}
            nextLinkClassName={currentPage === totalPages?"page-num prev": "page-num"}
            activeLinkClassName="active"
       />
    </div>
  )
}

export default Table