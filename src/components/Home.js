import { useState, useEffect } from "react";
import "./styles/home.css";
import axios from "axios";
import { Header, Table } from "./exporter";


const Home = () => {

  const [moviesData, setMoviesData] = useState([])
  const [searchText, setSearchText] = useState()
  const [error, setError] = useState({status: false, message:""});


  const fetchData = async(searchText)=>{

    const {data} = await axios.get(`https://omdbapi.com/?apikey=d24be522&s=${searchText}`)
    
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

        setMoviesData(data)
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
                <div>{error.message}</div>
              )
            }
            else{
              return  moviesData.length === 0 ? (<div>Loading...</div>):
              (<Table moviesData={moviesData} searchText={searchText} setMoviesData={setMoviesData} />) 
            }
          })()
        }
      </div>
    </div>
  )
}

export default Home