import React, {useState,useEffect} from 'react'
import { getImages, searchImages } from './api';
//import images from './api-mock.json';
import './App.css'


const App = () => {
 const [imagesList, setImageList] = useState([]);
 const [nextCursor, setNextCursor] = useState(null);
 const [searchValue,setSearchValue] = useState('');

 useEffect(()=>{
   const fetchData = async () =>{
     const responseJSON = await getImages();
     setImageList(responseJSON.resources);
     setNextCursor(responseJSON.next_cursor);
   }
   
   fetchData(); 
   console.log(nextCursor);
 },[])


 const handleLoadMoreButtonClick = async () => {
  const responseJSON = await getImages(nextCursor);
  setImageList((currentImageList) => [...currentImageList, ...responseJSON.resources]);
  setNextCursor(responseJSON.next_cursor);
 }  

 const handleFormSubmit = async (event) => {
  event.preventDefault();
  const responseJSON = await searchImages(searchValue,nextCursor);
  setImageList(responseJSON.resources);
  setNextCursor(responseJSON.next_cursor);
 }

 const resetForm = async (event) => {
  event.preventDefault();
   const responseJSON = await getImages
   setImageList(responseJSON.resources);
   setNextCursor(responseJSON.next_cursor);
   setSearchValue(''); 
 }
 
  return (
    <>
    <form onSubmit={handleFormSubmit}>
      <input value={searchValue} onChange={(event)=>setSearchValue(event.target.value)} required="required" placeholder="Enter a search value ...."></input>
      <button type="submit">Search</button>
      <button onClick={resetForm} type="button">Clear</button>
    </form>
    <div className="image-grid">
      {imagesList.map((image) => <img src={image.url} alt={image.public_id}></img>)}
    </div>
    <div className="footer">
      {nextCursor && <button onClick={handleLoadMoreButtonClick}>Load More</button>}
    </div>
    </>
  )
}

export default App