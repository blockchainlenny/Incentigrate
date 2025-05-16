import React from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function LoginOptions() {
  const { login } = useAppContext();

  // Mock function that would typically handle wallet connection
  const handleWalletConnect = (type: 'phantom' | 'solflare' | 'google' | 'email') => {
    let displayName = '';
    let walletAddress = '';
    
    // Mock login data for demonstration
    switch (type) {
      case 'phantom':
        displayName = 'Phantom User';
        walletAddress = '8YLKofi3AzyGzYrJfTvRYnM7P3ZuQFXfm7UuCNLTruSx';
        break;
      case 'solflare':
        displayName = 'Solflare User';
        walletAddress = '6JkjwVLsbSDkdW5Y72e3jRsPrPYcBpyYsYJQE11Bmwy';
        break;
      case 'google':
        displayName = 'Mohammed A.';
        break;
      case 'email':
        displayName = 'amina@example.com';
        break;
    }
    
    login(type, displayName, walletAddress);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Connect to track your progress</h3>
      <p className="text-slate-600 mb-5">
        Connect your wallet or log in with a social account to start tracking your integration journey 
        and earn token rewards for completing steps.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <button 
          onClick={() => handleWalletConnect('phantom')}
          className="flex items-center justify-center gap-2 bg-[#AB9FF2] hover:bg-[#9A8BDE] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          <img src={require('../assets/phantom-icon.svg')} alt="Phantom" className="h-6 w-6" />
          <span>Phantom</span>
        </button>
        
        <button 
          onClick={() => handleWalletConnect('solflare')}
          className="flex items-center justify-center gap-2 bg-[#FC9D0D] hover:bg-[#E88F00] text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          <img src={require('../assets/solflare-icon.svg')} alt="Solflare" className="h-6 w-6" />
          <span>Solflare</span>
        </button>
        
        <button 
          onClick={() => handleWalletConnect('google')}
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
        >
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span>Google</span>
        </button>
        
        <button 
          onClick={() => handleWalletConnect('email')}
          className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
        >
          <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Email</span>
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="text-sm font-medium text-slate-800 mb-2">About wallet integration</h4>
        <p className="text-xs text-slate-600">
          In a production environment, this would connect to actual Solana wallets using 
          <code className="mx-1 px-1 py-0.5 bg-slate-100 rounded text-xs font-mono">@solana/wallet-adapter</code> 
          with wallet abstraction via services like Dynamic.xyz or Privy.io for a seamless user experience.
        </p>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-700">
        <p>
          <strong>Note:</strong> This is a demonstration version. In a live implementation, you would connect with 
          actual cryptocurrency wallets to store and manage your $O tokens on the Solana blockchain.
        </p>
      </div>
    </div>
  );
}