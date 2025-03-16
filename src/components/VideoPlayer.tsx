
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onPlay: () => void;
  onPause: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  isOpen,
  onClose,
  onPlay,
  onPause
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const handlePlay = () => {
      onPlay();
    };
    
    const handlePause = () => {
      onPause();
    };
    
    const handleEnded = () => {
      onPause();
    };
    
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);
    
    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [onPlay, onPause]);
  
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video play prevented:', err));
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video position when closed
    }
  }, [isOpen]);
  
  const handleCloseClick = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
    onPause(); // Ensure we signal that the video is paused when closing
  };
  
  return (
    <div className={`video-container ${!isOpen ? 'hidden' : ''}`}>
      <div className="relative max-w-3xl w-full mx-4">
        <button 
          className="absolute -top-12 right-0 text-white hover:text-gold transition-colors"
          onClick={handleCloseClick}
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        
        <div className="rounded-md overflow-hidden border-2 border-gold/50">
          <video 
            ref={videoRef}
            src={videoSrc}
            controls
            className="w-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
