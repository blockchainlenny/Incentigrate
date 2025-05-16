'use client';

import { AppProvider } from '@/app/contexts/AppContext';
import React from 'react';

export default function AppClientProvider({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
