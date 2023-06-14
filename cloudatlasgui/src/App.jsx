import { useState, useRef } from 'react'
import './App.css'
import { Button } from "@tremor/react";
import { Card, Flex, Text, ProgressBar } from "@tremor/react";


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
      <div className='flex flex-col max-w-sm h-full items-center mx-auto'>
        <div className='flex flex-row w-full items-start my-6 text-3xl opacity-80 text-neutral-50'><img src='/logoicon.svg' />CloudAtlas</div>
        <form method="post" className="w-full" enctype="multipart/form-data">
          <label
            id="uploadDiv"
            htmlFor='fileInput'
            className="w-full h-48 bg-neutral-100/10 shadow-sm rounded-lg cursor-pointer mx-auto relative flex flex-col items-center justify-center"
            
          >
            {selectedImage ?
                <img
                  alt="not found"
                  style={{maxHeight: '180px'}}
                  src={URL.createObjectURL(selectedImage)}
                />
              :
              <>
                <input
                  type="file"
                  id="fileInput"
                  ref={fileInputRef}
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                  onChange={handleFileChange}
            />
            <div className='text-neutral-50'>- upload cloud image -</div></>
            }
          </label>
    
          <div className='grid grid-cols-2 gap-2'>
            <Button className='my-5' variant='secondary' disabled={!selectedImage}>clear image</Button>
            <Button className='my-5' type='submit' variant='primary' disabled={!selectedImage}>identify cloud type</Button>
          </div>
          

        </form>

        

        <Card className="max-w-sm mx-auto">
          <ProgressBar value={57} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrostratus</Text>
            <Text>57%</Text>
          </Flex>
          <ProgressBar value={26} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrocumulus</Text>
            <Text>26%</Text>
          </Flex>
          <ProgressBar value={9} color="teal" className="mt-3" />
          <Flex>
            <Text>altocumulus</Text>
            <Text>9%</Text>
          </Flex>
          <ProgressBar value={1} color="teal" className="mt-3" />
          <Flex>
            <Text>nimbostratus</Text>
            <Text>1%</Text>
          </Flex>
          <ProgressBar value={1} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrostratus</Text>
            <Text>1%</Text>
          </Flex>
          <ProgressBar value={1} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrostratus</Text>
            <Text>1%</Text>
          </Flex>
          <ProgressBar value={1} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrostratus</Text>
            <Text>1%</Text>
          </Flex>
          <ProgressBar value={1} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrostratus</Text>
            <Text>1%</Text>
          </Flex>
          <ProgressBar value={1} color="teal" className="mt-3" />
          <Flex>
            <Text>cirrostratus</Text>
            <Text>1%</Text>
          </Flex>
        </Card>


        
      
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