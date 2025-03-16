
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guestCount: '1',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "RSVP Received!",
        description: formData.attendance === 'yes' 
          ? `Thank you, ${formData.name}! We look forward to celebrating with you and your guests.` 
          : `Thank you for your response, ${formData.name}. We'll miss you at the celebration!`,
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        attendance: '',
        guestCount: '1',
        message: ''
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="space-y-3">
        <Input 
          placeholder="Your Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required
          className="border-gold/30 bg-navy-light/80 focus:border-gold"
        />
        
        <Input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required
          className="border-gold/30 bg-navy-light/80 focus:border-gold"
        />
        
        <Select 
          value={formData.attendance} 
          onValueChange={(value) => handleSelectChange(value, 'attendance')}
          required
        >
          <SelectTrigger className="border-gold/30 bg-navy-light/80 focus:border-gold">
            <SelectValue placeholder="Will you attend?" />
          </SelectTrigger>
          <SelectContent className="bg-navy-light border-gold/30">
            <SelectItem value="yes">Yes, I'll be there!</SelectItem>
            <SelectItem value="no">Sorry, I can't make it</SelectItem>
            <SelectItem value="maybe">Maybe, I'll let you know</SelectItem>
          </SelectContent>
        </Select>
        
        {formData.attendance === 'yes' && (
          <Select 
            value={formData.guestCount} 
            onValueChange={(value) => handleSelectChange(value, 'guestCount')}
          >
            <SelectTrigger className="border-gold/30 bg-navy-light/80 focus:border-gold">
              <SelectValue placeholder="Number of guests" />
            </SelectTrigger>
            <SelectContent className="bg-navy-light border-gold/30">
              <SelectItem value="1">Just me</SelectItem>
              <SelectItem value="2">2 guests</SelectItem>
              <SelectItem value="3">3 guests</SelectItem>
              <SelectItem value="4">4 guests</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        <Textarea 
          placeholder="Leave a message (optional)" 
          name="message" 
          value={formData.message} 
          onChange={handleChange}
          className="border-gold/30 bg-navy-light/80 focus:border-gold min-h-24"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-gold hover:bg-gold-light text-navy font-medium"
      >
        {isSubmitting ? "Sending..." : "Send RSVP"}
      </Button>
    </form>
  );
};

export default RSVPForm;
