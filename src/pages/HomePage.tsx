
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Hand, Infinity, Clock, Moon, Sun } from "lucide-react";
import { getUserIdentity, getCounts } from "@/utils/localStorage";
import { UserIdentity } from "@/utils/identityGenerator";
import IdentityWelcome from "@/components/identity/IdentityWelcome";
import IdentityProfile from "@/components/identity/IdentityProfile";
import IdentityManager from "@/components/identity/IdentityManager";
import { useTheme } from "@/contexts/ThemeContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [identity, setIdentity] = useState<UserIdentity | null>(null);
  const [lifetimeCount, setLifetimeCount] = useState<number>(0);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [showIdentityManager, setShowIdentityManager] = useState<boolean>(false);
  
  // Load user identity and counts on component mount
  useEffect(() => {
    const userIdentity = getUserIdentity();
    if (userIdentity) {
      setIdentity(userIdentity);
    }
    
    const counts = getCounts();
    setLifetimeCount(counts.lifetimeCount);
    setTodayCount(counts.todayCount);
  }, []);

  const handleIdentityComplete = (newIdentity: UserIdentity) => {
    setIdentity(newIdentity);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black dark:bg-black text-white">
      <header className="py-6 text-center relative">
        <button 
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-800 text-amber-400"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <h1 className="text-3xl font-bold text-amber-400">Mantra Counter</h1>
        <p className="text-gray-300 mt-2">Count your spiritual practice with ease</p>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 gap-8">
        {!identity ? (
          <IdentityWelcome onComplete={handleIdentityComplete} />
        ) : (
          <>
            <IdentityProfile 
              identity={identity} 
              lifetimeCount={lifetimeCount}
              todayCount={todayCount}
              onManageIdentity={() => setShowIdentityManager(true)}
            />
            
            <div className="w-full max-w-md bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-8">
              <p className="text-center text-gray-400 text-sm">Advertisement</p>
              <p className="text-center text-gray-500 text-xs">Place your ad here</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
              <button 
                onClick={() => navigate('/manual')}
                className="bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl p-1"
              >
                <div className="bg-zinc-900 rounded-lg p-6 h-full">
                  <div className="flex justify-center mb-4">
                    <Hand size={64} className="text-amber-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-amber-400 mb-2 text-center">Manual</h2>
                  <p className="text-gray-300 text-sm mb-1">Press by hand or press the earphone button or press volume up/down button</p>
                  <p className="text-gray-400 text-xs italic">हाथ से दबाएं या ईयरफोन बटन या वॉल्यूम अप डाउन बटन दबाएं</p>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/audio')}
                className="bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl p-1"
              >
                <div className="bg-zinc-900 rounded-lg p-6 h-full">
                  <div className="flex justify-center mb-4">
                    <Mic size={64} className="text-amber-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-amber-400 mb-2 text-center">By Audio</h2>
                  <p className="text-gray-300 text-sm mb-1">Chant mantra and take 1sec gap, counter will increase</p>
                  <p className="text-gray-400 text-xs italic">मंत्र का जाप करें और 1 सेकंड का अंतराल रखें, काउंटर बढ़ेगा</p>
                </div>
              </button>
            </div>
            
            {showIdentityManager && (
              <div className="w-full max-w-xl mt-6">
                <IdentityManager 
                  identity={identity} 
                  lifetimeCount={lifetimeCount} 
                />
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="py-4 text-center text-gray-400 text-sm">
        <p>Created with love for spiritual practice</p>
      </footer>
    </div>
  );
};

export default HomePage;
