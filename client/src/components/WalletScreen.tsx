import { useAppContext } from "@/contexts/AppContext";
import { Wallet, Coins, BookMarked, CheckIcon, MessageSquare, UserPlus } from "lucide-react";

export default function WalletScreen() {
  const { isLoggedIn, login, oTokenBalance, walletAddress, loginType } = useAppContext();

  const connectWallet = (type: 'phantom' | 'solflare') => {
    login(type);
  };
  
  const connectSocial = (type: 'google' | 'email') => {
    login(type);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Your Digital Wallet</h1>
        <p className="text-slate-600">Manage your Incentigrate tokens and transactions</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wallet Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-themeBlue to-themeGreen p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold opacity-90 mb-1">Incentigrate Balance</h2>
                  <p className="text-3xl font-bold">{oTokenBalance} $O</p>
                  <p className="mt-1 text-sm opacity-90">
                    {isLoggedIn 
                      ? `Connected via ${loginType} • ${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}` 
                      : "Connect your wallet to manage tokens"}
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Coins className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => connectWallet('phantom')}
                  disabled={isLoggedIn}
                  className={`flex-1 ${
                    isLoggedIn 
                      ? "bg-slate-300 cursor-not-allowed" 
                      : "bg-themeBlue hover:bg-blue-700"
                  } text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2`}
                >
                  <Wallet className="h-4 w-4" />
                  <span>{isLoggedIn ? "Connected" : "Connect Wallet"}</span>
                </button>
                {!isLoggedIn && (
                  <button 
                    onClick={() => connectSocial('google')}
                    className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Create Social Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {!isLoggedIn && (
            <>
              {/* Wallet Connection Options */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Connect Your Wallet</h2>
                <div className="space-y-4">
                  <button 
                    onClick={() => connectWallet('phantom')}
                    className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-themeBlue transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src="https://phantom.app/img/logo.png" alt="Phantom Wallet" className="w-10 h-10" />
                      <div className="text-left">
                        <h3 className="font-medium text-slate-800">Phantom</h3>
                        <p className="text-xs text-slate-500">Popular Solana wallet with browser extension and mobile app</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button 
                    onClick={() => connectWallet('solflare')}
                    className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-themeBlue transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-slate-800">Solflare</h3>
                        <p className="text-xs text-slate-500">Secure Solana wallet with hardware wallet support</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
                
                <div className="mt-6">
                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-sm">or create a social wallet</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">Don't have a crypto wallet? Create a simplified wallet using your social accounts:</p>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => connectSocial('google')}
                      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium py-3 px-4 rounded-lg border border-slate-300 transition-colors"
                    >
                      <GoogleIcon className="text-red-500 h-5 w-5" />
                      <span>Continue with Google</span>
                    </button>
                    
                    <button 
                      onClick={() => connectSocial('email')}
                      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-medium py-3 px-4 rounded-lg border border-slate-300 transition-colors"
                    >
                      <Mail className="text-blue-500 h-5 w-5" />
                      <span>Sign up with Email</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Transactions (Empty State) */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h2>
            <div className="text-center py-8">
              <div className="mx-auto bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <History className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">No transactions yet</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Connect your wallet and start earning tokens by completing learning modules and integration steps.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Earn Tokens Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">How to Earn Tokens</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-green-100 text-green-700 p-1.5 rounded-full mt-0.5">
                  <BookMarked className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 text-sm">Complete Learning Modules</h3>
                  <p className="text-xs text-slate-600">Earn 45-55 $O tokens for finishing each module</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full mt-0.5">
                  <CheckIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 text-sm">Finish Integration Steps</h3>
                  <p className="text-xs text-slate-600">Earn 3-20 $O tokens per completed official step</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-yellow-100 text-yellow-700 p-1.5 rounded-full mt-0.5">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 text-sm">Participate in Forum</h3>
                  <p className="text-xs text-slate-600">Earn 1-5 $O tokens for helpful contributions</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-700 p-1.5 rounded-full mt-0.5">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 text-sm">Refer Friends</h3>
                  <p className="text-xs text-slate-600">Earn 10 $O tokens for each new user you refer</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Token Usage Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Using Your Tokens</h2>
            <p className="text-sm text-slate-600 mb-4">$O tokens can be used for various benefits within the Incentigrate ecosystem:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-themeGreen mt-1" />
                <span className="text-sm text-slate-700">Unlock premium learning content</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-themeGreen mt-1" />
                <span className="text-sm text-slate-700">Exchange for services with partner providers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-themeGreen mt-1" />
                <span className="text-sm text-slate-700">Access to exclusive community events</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-4 w-4 text-themeGreen mt-1" />
                <span className="text-sm text-slate-700">Transfer to other cryptocurrency wallets</span>
              </li>
            </ul>
          </div>
          
          {/* FAQ Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Wallet FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-800 text-sm mb-1">What are $O tokens?</h3>
                <p className="text-xs text-slate-600">$O (Opportunity) tokens are digital rewards for completing integration activities on the platform.</p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-sm mb-1">Are crypto wallets safe?</h3>
                <p className="text-xs text-slate-600">Yes, when used correctly. Always keep your secret recovery phrase private and never share it.</p>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 text-sm mb-1">What's a social wallet?</h3>
                <p className="text-xs text-slate-600">A simplified crypto wallet that uses your Google or email account for authentication.</p>
              </div>
              <a href="#" className="text-themeBlue hover:text-themeGreen text-sm font-medium inline-flex items-center gap-1 mt-2">
                <span>View all FAQs</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Additional icons
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6856C14.0159 13.6501 12.1719 15.0001 10 15.0001C7.23859 15.0001 5.00003 12.7616 5.00003 10.0001C5.00003 7.23873 7.23859 5.00017 10 5.00017C11.2747 5.00017 12.4345 5.48017 13.317 6.27345L15.6741 3.91629C14.1826 2.52516 12.1997 1.66683 10 1.66683C5.39771 1.66683 1.66669 5.39786 1.66669 10.0001C1.66669 14.6024 5.39771 18.3335 10 18.3335C14.6023 18.3335 18.3334 14.6024 18.3334 10.0001C18.3334 9.44302 18.2738 8.89788 18.1711 8.36788Z" fill="currentColor" />
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor" />
  </svg>
);

const History = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor" />
  </svg>
);
