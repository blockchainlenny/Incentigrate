'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LoginType = 'phantom' | 'solflare' | 'google' | 'email' | null;

interface AppState {
  isLoggedIn: boolean;
  oTokenBalance: number;
  learningProgress: { [moduleId: string]: { completedSteps: number; totalSteps: number; claimed: boolean } };
  userName: string;
  loginType: LoginType;
  walletAddress: string | null;
}

interface AppContextType extends AppState {
  login: (loginType: LoginType, displayName?: string, walletAddress?: string) => void;
  logout: () => void;
  claimReward: (moduleId: string, rewardAmount: number) => void;
  updateModuleProgress: (moduleId: string, completedSteps: number, totalSteps: number) => void;
}

const initialState: AppState = {
  isLoggedIn: false,
  oTokenBalance: 0,
  learningProgress: {},
  userName: 'Guest',
  loginType: null,
  walletAddress: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(initialState);

  const login = (
    loginType: LoginType,
    displayName: string = 'User',
    walletAddress: string = 'SoL4n4Addr3ssM0ckxxxxxxxxxxxxxx'
  ) => {
    let specificUserName = displayName;
    let specificWalletAddress = walletAddress;
    let initialBalance = 100;

    switch (loginType) {
      case 'phantom':
        specificUserName = displayName || 'Phantom User';
        specificWalletAddress = walletAddress || 'PhAnT0mWaLL3tAddr3ssxxxxxxxxxx';
        initialBalance = 110;
        break;
      case 'solflare':
        specificUserName = displayName || 'Solflare User';
        specificWalletAddress = walletAddress || 'SoLFL4ReWaLL3tAddr3ssxxxxxxxxxx';
        initialBalance = 120;
        break;
      case 'google':
        specificUserName = displayName || 'Google User (Social Wallet)';
        specificWalletAddress = walletAddress || 'G00gL3S0ciALWaLL3tXxxxxxxxxx';
        initialBalance = 130;
        break;
      case 'email':
        specificUserName = displayName || 'Email User (Social Wallet)';
        specificWalletAddress = walletAddress || 'EmA1LS0ciALWaLL3tXxxxxxxxxx';
        initialBalance = 140;
        break;
      default:
        specificUserName = 'Guest';
        specificWalletAddress = null;
        initialBalance = 0;
    }

    setState(prevState => ({
      ...prevState,
      isLoggedIn: true,
      userName: specificUserName,
      loginType: loginType,
      walletAddress: specificWalletAddress,
      oTokenBalance: initialBalance,
      learningProgress: {},
    }));
    console.log(
      `${specificUserName} logged in via ${loginType}, wallet: ${specificWalletAddress}, balance: ${initialBalance} $O (simulated).`
    );
  };

  const logout = () => {
    setState(prevState => ({
      ...initialState,
      oTokenBalance: prevState.oTokenBalance,
      learningProgress: prevState.learningProgress,
    }));
    console.log("User logged out (simulated).");
  };

  const claimReward = (
    moduleId: string, rewardAmount: number
  ) => {
    setState(prevState => {
      if (!prevState.isLoggedIn) return prevState;
      const moduleProg = prevState.learningProgress[moduleId];
      if (moduleProg && moduleProg.completedSteps === moduleProg.totalSteps && !moduleProg.claimed) {
        return {
          ...prevState,
          oTokenBalance: prevState.oTokenBalance + rewardAmount,
          learningProgress: {
            ...prevState.learningProgress,
            [moduleId]: { ...moduleProg, claimed: true },
          },
        };
      }
      return prevState;
    });
  };

  const updateModuleProgress = (
    moduleId: string, completedSteps: number, totalSteps: number
  ) => {
    setState(prevState => {
      if (!prevState.isLoggedIn) return prevState;
      return {
        ...prevState,
        learningProgress: {
          ...prevState.learningProgress,
          [moduleId]: {
            ...(prevState.learningProgress[moduleId] || { claimed: false }),
            completedSteps,
            totalSteps
          },
        },
      }
    });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      login,
      logout,
      claimReward,
      updateModuleProgress,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
