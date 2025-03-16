
import React, { useState, useRef, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
  isVideoPlaying: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, isVideoPlaying }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Handle auto-play restrictions by playing after user interaction
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Auto-play prevented:', err));
      }
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isVideoPlaying) {
        audioRef.current.pause();
      } else if (!isMuted) {
        audioRef.current.play().catch(err => console.log('Play prevented:', err));
      }
    }
  }, [isVideoPlaying, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(err => console.log('Play prevented:', err));
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button 
        onClick={toggleMute}
        className="bg-gold/20 backdrop-blur-sm p-2 rounded-full transition-all hover:bg-gold/30"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? <VolumeX size={20} className="text-gold" /> : <Music size={20} className="text-gold" />}
      </button>
      <audio ref={audioRef} loop muted={isMuted}>
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
