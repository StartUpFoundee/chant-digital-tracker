
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const IdentityHelp: React.FC = () => {
  return (
    <Card className="bg-zinc-800/50 border border-zinc-700 text-white mt-4 max-w-xs mx-auto">
      <CardContent className="p-4">
        <h3 className="text-amber-400 text-sm font-medium mb-2">What is a spiritual identity?</h3>
        
        <div className="space-y-3">
          <section>
            <p className="text-xs text-gray-300 mb-2">
              Your spiritual identity saves your mantra count and lets you use the same profile on other devices.
            </p>
          </section>
          
          <section>
            <h4 className="text-amber-400 text-xs font-medium mb-1">How to use:</h4>
            <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
              <li>Choose a spiritual name and symbol</li>
              <li>Use the settings gear icon to manage your profile</li>
              <li>Create a transfer code to use on another phone</li>
            </ul>
          </section>
          
          <section className="border-t border-zinc-700 pt-3 mt-3">
            <h4 className="text-amber-400 text-xs font-medium mb-1">आध्यात्मिक पहचान क्या है?</h4>
            <p className="text-xs text-gray-300 mb-2">
              आपकी आध्यात्मिक पहचान आपके मंत्र गणना को सहेजती है और आपको अन्य उपकरणों पर समान प्रोफ़ाइल का उपयोग करने देती है।
            </p>
            
            <h4 className="text-amber-400 text-xs font-medium mb-1">उपयोग कैसे करें:</h4>
            <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
              <li>एक आध्यात्मिक नाम और प्रतीक चुनें</li>
              <li>प्रोफ़ाइल प्रबंधित करने के लिए गियर आइकन पर टैप करें</li>
              <li>दूसरे फोन पर उपयोग करने के लिए ट्रांसफर कोड बनाएं</li>
            </ul>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityHelp;
