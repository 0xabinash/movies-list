import { useState, useEffect } from "react";
import "./styles/home.css";
import axios from "axios";
import { Header, Table } from "./exporter";


const Home = () => {

  const [moviesData, setMoviesData] = useState([])
  const [searchText, setSearchText] = useState()
  const [error, setError] = useState({status: false, message:""});
  const [totalPages, setTotalPages] = useState(1)
  const [remountComponent, setRemountComponent] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)


  const fetchData = async(searchText)=>{

    const {data} = await axios.get(`https://omdbapi.com/?apikey=deebb551&s=${searchText}`)
    
    if(data.Response === "False"){
      setError({status: true, message: data.Error});
      return;
    }
    else{
      setError({status: false, message:""});
      return data;
    }
  }

  useEffect(()=>{
    (async()=>{
        const data = await fetchData(searchText);

        setTotalPages(Math.ceil(data?.totalResults/10));
        setMoviesData(data);
        setCurrentPage(1);
        setRemountComponent(Math.random());
    })()
  },[searchText])


  return (
    <div className='Home-container'> 
      <Header setSearchText={setSearchText} />
      <div className="Home-body">
        {
          (()=>{
            if(error.status){
              return(
                <div className="error-message">{error.message}</div>
              )
            }
            else{
              return  moviesData.length === 0 ? (<div className="loading">Loading...</div>):
              (<Table moviesData={moviesData}
                 searchText={searchText} 
                 setMoviesData={setMoviesData} 
                 totalPages={totalPages} 
                 remountComponent={remountComponent}
                 currentPage={currentPage}
                 setCurrentPage={setCurrentPage}
              />) 
            }
          })()
        }
      </div>
    </div>
  )
}

export default Home