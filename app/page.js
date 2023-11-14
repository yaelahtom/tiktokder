"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { motion } from 'framer-motion';
import DownloadButton from './downloadbutton';

const VerticalRunningText = ({ text }) => {
  // Define the animation properties
  const textMotion = {
    initial: { y: 0 },  // Start off-screen at the bottom
    animate: { y: '-100vh' }, // End off-screen at the top
    transition: {
      repeat: Infinity,  // Loop the animation
      repeatType: "loop",
      duration: 7,     // Duration of one loop; adjust as needed for speed
      ease: "linear"    // Linear easing for a smooth continuous scroll
    }
  };
  const items = []; // Array to hold the text items
  const numberOfItems = 100; // Adjust the number to fill the vertical space

  // Fill the items array with multiple text elements
  for (let i = 0; i < numberOfItems; i++) {
    items.push(
      <span key={ i } className="text-5xl italic">{ text }</span>
    );
  }

  return (
    <div className="overflow-hidden h-full"> {/* Container must have a fixed height */}
      <motion.div
        className="whitespace-nowrap"
        {...textMotion}
      >
        {/* Map over the items array to render them */}
        <div className="flex flex-col items-center max-h-14">
          {items.map((item) => item)}
        </div>
      </motion.div>
    </div>
  );
};


const Page = () => {
  const [link, setLink] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');

  const fetchVideoData = async (videoUrl) => {
    try {
      const response = await axios.get(`/api/proxy`, { params: { url: videoUrl } });
      console.log(response.data.data.download.video.NoWMSource.url); // This should log the correct URL
      return response.data.data; // Return the `data` property of the response
    } catch (error) {
      console.error('Error fetching video data:', error);
      setError('Failed to fetch video data.');
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setDownloadLink('');

    const videoData = await fetchVideoData(link);

    // Make sure to access the nested properties correctly based on the logged structure
    if (videoData && videoData.download && videoData.download.video && videoData.download.video.NoWMSource) {
      setDownloadLink(videoData.download.video.NoWMSource.url); // Set the correct URL to state
    } else {
      setError('Error retrieving video data or video URL not found.');
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={ handleSubmit } className='flex flex-col items-center w-full pt-4' style={ { color: '#f72e2a' } }>
        {/* intro start */ }
        <div className="w-full p-4 border-b-2" style={ { borderColor: '#f72e2a' } }>
          <p className="font-mono text-center">
          This is the project I made for tech fair submissions. Anyway, I do build products and solve problems. Currently accepting friendships.
          </p>
        </div>
        {/* intro tiktok */ }
        <div className="w-full p-4 border-b-2" style={ { borderColor: '#f72e2a' } }>
          <p className="font-mono text-center">
            This TikTok Downloader might be useful for yall. All downloads are uncompressed and without watermarks.
          </p>
        </div>
        {/* running text */ }
        <div className="flex w-full p-4 border-b-2" style={ { borderColor: '#f72e2a' } }>
          <div className='flex-1 p-2' style={ { borderRight: '2px solid #f72e2a' } }>
            <VerticalRunningText text="Tech" />
          </div>
          <div className='flex-1 p-2'>
            <VerticalRunningText text="Fair" />
          </div>
        </div>

        {/* enter the link */ }
        <div className="w-full p-4 border-b-2" style={ { borderColor: '#f72e2a' } }>
          <input
            type="text"
            placeholder="Enter TikTok link here."
            className="w-full font-mono text-center bg-transparent border-none outline-none"
            style={ { caretColor: '#f72e2a' } }
            value={ link }
            onChange={ (e) => setLink(e.target.value) }
          />
        </div>
        {/* download button */ }
        <div className="w-full flex justify-center p-4 mt-28">
        <DownloadButton onDownload={handleSubmit} />
      </div>
        {/* Download link */ }
        { downloadLink && (
          <div className="w-full flex justify-center p-4">
            <a
              href={ downloadLink }
              target="_blank"
              rel="noopener noreferrer"
            >
              Direct Download Link
            </a>
          </div>
        ) }
      </form>
      { error && <p className="text-center text-red-600">{ error }</p> }
    </>
  );
};

export default Page;
