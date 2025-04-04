
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'business' | 'user';
  businessName?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
}
