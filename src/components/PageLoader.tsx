
import React from 'react';
import { Cake } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = React.useState(0);
  
  React.useEffect(() => {
    if (isLoading) {
      // Reset progress
      setProgress(0);
      
      // Animate progress
      const timer = setInterval(() => {
        setProgress(prev => {
          const newValue = prev + 5;
          if (newValue >= 100) {
            clearInterval(timer);
            return 100;
          }
          return newValue;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [isLoading]);
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy">
      <div className="w-full max-w-md px-4 flex flex-col items-center gap-6">
        <div className="relative">
          <Cake size={60} className="text-gold animate-pulse" />
          <div className="absolute w-2 h-2 rounded-full bg-gold animate-ping top-0 right-0" />
        </div>
        
        <h2 className="text-3xl md:text-4xl text-gold font-playfair font-bold">
          Preparing Your Invitation
        </h2>
        
        <Progress value={progress} className="w-full h-2 bg-navy-light">
          <div 
            className="h-full bg-gradient-to-r from-gold/60 to-gold"
            style={{ width: `${progress}%` }}
          ></div>
        </Progress>
        
        <p className="text-gold-light text-sm">{progress}% complete</p>
      </div>
    </div>
  );
};

export default PageLoader;
