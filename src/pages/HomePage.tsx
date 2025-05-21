
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Hand, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 gap-4">
        <div className="w-full max-w-md bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 mb-4">
          <p className="text-center text-gray-400 text-sm">Advertisement</p>
          <p className="text-center text-gray-500 text-xs">Place your ad here</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
          <button 
            onClick={() => navigate('/manual')}
            className="bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl p-1"
          >
            <div className="bg-zinc-900 rounded-lg p-4 h-full">
              <div className="flex justify-center mb-4">
                <Hand size={48} className="text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-amber-400 mb-2 text-center">Manual</h2>
              <p className="text-gray-300 text-xs mb-1">Press by hand or press the earphone button or volume up/down button</p>
              <p className="text-gray-400 text-xs italic">हाथ से दबाएं या ईयरफोन बटन या वॉल्यूम अप डाउन बटन दबाएं</p>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/audio')}
            className="bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-xl p-1"
          >
            <div className="bg-zinc-900 rounded-lg p-4 h-full">
              <div className="flex justify-center mb-4">
                <Mic size={48} className="text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-amber-400 mb-2 text-center">By Audio</h2>
              <p className="text-gray-300 text-xs mb-1">Chant mantra and take 1sec gap, counter will increase</p>
              <p className="text-gray-400 text-xs italic">मंत्र का जाप करें और 1 सेकंड का अंतराल रखें, काउंटर बढ़ेगा</p>
            </div>
          </button>
        </div>
      </main>
      
      <footer className="py-4 text-center text-gray-400 text-xs">
        <p>Created with love for spiritual practice</p>
      </footer>
    </div>
  );
};

export default HomePage;
