import React, { useRef, useState } from "react";
import "./Card.css";

interface CardProps {
  id: string;
  name: string;
  price: number;
  video: string;
  description: string;
  unlocked: Promise<boolean>;
  isOwner: boolean;
  handlePayClick: (id: string, price: number) => Promise<boolean>; 
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  price,
  video,
  description,
  isOwner,
  handlePayClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoUnlocked, setIsVideoUnlocked] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false); 

  const handlePlayVideo = async () => {
    if (isVideoUnlocked || isOwner) {
      setIsVideoPlaying(true); 
    }
  };

  const handleWatchButtonClick = async () => {
    setButtonDisabled(true);
    const isUnlocked = await handlePayClick(id, price); 
    if (isUnlocked) {
      setIsVideoUnlocked(true);
      setIsVideoPlaying(true); 
    } else {
      setButtonDisabled(false);
    }
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false); 
    setIsVideoUnlocked(false);
    setButtonDisabled(false);
  };

  return (
    <>
      <div className={`card-container ${isVideoPlaying ? 'blur-background' : ''}`} onClick={handlePlayVideo}>
        <video ref={videoRef} className="card-image" controls={isVideoUnlocked || isOwner}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!(isVideoUnlocked || isOwner) && <div className="video-locked-overlay">Video is locked</div>}
        <div className="card-details">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Price: {price} ETH</p>
        </div>
        {!isOwner && (
          <button onClick={(e) => { e.stopPropagation(); handleWatchButtonClick(); }} disabled={buttonDisabled}>
            Watch
          </button>
        )}
      </div>
      {isVideoPlaying && (
        <div className="video-overlay">
          <div className="overlay-content">
            <video ref={videoRef} controls autoPlay className="overlay-video">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button className="close-button" onClick={handleCloseVideo}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
