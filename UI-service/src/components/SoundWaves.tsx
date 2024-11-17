import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import audioFile from '../assets/Queen.mp3';

const SoundWaves: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement | null>(null); // Reference to the waveform container
  const wavesurferRef = useRef<WaveSurfer | null>(null); // Reference to the WaveSurfer instance
  const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause

  useEffect(() => {
    if (waveformRef.current) {
      // Initialize WaveSurfer instance
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#FF7741',
        progressColor: '#FF6410',
        height: 50,
        barWidth: 7,
        barRadius: 3,
        barGap: 5,
        cursorWidth: 0,
      });

      // Load the audio file
      wavesurferRef.current.load(audioFile);

      // Listen for the 'finish' event
      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false); // Reset play button
        wavesurferRef.current?.seekTo(0); // Move cursor to the start
      });

      // Cleanup on component unmount
      return () => wavesurferRef.current?.destroy();
    }
  }, []);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="max-w-[1000px] mx-auto px-4 py-3">
      <div className="flex justify-end">
        <div className="flex justify-center items-center gap-5 px-5 w-[300px] md:w-[350px] h-[75px] bg-background rounded-lg shadow-grey-300 dark:shadow-gray-700 shadow-md">
          <i
            className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-primary-text text-2xl cursor-pointer`}
            onClick={handlePlayPause}
          ></i>
          <div id="waveform" ref={waveformRef} className="w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default SoundWaves;
