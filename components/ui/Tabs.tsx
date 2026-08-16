'use client';

import React, { createContext, useContext, useState } from 'react';

interface TabsContextValue { active: string; setActive: (v: string) => void; }
const TabsContext = createContext<TabsContextValue>({ active: '', setActive: () => {} });

interface TabsProps { defaultValue: string; children: React.ReactNode; className?: string; }
export default function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps { children: React.ReactNode; className?: string; }
Tabs.List = function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex items-center gap-1 bg-slate-100 rounded-xl p-1 ${className}`} role="tablist">
      {children}
    </div>
  );
};

interface TabsTriggerProps { value: string; children: React.ReactNode; }
Tabs.Trigger = function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActive(value)}
      className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
        isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps { value: string; children: React.ReactNode; className?: string; }
Tabs.Content = function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div role="tabpanel" className={className}>{children}</div>;
};
