
import React from 'react';
import { UserIdentity } from '@/utils/identityGenerator';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

interface IdentityProfileProps {
  identity: UserIdentity;
  lifetimeCount: number;
  todayCount: number;
  onManageIdentity: () => void;
}

const IdentityProfile: React.FC<IdentityProfileProps> = ({ 
  identity, 
  lifetimeCount, 
  todayCount, 
  onManageIdentity 
}) => {
  const journeyStarted = formatDistanceToNow(
    new Date(identity.creationDate),
    { addSuffix: true }
  );
  
  return (
    <Card className="bg-zinc-800/80 dark:bg-zinc-800/80 rounded-lg border border-zinc-700 p-4 mb-6 w-full max-w-sm mx-auto">
      <CardContent className="p-0">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30">
            {identity.symbol}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-400">{identity.name}</h3>
            <p className="text-xs text-gray-400">Journey began {journeyStarted}</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onManageIdentity}
            className="bg-zinc-700/50 hover:bg-zinc-600 text-amber-400"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="mt-4 pt-3 border-t border-zinc-700 grid grid-cols-2 gap-2 text-center">
          <div className="bg-zinc-700/50 rounded-lg p-3">
            <p className="text-sm text-gray-400">Lifetime Mantras</p>
            <p className="text-xl font-bold text-amber-400">{lifetimeCount.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-700/50 rounded-lg p-3">
            <p className="text-sm text-gray-400">Today's Mantras</p>
            <p className="text-xl font-bold text-amber-400">{todayCount.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityProfile;
