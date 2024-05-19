import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  image?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    console.log('Retrieved storedUser from localStorage:', storedUser); // Log the retrieved value
    try {
      return storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  });

  useEffect(() => {
    console.log('User state changed:', user); // Log user state changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User stored in localStorage:', user);
    } else {
      localStorage.removeItem('user');
      console.log('No user found, removed from localStorage');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext };
export type { UserContextType };