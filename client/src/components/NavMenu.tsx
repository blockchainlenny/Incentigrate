import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessagesSquare, 
  Wallet as WalletIcon, 
  Map,
  UserCircle,
  LogOut,
  Gem
} from 'lucide-react';

interface NavMenuProps {
  currentView: string;
  navigateTo: (view: string, moduleId?: string, moduleTitle?: string) => void;
}

export default function NavMenu({ currentView, navigateTo }: NavMenuProps) {
  const { isLoggedIn, userName, oTokenBalance, logout } = useAppContext();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'module_list', label: 'Learning', icon: BookOpen },
    { id: 'integration_journey', label: 'My Path', icon: Map },
    { id: 'forum', label: 'Forum', icon: MessagesSquare },
    { id: 'wallet', label: 'Wallet', icon: WalletIcon },
  ];

  return (
    <div className="bg-themeBlue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <h1 className="font-bold text-xl mr-2">Incentigrate</h1>
            <span className="text-xs px-2 py-0.5 bg-blue-500 rounded-full">Beta</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id || 
                (item.id === 'module_list' && currentView === 'single_module');
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`py-2 px-3 rounded-md flex items-center transition-colors ${
                    isActive ? 'bg-themeGreen text-white' : 'hover:bg-blue-700 text-slate-200'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Info / Login Button */}
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center">
                <div className="hidden sm:flex items-center bg-blue-600/30 px-3 py-1.5 rounded-full mr-3">
                  <Gem className="h-4 w-4 text-teal-300 mr-1" />
                  <span className="font-medium text-teal-100">{oTokenBalance} $O</span>
                </div>
                <div className="hidden sm:flex items-center mr-2 text-slate-200">
                  <UserCircle className="h-5 w-5 mr-1" />
                  <span>{userName}</span>
                </div>
                <button 
                  onClick={() => logout()}
                  className="text-sm bg-blue-600/30 hover:bg-blue-600/50 rounded-md p-2 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigateTo('wallet')}
                className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around pb-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id || 
              (item.id === 'module_list' && currentView === 'single_module');
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="flex flex-col items-center"
              >
                <div className={`p-2 rounded-full ${isActive ? 'bg-themeGreen' : 'bg-blue-700/30'}`}>
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-200'}`} />
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-white font-medium' : 'text-slate-200'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}