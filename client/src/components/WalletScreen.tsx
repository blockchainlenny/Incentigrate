import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Wallet, Send, ArrowDownCircle, RefreshCw, Copy, ExternalLink, Check, Gem, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletScreen() {
  const { isLoggedIn, oTokenBalance, userName, loginType, walletAddress } = useAppContext();
  const { login, logout } = useAppContext();
  const { t } = useLanguage(); // Add translation support
  
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  
  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      alert("Wallet address copied to clipboard");
    }
  };
  
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransferring(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      setIsTransferring(false);
      setTransferAmount("");
      setRecipientAddress("");
      alert(`Transfer of ${transferAmount} $O tokens simulated.`);
    }, 2000);
  };
  
  const formatWalletAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const transactionHistory = [
    { 
      id: 'tx1', 
      type: 'Reward', 
      amount: 50, 
      date: '2023-05-14', 
      description: 'Completion of "German Basics" module' 
    },
    { 
      id: 'tx2', 
      type: 'Reward', 
      amount: 10, 
      date: '2023-05-10', 
      description: 'Completed "Residence Registration" step' 
    },
    { 
      id: 'tx3', 
      type: 'Reward', 
      amount: 30, 
      date: '2023-05-05', 
      description: 'Completed "Digital Tools" module' 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Wallet & Rewards</h1>
      
      {!isLoggedIn ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col items-center text-center p-6">
            <Wallet className="h-16 w-16 text-slate-400 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 mb-2">Connect Your Wallet</h2>
            <p className="text-slate-600 mb-6 max-w-md">
              Connect your wallet to track your integration progress and earn $O tokens for completed integration steps and learning modules.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mb-4">
              <button 
                onClick={() => login('phantom')}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                <img src="https://phantom.app/img/logo.png" alt="Phantom" className="h-5 w-5" />
                <span>Phantom</span>
              </button>
              
              <button 
                onClick={() => login('solflare')}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 30 30" fill="currentColor">
                  <circle cx="15" cy="15" r="15" fill="currentColor" />
                  <path d="M9 12.5l2.5-2.5-2.5-2.5L6.5 10 9 12.5zM15 18.5l2.5-2.5-2.5-2.5-2.5 2.5 2.5 2.5zM15 8.5l2.5-2.5-2.5-2.5-2.5 2.5L15 8.5zM21 12.5l2.5-2.5-2.5-2.5-2.5 2.5L21 12.5z" fill="#FFF" />
                </svg>
                <span>Solflare</span>
              </button>
            </div>
            
            <div className="text-sm text-slate-500 mb-4">Or connect with</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              <button 
                onClick={() => login('google')}
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
                onClick={() => login('email')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium py-2.5 px-4 rounded-lg border border-slate-300 transition-colors"
              >
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Email</span>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-700 max-w-md">
              <p>
                <strong>Note:</strong> This is a demonstration. In a live version, you would connect with actual 
                cryptocurrency wallets to store and manage your $O tokens on the Solana blockchain.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-xl shadow-md p-6 mb-6 text-white">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <p className="text-blue-100 mb-1">Connected as</p>
                <h2 className="text-xl font-bold mb-2">{userName}</h2>
                <div className="flex items-center mb-1 text-sm">
                  <p className="text-blue-100 mr-1">Wallet:</p>
                  <p className="font-mono">{formatWalletAddress(walletAddress)}</p>
                  <button 
                    onClick={handleCopyAddress}
                    className="bg-blue-800/30 hover:bg-blue-800/50 p-1 rounded ml-2 text-blue-100"
                    title="Copy address"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="text-sm text-blue-100">via {loginType}</p>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
                <p className="text-blue-100 text-sm">$O Token Balance</p>
                <div 
                  className="cursor-pointer transform transition-transform hover:scale-105 group" 
                  onClick={() => document.getElementById('token-redemption')?.scrollIntoView({behavior: 'smooth'})}
                >
                  <h3 className="text-3xl font-bold mb-1">{oTokenBalance} $O</h3>
                  <div className="flex items-center justify-center text-xs text-blue-100 group-hover:text-white">
                    <ArrowDownCircle className="h-3 w-3 mr-1" />
                    <span>View redemption options</span>
                  </div>
                </div>
                <button 
                  className="mt-2 text-sm flex items-center bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                  onClick={() => logout()}
                >
                  <span className="mr-1">Disconnect</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Three feature boxes side by side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Token Redemption Box */}
            <div id="token-redemption" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Token Redemption</h2>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                  <ArrowDownCircle className="h-4 w-4 mr-2" />
                  Claim Your $O Tokens
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  You can claim your $O tokens after a 3-month holding period and when your balance is at least 5,000 $O.
                </p>
                
                {oTokenBalance >= 5000 ? (
                  <div>
                    <div className="mb-3 p-2 bg-white rounded border border-blue-200 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Available to claim:</p>
                        <p className="text-xl font-bold text-blue-700">{oTokenBalance} $O</p>
                      </div>
                      <button 
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md"
                        onClick={() => alert("In the real application, this would initiate the Solana token transfer to your wallet. The tokens would be transferred on-chain.")}
                      >
                        Claim Now
                      </button>
                    </div>
                    <p className="text-xs text-blue-600">Next claim available: Immediately</p>
                  </div>
                ) : (
                  <div>
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-slate-700">Progress to minimum claim</span>
                        <span className="font-medium text-blue-700">{Math.round((oTokenBalance / 5000) * 100)}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round((oTokenBalance / 5000) * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-blue-600">
                      {5000 - oTokenBalance} more $O tokens needed to reach minimum
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Earliest claim: {new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-slate-600">
                <h3 className="font-medium text-slate-800 mb-2">Claim Rules:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span>Minimum balance: 5,000 $O tokens</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                    <span>3-month holding period required</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Token Transfer Box */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Transfer Tokens</h2>
              
              <form onSubmit={handleTransfer}>
                <div className="mb-4">
                  <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                    Amount ($O)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    required
                    min="1"
                    max={oTokenBalance.toString()}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="recipient" className="block text-sm font-medium text-slate-700 mb-1">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 8zH5G..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  disabled={isTransferring || !transferAmount || !recipientAddress}
                >
                  {isTransferring ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Tokens
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* About Token Box */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">About $O Token</h2>
              <p className="text-sm text-slate-600 mb-4">
                The $O token powers the Incentigrate ecosystem and rewards refugees for completing integration steps.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm">
                <h3 className="font-medium text-slate-800 mb-2">Tokenomics:</h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1 mr-2"></div>
                    <span>100% of tokens earned through platform activities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1 mr-2"></div>
                    <span>Backed by real-world integration support services</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1 mr-2"></div>
                    <span>Usable for premium services or fiat redemption</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Transaction History Section (Full Width) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Transaction History</h2>
            
            {transactionHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-4 py-2 rounded-l-lg">Type</th>
                      <th className="text-left px-4 py-2">Description</th>
                      <th className="text-right px-4 py-2">Amount</th>
                      <th className="text-right px-4 py-2 rounded-r-lg">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistory.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-100">
                        <td className="px-4 py-3">
                          <span className="flex items-center">
                            <ArrowDownCircle className="h-4 w-4 text-green-500 mr-1" />
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-700">{tx.description}</td>
                        <td className="px-4 py-3 text-right font-medium text-green-600">+{tx.amount} $O</td>
                        <td className="px-4 py-3 text-right text-slate-500">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">No transactions yet</p>
                <p className="text-sm text-slate-400 mt-1">
                  Complete learning modules and integration steps to earn $O tokens
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}