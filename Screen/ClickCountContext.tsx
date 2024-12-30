import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClickCountContextType {
  count: number;
  increment: () => void;
}

const ClickCountContext = createContext<ClickCountContextType | undefined>(undefined);

export const ClickCountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <ClickCountContext.Provider value={{ count, increment }}>
      {children}
    </ClickCountContext.Provider>
  );
};

export const useClickCount = (): ClickCountContextType => {
  const context = useContext(ClickCountContext);
  if (!context) {
    throw new Error('useClickCount must be used within a ClickCountProvider');
  }
  return context;
};
