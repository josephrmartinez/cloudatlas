import { useState, useRef } from 'react'
import './App.css'
import { Button } from "@tremor/react";


export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile)
    // Do something with the selected file
  };

    return (
      <div className='flex flex-col max-w-md items-center mx-auto'>
    
        <div className='flex flex-row w-full items-start mb-6 text-3xl text-neutral-600'><img src='/logoicon.svg' />CloudAtlas</div>
      
  
        <form method="post" className="w-full" enctype="multipart/form-data">
  
        
          <div
            id="uploadDiv"
            className="w-full h-48 bg-gray-100 rounded-md cursor-pointer mx-auto relative mb-5 flex flex-col items-center justify-center"
            onClick={handleDivClick}
          >
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
              onChange={handleFileChange}
            />
            <div className=''>upload cloud image</div>
          </div>
    
      
          <Button type='submit' variant='primary' disabled={!selectedImage}>identify cloud type</Button>

        </form>

      
      </div>
    )
  }




        // {selectedImage && (
        //   <div>
        //     <img
        //       alt="not found"
        //       width={"250px"}
        //       src={URL.createObjectURL(selectedImage)}
        //     />
        //     <br />
        //       <Button variant='secondary' onClick={() => setSelectedImage(null)}>select new image</Button>
              

        //   </div>
        // )}

          
      //   <input type="file" name="file" id="file" class="inputfile" />
      //   <label for="file">upload a cloud image</label>

      //   {!selectedImage && 
      //       <div className='w-36 h-36 outline'>
      //       <label>upload cloud image</label>
      //         <input
      //     type="file"
      //       name="photo"
      //       id="upload-photo"
      //     onChange={(event) => {
      //       console.log(event.target.files[0]);
      //       setSelectedImage(event.target.files[0]);
      //     }}
      //       />
      //       </div>
      //       }
      // </div>