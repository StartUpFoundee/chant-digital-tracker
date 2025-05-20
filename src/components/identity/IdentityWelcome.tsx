
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateSpiritualId, SPIRITUAL_SYMBOLS, UserIdentity } from '@/utils/identityGenerator';
import { saveUserIdentity } from '@/utils/localStorage';

interface IdentityWelcomeProps {
  onComplete: (identity: UserIdentity) => void;
}

const IdentityWelcome: React.FC<IdentityWelcomeProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      setStep(2);
    }
  };
  
  const handleSymbolSelect = (symbolId: string) => {
    setSelectedSymbol(symbolId);
  };
  
  const handleComplete = async () => {
    if (!name || !selectedSymbol) return;
    
    setIsGenerating(true);
    try {
      // Generate a unique spiritual ID
      const id = await generateSpiritualId();
      
      // Get the selected symbol object
      const symbol = SPIRITUAL_SYMBOLS.find(s => s.id === selectedSymbol)?.symbol || "ॐ";
      
      // Create user identity object
      const identity: UserIdentity = {
        id,
        name,
        symbol,
        creationDate: new Date().toISOString(),
        preferences: {
          theme: 'dark'
        }
      };
      
      // Save to localStorage
      saveUserIdentity(identity);
      
      // Notify parent component
      onComplete(identity);
    } catch (error) {
      console.error("Error creating identity", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-zinc-800 dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-700">
      {step === 1 && (
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">Welcome to Your Spiritual Journey</h2>
          <p className="text-gray-300 mb-6">Begin by choosing a name for your spiritual journey</p>
          
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <Input
              placeholder="Enter your spiritual name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-700 border-zinc-600 text-white"
              required
            />
            
            <Button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black"
            >
              Continue
            </Button>
          </form>
        </div>
      )}
      
      {step === 2 && (
        <div className="w-full">
          <h2 className="text-xl font-bold text-amber-400 mb-4 text-center">Choose Your Spiritual Symbol</h2>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {SPIRITUAL_SYMBOLS.map((symbol) => (
              <button
                key={symbol.id}
                onClick={() => handleSymbolSelect(symbol.id)}
                className={`aspect-square p-2 flex items-center justify-center rounded-lg text-3xl transition-colors ${
                  selectedSymbol === symbol.id 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-zinc-700 hover:bg-zinc-600 text-gray-200'
                }`}
                title={symbol.name}
              >
                {symbol.symbol}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline"
              className="flex-1 border-zinc-600"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button 
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
              onClick={handleComplete}
              disabled={!selectedSymbol || isGenerating}
            >
              {isGenerating ? "Creating..." : "Begin Journey"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentityWelcome;
