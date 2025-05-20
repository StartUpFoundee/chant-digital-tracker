
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const IdentityHelp: React.FC = () => {
  return (
    <Card className="bg-zinc-800/50 border border-zinc-700 text-white mt-6">
      <CardContent className="p-4">
        <h3 className="text-amber-400 text-sm font-medium mb-2">Why create a spiritual identity?</h3>
        
        <div className="space-y-4">
          <section>
            <p className="text-xs text-gray-300 mb-2">
              Your spiritual identity connects your mantra practice across all devices and preserves your journey progress over time.
            </p>
          </section>
          
          <section>
            <h4 className="text-amber-400 text-xs font-medium mb-1">Benefits:</h4>
            <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
              <li>Track your lifetime progress</li>
              <li>Transfer your journey between devices</li>
              <li>Create a meaningful connection to your practice</li>
            </ul>
          </section>
          
          <section className="border-t border-zinc-700 pt-3">
            <h4 className="text-amber-400 text-xs font-medium mb-1">आध्यात्मिक पहचान क्यों बनाएं?</h4>
            <p className="text-xs text-gray-300 mb-2">
              आपकी आध्यात्मिक पहचान आपके मंत्र अभ्यास को सभी उपकरणों से जोड़ती है और समय के साथ आपकी यात्रा की प्रगति को संरक्षित करती है।
            </p>
            
            <h4 className="text-amber-400 text-xs font-medium mb-1">लाभ:</h4>
            <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
              <li>अपनी आजीवन प्रगति को ट्रैक करें</li>
              <li>अपनी यात्रा को उपकरणों के बीच स्थानांतरित करें</li>
              <li>अपने अभ्यास से एक सार्थक जुड़ाव बनाएं</li>
            </ul>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityHelp;
