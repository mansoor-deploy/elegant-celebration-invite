
import React, { useState, useEffect } from 'react';
import Countdown from '@/components/Countdown';
import AudioPlayer from '@/components/AudioPlayer';
import VideoPlayer from '@/components/VideoPlayer';
import VideoBubble from '@/components/VideoBubble';
import RSVPForm from '@/components/RSVPForm';
import VenueMap from '@/components/VenueMap';
import CalendarButton from '@/components/CalendarButton';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Gift, Heart, Music, Cake, Party } from 'lucide-react';

const Index = () => {
  // Replace these with your actual event details
  const eventDate = new Date('2024-12-31T19:00:00');
  const eventEndDate = new Date('2025-01-01T02:00:00');
  
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isBubbleHidden, setIsBubbleHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // For demo purposes
  const audioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  const videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4"; // Placeholder video
  
  const location = {
    name: "The Grand Ballroom",
    address: "123 Celebration Avenue",
    city: "New York, NY",
    postalCode: "10001",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30597737004!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1620925205631!5m2!1sen!2sca"
  };
  
  const calendarEvent = {
    title: "Alex's 30th Birthday Celebration",
    description: "Join us for an elegant evening to celebrate Alex's 30th birthday. Dress code: Cocktail attire.",
    location: `${location.name}, ${location.address}, ${location.city}`,
    startDate: eventDate,
    endDate: eventEndDate
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.8;
      setHasScrolled(scrolled);
      
      if (scrolled && !isBubbleHidden && !isVideoOpen) {
        setIsBubbleHidden(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBubbleHidden, isVideoOpen]);
  
  const handleOpenVideo = () => {
    setIsVideoOpen(true);
    setIsBubbleHidden(true);
  };
  
  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    setIsBubbleHidden(false);
    setIsVideoPlaying(false);
  };
  
  return (
    <div className="min-h-screen relative">
      {/* Background Music */}
      <AudioPlayer 
        audioSrc={audioSrc} 
        isVideoPlaying={isVideoPlaying} 
      />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center relative">
        <div className="absolute inset-0 bg-[url('/stars-bg.png')] opacity-30 z-0"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl text-gold-light font-light mb-4 animate-fade-in">
            YOU'RE INVITED TO
          </h1>
          
          <div className="mb-6 inline-block">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 gold-gradient">
              Alex's 30th
            </h2>
            <h3 className="text-3xl md:text-5xl font-semibold text-white mb-6">
              Birthday Celebration
            </h3>
          </div>
          
          <Separator className="w-24 md:w-32 h-0.5 bg-gold/50 mx-auto my-8" />
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <Calendar size={24} className="text-gold" />
              <span className="text-xl">December 31, 2024</span>
            </div>
            
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold"></div>
            
            <div className="flex items-center gap-2">
              <Clock size={24} className="text-gold" />
              <span className="text-xl">7:00 PM</span>
            </div>
            
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold"></div>
            
            <div className="flex items-center gap-2">
              <Music size={24} className="text-gold" />
              <span className="text-xl">Cocktail Attire</span>
            </div>
          </div>
          
          <div className="mt-12">
            <h4 className="text-xl mb-4 text-white">Countdown to the Celebration</h4>
            <Countdown targetDate={eventDate} className="max-w-2xl mx-auto" />
          </div>
          
          <div className="mt-10">
            <CalendarButton event={calendarEvent} />
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-gold rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gold rounded-full"></div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="section bg-navy-light">
        <div className="container max-w-4xl">
          <h2 className="section-header text-center">The Celebration</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square overflow-hidden rounded-lg border-4 border-gold/30">
                <img 
                  src="/placeholder.svg" 
                  alt="Alex's Birthday" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Join us for an elegant evening to celebrate Alex's 30th birthday. 
                We've planned an unforgettable night filled with fine dining, 
                dancing, and creating memories that will last a lifetime.
              </p>
              
              <p className="text-lg leading-relaxed">
                Dress in your finest cocktail attire and prepare for a night 
                of celebration, joy, and honoring three incredible decades!
              </p>
              
              <div className="flex items-center gap-2 text-gold">
                <Heart size={20} />
                <span>Hosted with love by The Johnson Family</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Venue Section */}
      <section className="section">
        <div className="container max-w-4xl">
          <h2 className="section-header text-center">Venue & Details</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gold-light">Event Schedule</h3>
              
              <div className="space-y-4">
                <div className="bg-navy-light p-4 rounded-lg border border-gold/20">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <Gift size={20} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold">7:00 PM - 7:30 PM</h4>
                      <p>Welcome Reception</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-light p-4 rounded-lg border border-gold/20">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <Glass size={20} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold">7:30 PM - 9:00 PM</h4>
                      <p>Dinner & Toasts</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-light p-4 rounded-lg border border-gold/20">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <Cake size={20} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold">9:00 PM - 9:30 PM</h4>
                      <p>Cake Cutting</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-navy-light p-4 rounded-lg border border-gold/20">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <Music size={20} className="text-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold">9:30 PM - 2:00 AM</h4>
                      <p>Dancing & Celebration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <VenueMap location={location} />
            </div>
          </div>
        </div>
      </section>
      
      {/* RSVP Section */}
      <section className="section bg-navy-light">
        <div className="container max-w-4xl">
          <h2 className="section-header text-center">RSVP</h2>
          <p className="text-center text-xl mb-10">Please respond by December 1, 2024</p>
          
          <RSVPForm />
        </div>
      </section>
      
      {/* Video Bubble */}
      <VideoBubble 
        onClick={handleOpenVideo}
        isHidden={isBubbleHidden && !hasScrolled}
      />
      
      {/* Video Player */}
      <VideoPlayer 
        videoSrc={videoSrc}
        isOpen={isVideoOpen}
        onClose={handleCloseVideo}
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
      />
    </div>
  );
};

const Glass = ({ size, className }: { size: number, className: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M8 21v-5h8v5"/>
    <path d="M12 3v7"/>
    <path d="M18 4c-.8 0-1.72.5-2.5.962-.33.167-1 .838-1.5.838-1 0-1-3-2-3s-1 3-2 3c-.5 0-1.17-.671-1.5-.838C7.72 4.5 6.8 4 6 4"/>
    <path d="M10.1 8c.53.33 1.4.5 1.9.5s1.37-.17 1.9-.5"/>
    <path d="M5 4a2 2 0 0 0 2 2"/>
    <path d="M19 4a2 2 0 0 1-2 2"/>
  </svg>
);

export default Index;
