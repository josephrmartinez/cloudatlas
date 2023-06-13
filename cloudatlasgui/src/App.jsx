import { useState } from 'react'
import './App.css'
import { Button } from "@tremor/react";



export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className='flex flex-col items-center margin-auto'>
    
      <div className='flex flex-row mb-10 text-3xl text-neutral-600'><img src='/logoicon.svg'/>CloudAtlas</div>
      
      
      
      <form method="post" enctype="multipart/form-data">
  
        <div>
        <h1>Upload cloud image:</h1>

        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
              <Button variant='secondary' onClick={() => setSelectedImage(null)}>select new image</Button>
              

          </div>
        )}

        <br />
        <br />
        {!selectedImage && 
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
            />
            }
      </div>
      
      <Button type='submit' variant='primary' disabled={!selectedImage}>identify cloud type</Button>

      </form>

      
    </div>
  )
}