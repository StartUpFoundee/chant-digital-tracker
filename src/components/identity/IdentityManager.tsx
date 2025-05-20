
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserIdentity, decodeTransferCode, generateTransferCode } from '@/utils/identityGenerator';
import { exportUserData, mergeImportedData } from '@/utils/localStorage';
import { QrCode, Download, Copy, Upload, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface IdentityManagerProps {
  identity: UserIdentity;
  lifetimeCount: number;
}

const IdentityManager: React.FC<IdentityManagerProps> = ({ identity, lifetimeCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transferCode, setTransferCode] = useState('');
  const [importCode, setImportCode] = useState('');
  
  const handleGenerateTransferCode = () => {
    const data = {
      identity,
      lifetimeCount
    };
    
    const code = generateTransferCode(data);
    setTransferCode(code);
  };
  
  const handleCopyTransferCode = () => {
    if (transferCode) {
      navigator.clipboard.writeText(transferCode)
        .then(() => {
          toast.success("Transfer code copied to clipboard");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          toast.error("Failed to copy code");
        });
    }
  };
  
  const handleDownloadData = () => {
    const jsonData = exportUserData();
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', `mantra-journey-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Journey data downloaded");
  };
  
  const handleImport = () => {
    if (!importCode) {
      toast.error("Please enter a transfer code");
      return;
    }
    
    try {
      const importedData = decodeTransferCode(importCode);
      if (!importedData || !importedData.identity) {
        toast.error("Invalid transfer code");
        return;
      }
      
      mergeImportedData(importedData);
      toast.success("Journey data imported successfully");
      setIsOpen(false);
      
      // Force reload to update UI
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error importing data", error);
      toast.error("Failed to import data");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-amber-400">
          Manage Spiritual Identity
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-zinc-800 border-zinc-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-amber-400">Spiritual Journey Management</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="export">
          <TabsList className="grid grid-cols-2 bg-zinc-700">
            <TabsTrigger value="export">Export Journey</TabsTrigger>
            <TabsTrigger value="import">Import Journey</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Transfer to Another Device</h3>
              <p className="text-xs text-gray-400 mb-4">Generate a code to transfer your spiritual journey to another device</p>
              
              {!transferCode ? (
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black mb-4"
                  onClick={handleGenerateTransferCode}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Generate Transfer Code
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-zinc-700 p-3 rounded-md break-all text-xs text-amber-200">
                    {transferCode}
                  </div>
                  <Button 
                    variant="outline"
                    className="w-full bg-zinc-700 hover:bg-zinc-600 text-amber-400"
                    onClick={handleCopyTransferCode}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </Button>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-zinc-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Download Journey Data</h3>
              <p className="text-xs text-gray-400 mb-4">Save your complete journey data as a JSON file</p>
              
              <Button 
                variant="outline" 
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-amber-400"
                onClick={handleDownloadData}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Journey Data
              </Button>
            </div>
            
            <div className="pt-4 border-t border-zinc-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">QR Code (Coming Soon)</h3>
              <p className="text-xs text-gray-400 mb-4">Generate a QR code to quickly transfer your journey</p>
              
              <Button 
                variant="outline" 
                disabled
                className="w-full bg-zinc-700 text-gray-500"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Import Journey Data</h3>
              <p className="text-xs text-gray-400 mb-4">
                Enter a transfer code to import your journey from another device.
                This will merge with your existing journey data.
              </p>
              
              <Input
                placeholder="Paste transfer code here"
                value={importCode}
                onChange={(e) => setImportCode(e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white mb-3"
              />
              
              <Button 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                onClick={handleImport}
                disabled={!importCode}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import Journey
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default IdentityManager;
