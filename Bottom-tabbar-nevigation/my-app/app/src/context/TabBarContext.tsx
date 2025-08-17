import React, { createContext, useContext, useMemo, useState } from 'react';

export type TabBarVariant = 'default' | 'layout1' | 'layout2' | 'layout3';

type TabBarContextValue = {
  variant: TabBarVariant;
  setVariant: (variant: TabBarVariant) => void;
};

const TabBarContext = createContext<TabBarContextValue | undefined>(undefined);

export const TabBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<TabBarVariant>('layout1'); 
  const value = useMemo(() => ({ variant, setVariant }), [variant]);
  return <TabBarContext.Provider value={value}>{children}</TabBarContext.Provider>;
};

export const useTabBar = (): TabBarContextValue => {
  const ctx = useContext(TabBarContext);
  if (!ctx) throw new Error('useTabBar must be used within TabBarProvider');
  return ctx;
};

