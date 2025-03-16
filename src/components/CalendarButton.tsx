
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface CalendarButtonProps {
  event: {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
  };
}

const CalendarButton: React.FC<CalendarButtonProps> = ({ event }) => {
  const formatGoogleCalendarDate = (date: Date) => {
    return format(date, "yyyyMMdd'T'HHmmss");
  };

  const generateGoogleCalendarUrl = () => {
    const { title, description, location, startDate, endDate } = event;
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      details: description,
      location: location,
      dates: `${formatGoogleCalendarDate(startDate)}/${formatGoogleCalendarDate(endDate)}`,
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <Button
      onClick={() => window.open(generateGoogleCalendarUrl(), '_blank')}
      className="bg-gold hover:bg-gold-light text-navy font-medium flex items-center gap-2"
    >
      <Calendar size={18} />
      <span>Add to Calendar</span>
    </Button>
  );
};

export default CalendarButton;
