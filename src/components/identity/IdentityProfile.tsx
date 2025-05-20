
import React from 'react';
import { UserIdentity } from '@/utils/identityGenerator';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

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
    <div className="bg-zinc-800/80 dark:bg-zinc-800/80 rounded-lg border border-zinc-700 p-4 mb-6 w-full">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-2xl">
          {identity.symbol}
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-400">{identity.name}</h3>
          <p className="text-xs text-gray-400">Journey began {journeyStarted}</p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onManageIdentity}
          className="bg-zinc-700 hover:bg-zinc-600 border-zinc-600 text-amber-400"
        >
          Manage
        </Button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-zinc-700 flex gap-4 text-center">
        <div className="flex-1">
          <p className="text-sm text-gray-400">Lifetime Mantras</p>
          <p className="text-lg font-bold text-amber-400">{lifetimeCount.toLocaleString()}</p>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-400">Today's Mantras</p>
          <p className="text-lg font-bold text-amber-400">{todayCount.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default IdentityProfile;
