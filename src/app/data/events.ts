export interface EventItem {
    id: number;
    name: string;
    description: string;
    image: string;
    loaded?: boolean;
  }
  
  export const EVENTS: EventItem[] = [
    {
      id: 1,
      name: 'Wedding',
      description: 'Elegant and traditional wedding setup with catering, décor, music, photography, and all essential services."',
      image: 'assets/images/events/wedding.jpg'
    },
    {
      id: 2,
      name: 'Engagement / Reception',
      description: 'Celebrate engagements and receptions with elegant décor, catering, music, and complete event arrangements.',
      image: 'assets/images/events/engagement.jpg'
    },
    {
      id: 3,
      name: 'Birthday Parties (Kids/Adults)',
      description: 'Fun-filled birthday party arrangements for all age groups with décor, entertainment, catering, and personalized themes',
      image: 'assets/images/events/birthday.jpg'
    },
    {
      id: 4,
      name: 'Baby Shower / Naming Ceremony',
      description: 'Joyful baby showers and naming ceremonies with custom décor, catering, and complete celebration services.',
      image: 'assets/images/events/naming-cermony.png'
    },
    {
      id: 5,
      name: 'House Warming',
      description: 'Traditional and modern housewarming setup with catering, décor, rituals, and essential celebration services',
      image: 'assets/images/events/house-warming.webp'
    },
    {
      id: 6,
      name: 'Corporate Events',
      description: 'Professional arrangements for corporate meetings, conferences, team events, with catering and essential services',
      image: 'assets/images/events/corporate.jpg'
    },
    {
      id: 7,
      name: 'Religious Events',
      description: 'Spiritual and cultural event services with traditional décor, rituals, catering, and personalized arrangements.',
      image: 'assets/images/events/religious.jpg'
    },
   
    {
      id: 9,
      name: 'School/College Events',
      description: 'Complete event services for school and college fests, annual days, and functions with stage setup, sound, and catering.',
      image: 'assets/images/events/college-events.jpg'
    },
    {
      id: 10,
      name: 'Private Parties',
      description: 'Custom setups for intimate gatherings and private celebrations with décor, food, and personalized services.',
      image: 'assets/images/events/private-party.jpg'
    }
  ];
  