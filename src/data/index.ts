// ─── CosmosIQ Job Portal — Static Demo Data ────────────────────────────────

export const JOBS = [
  { id: 1, title: 'Senior Frontend Developer', company: 'TechNova Solutions', location: 'Bangalore, India', type: 'Full Time', salary: '₹18–25 LPA', logo: 'TN', color: '#6366f1', tags: ['React', 'TypeScript', 'Tailwind'], posted: '2 days ago', featured: true, category: 'Technology' },
  { id: 2, title: 'Product Manager', company: 'GrowthBase Inc.', location: 'Mumbai, India', type: 'Full Time', salary: '₹22–30 LPA', logo: 'GB', color: '#0ea5e9', tags: ['Agile', 'Roadmapping', 'Analytics'], posted: '1 day ago', featured: true, category: 'Management' },
  { id: 3, title: 'Data Scientist', company: 'AI Ventures', location: 'Remote', type: 'Remote', salary: '₹15–22 LPA', logo: 'AV', color: '#8b5cf6', tags: ['Python', 'ML', 'NLP'], posted: '3 days ago', featured: false, category: 'Data Science' },
  { id: 4, title: 'UX/UI Designer', company: 'PixelCraft Studios', location: 'Pune, India', type: 'Full Time', salary: '₹10–16 LPA', logo: 'PC', color: '#f59e0b', tags: ['Figma', 'User Research', 'Prototyping'], posted: '4 days ago', featured: true, category: 'Design' },
  { id: 5, title: 'Backend Engineer (Node.js)', company: 'Cloudify Systems', location: 'Hyderabad, India', type: 'Full Time', salary: '₹14–20 LPA', logo: 'CS', color: '#10b981', tags: ['Node.js', 'PostgreSQL', 'Docker'], posted: '5 days ago', featured: false, category: 'Technology' },
  { id: 6, title: 'Digital Marketing Manager', company: 'BrandBoost Media', location: 'Delhi, India', type: 'Full Time', salary: '₹8–14 LPA', logo: 'BB', color: '#ef4444', tags: ['SEO', 'Paid Ads', 'Analytics'], posted: '6 days ago', featured: false, category: 'Marketing' },
  { id: 7, title: 'DevOps Engineer', company: 'Infra360', location: 'Remote', type: 'Remote', salary: '₹16–24 LPA', logo: 'I3', color: '#14b8a6', tags: ['AWS', 'Kubernetes', 'CI/CD'], posted: '1 week ago', featured: false, category: 'Technology' },
  { id: 8, title: 'HR Business Partner', company: 'PeopleFirst Corp', location: 'Chennai, India', type: 'Full Time', salary: '₹10–16 LPA', logo: 'PF', color: '#f97316', tags: ['Talent Mgmt', 'HRBP', 'Culture'], posted: '2 days ago', featured: false, category: 'Human Resources' },
];

export const COMPANIES = [
  { name: 'TechNova Solutions', logo: 'TN', color: '#6366f1', industry: 'Software / SaaS', openJobs: 12, location: 'Bangalore' },
  { name: 'GrowthBase Inc.', logo: 'GB', color: '#0ea5e9', industry: 'FinTech', openJobs: 8, location: 'Mumbai' },
  { name: 'AI Ventures', logo: 'AV', color: '#8b5cf6', industry: 'Artificial Intelligence', openJobs: 6, location: 'Remote' },
  { name: 'PixelCraft Studios', logo: 'PC', color: '#f59e0b', industry: 'Design & Creative', openJobs: 4, location: 'Pune' },
  { name: 'Cloudify Systems', logo: 'CS', color: '#10b981', industry: 'Cloud & DevOps', openJobs: 9, location: 'Hyderabad' },
  { name: 'BrandBoost Media', logo: 'BB', color: '#ef4444', industry: 'Marketing & Advertising', openJobs: 5, location: 'Delhi' },
];

