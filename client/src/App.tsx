import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import NotFound from './pages/not-found';
import LanguageToggle from './components/LanguageToggle';
import './index.css';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-50">
          <Router />
          {/* Adding the language toggle with cultural flag animations */}
          <LanguageToggle position="top-right" showText={false} size="md" />
        </div>
      </LanguageProvider>
    </AppProvider>
  );
}

export default App;