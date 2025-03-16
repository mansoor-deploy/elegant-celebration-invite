
import React from 'react';
import { MapPin } from 'lucide-react';

interface VenueMapProps {
  location: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    mapUrl: string;
  };
}

const VenueMap: React.FC<VenueMapProps> = ({ location }) => {
  return (
    <div className="bg-navy-light rounded-lg overflow-hidden border border-gold/20">
      <div className="aspect-video w-full">
        <iframe
          src={location.mapUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Venue location map"
        ></iframe>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gold mb-2">{location.name}</h3>
        
        <div className="flex items-start gap-2">
          <MapPin size={20} className="text-gold-light mt-1 flex-shrink-0" />
          <p className="text-white/90">
            {location.address}<br />
            {location.city}, {location.postalCode}
          </p>
        </div>
        
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            `${location.address}, ${location.city}, ${location.postalCode}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-gold hover:text-gold-light underline transition-colors"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default VenueMap;
