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

  const handlePlayVideo = async () => {
    if (isVideoUnlocked || isOwner) {
      videoRef.current?.play();
    }
  };

  const handleWatchButtonClick = async () => {
    setButtonDisabled(true);
    const isUnlocked = await handlePayClick(id, price); 
    if (isUnlocked) {
      setIsVideoUnlocked(true);
    } else {
      setButtonDisabled(false);
    }
  };

  return (
    <div className="card-container" onClick={handlePlayVideo}>
      <video ref={videoRef} className="card-image" controls={isVideoUnlocked || isOwner}>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!(isVideoUnlocked || isOwner) && <div className="video-locked-overlay">Video is locked</div>}
      <div className="card-details">
        <p>{name}</p>
        <p>{description}</p>
        <p>Price: {price} ETH</p>
      </div>
      {!isOwner && (
        <button onClick={(e) => { e.stopPropagation(); handleWatchButtonClick(); }} disabled={buttonDisabled}>Watch</button>
      )}
    </div>
  );
};

export default Card;
