import React, {useState,useEffect} from 'react'
import { getImages } from './api';
//import images from './api-mock.json';
import './App.css'


const App = () => {
 const [imagesList, setImageList] = useState([]);
 const [nextCursor, setNextCursor] = useState(null);

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

 
  return (
    <>
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