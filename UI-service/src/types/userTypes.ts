export interface UserType {
    id: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin' | 'editor';
    preferredTopics: string[];
    email: string;
    dateJoined?: string;
    lastLogin?: string;
  }