export const BLOG_POSTS = [
  { id: 1, title: 'How to Build an ATS-Friendly Resume in 2026', category: 'Resume Tips', author: 'Priya Sharma', date: 'Feb 18, 2026', readTime: '5 min', image: '📝', excerpt: 'Modern recruiters use ATS to filter thousands of resumes. Here is how to make yours stand out with the right keywords, formatting, and structure.' },
  { id: 2, title: 'Top 10 Skills Employers Look for in 2026', category: 'Career Advice', author: 'Rahul Mehta', date: 'Feb 15, 2026', readTime: '7 min', image: '🚀', excerpt: 'The job market is evolving rapidly. From AI literacy to emotional intelligence — discover the skills that make candidates irresistible in 2026.' },
  { id: 3, title: 'How to Ace Behavioral Interviews with the STAR Method', category: 'Interview Tips', author: 'Ananya Singh', date: 'Feb 12, 2026', readTime: '6 min', image: '🎯', excerpt: 'The STAR method (Situation, Task, Action, Result) is your secret weapon for answering tough behavioral interview questions confidently.' },
  { id: 4, title: 'Remote Work in 2026: Opportunities and Challenges', category: 'Industry Trends', author: 'Vikram Nair', date: 'Feb 10, 2026', readTime: '8 min', image: '🌐', excerpt: 'Remote work has reshaped the global job market. Explore the latest trends, top remote-friendly industries, and how to position yourself.' },
  { id: 5, title: 'Salary Negotiation: How to Get What You Deserve', category: 'Career Advice', author: 'Divya Kapoor', date: 'Feb 8, 2026', readTime: '6 min', image: '💰', excerpt: 'Negotiating salary is one of the most valuable career skills — yet most professionals leave money on the table. Here is a proven framework.' },
  { id: 6, title: 'LinkedIn Profile Tips That Attract Recruiters', category: 'Job Search', author: 'Arjun Tiwari', date: 'Feb 5, 2026', readTime: '5 min', image: '🔗', excerpt: 'Your LinkedIn profile is your digital resume. Optimize it with these expert-backed tips to get noticed by top recruiters in your industry.' },
];

export const TESTIMONIALS = [
  { name: 'Sneha Rathod', role: 'Software Engineer at TechNova', avatar: 'SR', rating: 5, text: 'CosmosIQ matched me with my dream job in just 2 weeks! The AI recommendations were spot-on and the application process was smooth.' },
  { name: 'Karthik Menon', role: 'Product Manager at GrowthBase', avatar: 'KM', rating: 5, text: 'The skill assessment feature helped me identify gaps and the interview scheduler saved so much back-and-forth. Highly recommend!' },
  { name: 'Ritika Joshi', role: 'HR Manager at Infra360', avatar: 'RJ', rating: 5, text: 'As an employer, the candidate quality on CosmosIQ is exceptional. We hired 3 senior engineers within a month of posting. Worth every rupee!' },
  { name: 'Aditya Verma', role: 'Data Scientist at AI Ventures', avatar: 'AV', rating: 5, text: 'The resume builder gave me a professional edge. Multiple recruiters reached out within days of updating my profile. Game changer!' },
];

export const STATS = [
  { label: 'Active Jobs', value: '50,000+', icon: '💼' },
  { label: 'Registered Companies', value: '12,000+', icon: '🏢' },
  { label: 'Job Seekers', value: '5 Million+', icon: '👥' },
  { label: 'Successful Placements', value: '2 Million+', icon: '🎉' },
];

export const JOB_CATEGORIES = [
  { name: 'Technology', count: 12400, icon: '💻', color: '#6366f1' },
  { name: 'Marketing', count: 3200, icon: '📢', color: '#f59e0b' },
  { name: 'Finance', count: 4100, icon: '📊', color: '#10b981' },
  { name: 'Design', count: 2800, icon: '🎨', color: '#f97316' },
  { name: 'Healthcare', count: 5600, icon: '🏥', color: '#ef4444' },
  { name: 'Education', count: 3900, icon: '📚', color: '#8b5cf6' },
  { name: 'Human Resources', count: 2400, icon: '🤝', color: '#14b8a6' },
  { name: 'Operations', count: 3100, icon: '⚙️', color: '#0ea5e9' },
];
