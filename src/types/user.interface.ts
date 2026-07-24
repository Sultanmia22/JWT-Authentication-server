export interface IUser {
  name: string;
  email: string;
  userName?: string;    
  password?: string;    
  role?: string;        
  image?: string;       
  provider?: string[];  
}