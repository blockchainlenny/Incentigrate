import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import NotFound from './pages/not-found';
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
      <div className="min-h-screen bg-slate-50">
        <Router />
      </div>
    </AppProvider>
  );
}

export default App;