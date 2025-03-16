
import React from 'react';
import { Video } from 'lucide-react';

interface VideoBubbleProps {
  onClick: () => void;
  isHidden: boolean;
}

const VideoBubble: React.FC<VideoBubbleProps> = ({ onClick, isHidden }) => {
  return (
    <div 
      className={`video-bubble ${isHidden ? 'hidden' : ''}`}
      onClick={onClick}
      aria-label="Open invitation video"
    >
      <Video size={24} className="text-navy animate-pulse" />
    </div>
  );
};

export default VideoBubble;
