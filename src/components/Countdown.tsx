
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("grid grid-cols-4 gap-4 md:gap-6", className)}>
      <div className="flex flex-col items-center">
        <div className="bg-navy-light border border-gold/50 rounded-lg p-4 w-full">
          <div className="text-3xl md:text-5xl font-bold text-gold text-center">{timeLeft.days}</div>
        </div>
        <span className="text-sm md:text-base mt-2 text-gold-light">Days</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-navy-light border border-gold/50 rounded-lg p-4 w-full">
          <div className="text-3xl md:text-5xl font-bold text-gold text-center">{timeLeft.hours}</div>
        </div>
        <span className="text-sm md:text-base mt-2 text-gold-light">Hours</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-navy-light border border-gold/50 rounded-lg p-4 w-full">
          <div className="text-3xl md:text-5xl font-bold text-gold text-center">{timeLeft.minutes}</div>
        </div>
        <span className="text-sm md:text-base mt-2 text-gold-light">Minutes</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-navy-light border border-gold/50 rounded-lg p-4 w-full">
          <div className="text-3xl md:text-5xl font-bold text-gold text-center">{timeLeft.seconds}</div>
        </div>
        <span className="text-sm md:text-base mt-2 text-gold-light">Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
