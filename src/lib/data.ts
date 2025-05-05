
import { Video, Project, SocialLink } from './types';

export const featuredVideos: Video[] = [
  {
    id: '1',
    title: 'React Hooks Explained',
    description: 'Learn how to use React hooks with practical examples.',
    thumbnail: 'https://img.youtube.com/vi/placeholder1/maxresdefault.jpg',
    publishedAt: '2023-10-15',
    tags: ['React', 'Hooks', 'Frontend'],
    category: 'React',
    views: 15000,
    duration: '10:21'
  },
  {
    id: '2',
    title: 'Building APIs with Node.js and Express',
    description: 'Step-by-step guide to creating REST APIs with Node and Express.',
    thumbnail: 'https://img.youtube.com/vi/placeholder2/maxresdefault.jpg',
    publishedAt: '2023-09-28',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    category: 'Node.js',
    views: 12000,
    duration: '15:45'
  },
  {
    id: '3',
    title: 'MongoDB for Beginners',
    description: 'Introduction to MongoDB for beginners with practical examples.',
    thumbnail: 'https://img.youtube.com/vi/placeholder3/maxresdefault.jpg',
    publishedAt: '2023-08-15',
    tags: ['MongoDB', 'Database', 'NoSQL'],
    category: 'Database',
    views: 18500,
    duration: '12:10'
  },
  {
    id: '4',
    title: 'TypeScript Fundamentals',
    description: 'Learn TypeScript fundamentals and how to use them in your projects.',
    thumbnail: 'https://img.youtube.com/vi/placeholder4/maxresdefault.jpg',
    publishedAt: '2023-07-22',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    category: 'TypeScript',
    views: 22000,
    duration: '20:15'
  }
];

export const allVideos: Video[] = [
  ...featuredVideos,
  {
    id: '5',
    title: 'Full Stack Authentication',
    description: 'Learn how to implement authentication in a full stack application.',
    thumbnail: 'https://img.youtube.com/vi/placeholder5/maxresdefault.jpg',
    publishedAt: '2023-06-10',
    tags: ['Authentication', 'Security', 'Full Stack'],
    category: 'Security',
    views: 11000,
    duration: '18:30'
  },
  {
    id: '6',
    title: 'CSS Grid Layout',
    description: 'Master CSS Grid Layout with practical examples and projects.',
    thumbnail: 'https://img.youtube.com/vi/placeholder6/maxresdefault.jpg',
    publishedAt: '2023-05-15',
    tags: ['CSS', 'Grid', 'Frontend', 'Layout'],
    category: 'CSS',
    views: 9500,
    duration: '14:20'
  }
];

export const featuredProjects: Project[] = [
  {
    id: '1',
    name: 'Find Programmer',
    description: 'A developer-matching platform helping users find programmers via GitHub, Upwork, and referrals',
    imageUrl: 'frontend/public/Screenshot 2025-04-29 193932.png',
    githubUrl: 'https://github.com/Anasobeidat02/e-commerce',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    featured: true
  },
  {
    id: '2',
    name: 'Smart fuel station',
    description: 'A smart fuel station management system with real-time monitoring.',
    imageUrl: '/placeholder.svg',
    githubUrl: 'https://github.com/Anasobeidat02/task-manager',
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    featured: true
  },
  {
    id: '3',
    name: 'Real-time Chat Application',
    description: 'A real-time chat application using Socket.io.',
    imageUrl: '/placeholder.svg',
    githubUrl: 'https://github.com/Anasobeidat02/chat-app',
    technologies: ['Node.js', 'Express', 'Socket.io', 'React'],
    featured: true
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Anasobeidat02',
    icon: 'github'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@anas_obeidat',
    icon: 'youtube'
  },
  {
    name: 'Twitter',
    url: 'https://x.com/anasob6?t=iRz-cJRgzg-KCAQBHfaYQg&s=09',
    icon: 'twitter'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anas-m-obeidat?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    icon: 'linkedin'
  }
];

export const skills = [
  {
    category: 'Frontend',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express.js', 'NestJS', 'GraphQL', 'REST APIs']
  },
  {
    category: 'Database',
    technologies: ['MongoDB', 'PostgreSQL', 'Redis']
  },
  {
    category: 'DevOps',
    technologies: ['Docker', 'AWS', 'CI/CD', 'Git', 'GitHub Actions']
  }
];
