
import React from "react";
import { useNavigate } from "react-router-dom";
import MantraCounter from "@/components/MantraCounter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AudioCountPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-black dark:bg-black text-white">
      <header className="py-4 px-4 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-amber-400 hover:bg-zinc-800"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-amber-400">Audio Counter</h1>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-amber-400 hover:bg-zinc-800"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-amber-400 hover:bg-zinc-800"
            onClick={() => navigate('/')}
          >
            <Home className="h-6 w-6" />
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <MantraCounter />
      </main>
    </div>
  );
};

export default AudioCountPage;
