import React from 'react';
import { useState, useRef, useEffect } from 'react'
import './App.css'
import { Button, Card, Flex, Text, ProgressBar } from "@tremor/react";
import { client } from "@gradio/client";

const cloudDescriptions =
{
  cirrus: "Cirrus clouds are delicate, feathery clouds that are made mostly of ice crystals. Their wispy shape comes from wind currents which twist and spread the ice crystals into strands.",
  cirrostratus: "Cirrostratus clouds are thin, white clouds that cover the whole sky like a veil. These clouds are most commonly seen in the winter, and can cause the appearance of a halo around the sun or the moon.",
  cirrocumulus: "Cirrocumulus clouds are thin, sometimes patchy, sheet-like clouds. They sometimes look like they’re full of ripples or are made of small grains.",
  altocumulus: "Altocumulus clouds have several patchy white or gray layers, and seem to be made up of many small rows of fluffy ripples. They are lower than cirrus clouds, but still quite high. They are made of liquid water, but they don’t often produce rain.",
  altostratus: "Altostratus clouds are gray or blue-gray mid-level clouds composed of ice crystals and water droplets. The clouds usually cover the entire sky.",
  nimbostratus: "Nimbostratus clouds are dark, gray clouds that seem to fade into falling rain or snow. They are so thick that they often blot out the sunlight.",
  cumulus: "Cumulus clouds are detached, individual, cauliflower-shaped clouds usually spotted in fair weather conditions. The tops of these clouds are mostly brilliant white tufts when lit by the Sun, although their base is usually relatively dark.",
  stratus: "Stratus cloud often look like thin, white sheets covering the whole sky. Since they are so thin, they seldom produce much rain or snow. Sometimes, in the mountains or hills, these clouds appear to be fog.",
  cumulonimbus: "Cumulonimbus clouds grow on hot days when warm, wet air rises very high into the sky. From far away, they look like huge mountains or towers. ",
  stratocumulus: "Stratocumulus clouds are patchy gray or white clouds that often have a dark honeycomb-like appearance."
}

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState({})
  const [confidences, setConfidences] = useState([])
  const [label, setLabel] = useState("")
  const [description, setDescription] = useState("")
  const [predictionBars, setPredictionBars] = useState([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile)
  };

  async function run() {
    setLoading(true)
    try {
      const app = await client("https://josephmdev-cloudatlas.hf.space/");
      const result = await app.predict("/predict", [selectedImage]);
      setLabel(result.data[0].label)
      setConfidences(result.data[0].confidences)
    } catch (error) {
      // Handle the error appropriately (e.g., show an error message)
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    run();
  }

  function getDescriptionByKey(key) {
    const matchingEntry = Object.entries(cloudDescriptions).filter(
      ([entryKey]) => entryKey === key
    );

    if (matchingEntry.length > 0) {
      return matchingEntry[0][1];
    } else {
      return "Description not found";
    }
  }


function renderOutput() {
  setDescription(getDescriptionByKey(label));
  setPredictionBars(
    confidences.map((prediction, index) => {
      const percent = Math.round(prediction.confidence * 100);
      const key = `${prediction.label}-${index}`;
      return (
        <React.Fragment key={key}>
          <ProgressBar value={percent} color="blue" className="mt-3" />
          <Flex>
            <Text>{prediction.label}</Text>
            <Text>{`${percent}%`}</Text>
          </Flex>
        </React.Fragment>
      );
    })
  );
};

useEffect(() => {
  renderOutput();
}, [label]);

  
  function clearInput() {
    setSelectedImage(null)
    setConfidences([])
    setPrediction({})
    setDescription("")
    setLabel("")
  }
    



  return (
    <div className='flex flex-col h-screen mb-2 space justify-between max-w-xs items-center mx-auto'>
      <div><div className='flex flex-row w-full items-start my-6 text-3xl select-none opacity-80 text-neutral-50'><img className='my-auto mr-1' src='/logoicon.svg' />CloudAtlas</div>
      <form method="post" className="w-full" encType="multipart/form-data">
        <div
          className="w-full h-48 mx-auto relative flex flex-col items-center justify-center" 
        >
          {selectedImage ?
            <img
              alt="not found"
              style={{ maxHeight: '180px', borderRadius: '10px' }}
              src={URL.createObjectURL(selectedImage)}
            />
            :
            <>
              <label
                id="uploadDiv"
                htmlFor='fileInput'
                className="w-full h-48 bg-neutral-100/10 shadow-sm rounded-lg cursor-pointer mx-auto relative flex flex-col items-center justify-center" 
              >
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                onChange={handleFileChange}
                accept="image/*"
              />
                <div className='text-neutral-100'>- click to upload cloud image -</div>
                </label>
            </>
          }
        </div>
    
        <div className='grid grid-cols-2 gap-2'>
          <Button className='my-5' variant='secondary' type='button' color='white' disabled={!selectedImage} onClick={clearInput}>clear image</Button>
          <Button className='my-5' type='submit' variant='primary' disabled={!selectedImage} loading={loading} onClick={handleSubmit}>identify cloud</Button>
        </div>
          

      </form>

      {confidences.length > 1 &&
        <Card className="max-w-sm mx-auto mb-10">
          <Card className=""><Text>{description}</Text></Card>
          {predictionBars}
        </Card>
      }</div>
      
        
      <footer className='w-full text-center text-sm text-neutral-400 pb-4'>built by <a className='underline hover:text-neutral-500 duration-300' href='https://josephm.dev/'>josephm.dev</a></footer>
    </div>
  )
}