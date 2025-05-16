import React from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function LoginOptions() {
  const { login } = useAppContext();

  return (
    <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 mb-6">
      <h3 className="text-lg font-medium text-slate-800 mb-4">Connect to start earning</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <button 
          onClick={() => login('phantom')}
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
        >
          <img src="https://phantom.app/img/logo.png" alt="Phantom" className="h-5 w-5"/>
          <span>Phantom</span>
        </button>
        <button 
          onClick={() => login('solflare')}
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
        >
          <SolflareIcon className="h-5 w-5 text-orange-500" />
          <span>Solflare</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button 
          onClick={() => login('google')}
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
        >
          <GoogleIcon className="h-5 w-5 text-red-500" />
          <span>Google</span>
        </button>
        <button 
          onClick={() => login('email')}
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
        >
          <EmailIcon className="h-5 w-5 text-blue-500" />
          <span>Email</span>
        </button>
      </div>
    </div>
  );
}

// SVG Icons
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const SolflareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="currentColor" />
    <path d="M7.5 14.5l2.5-2.5-2.5-2.5L5 12l2.5 2.5zM12 19l2.5-2.5-2.5-2.5L9.5 16.5 12 19zM12 9l2.5-2.5L12 4 9.5 6.5 12 9zM16.5 14.5l2.5-2.5-2.5-2.5L14 12l2.5 2.5z" fill="#FFF" />
  </svg>
);