export interface Industry {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    id: 1,
    title: 'Technology & Software',
    description: 'Product engineering, AI integration, and delivery velocity through high-performing teams.',
    image: 'https://images.pexels.com/photos/7988748/pexels-photo-7988748.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 2,
    title: 'Healthcare & Life Sciences',
    description: 'Digital health platforms, telemedicine workflows, and analytics that improve outcomes and operational velocity.',
    image: 'https://images.pexels.com/photos/32026163/pexels-photo-32026163.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 3,
    title: 'Banking & Finance',
    description: 'Cloud modernization, fintech automation, and resilient systems that keep risk low and trust high.',
    image: 'https://images.pexels.com/photos/30214870/pexels-photo-30214870.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 4,
    title: 'Retail & E-commerce',
    description: 'Scalable commerce, personalization, and supply chain visibility for faster, smarter growth.',
    image: 'https://images.pexels.com/photos/6169670/pexels-photo-6169670.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];
