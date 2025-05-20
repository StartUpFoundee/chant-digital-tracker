
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { UserIdentity, decodeTransferCode, generateTransferCode } from '@/utils/identityGenerator';
import { exportUserData, mergeImportedData, clearUserIdentity } from '@/utils/localStorage';
import { Download, Copy, Upload, Share2, HelpCircle, LogOut } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface IdentityManagerProps {
  identity: UserIdentity;
  lifetimeCount: number;
}

const IdentityManager: React.FC<IdentityManagerProps> = ({ identity, lifetimeCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transferCode, setTransferCode] = useState('');
  const [importCode, setImportCode] = useState('');
  const [activeTab, setActiveTab] = useState('export');
  
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
          toast.success("Code copied to clipboard");
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

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout? You can restore your identity later with your transfer code.")) {
      clearUserIdentity();
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-amber-400">
            <Share2 className="mr-2 h-4 w-4" />
            Manage Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xs bg-zinc-800 border-zinc-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-amber-400">Manage Profile</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="export" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 bg-zinc-700">
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>
            
            <TabsContent value="export" className="space-y-3 mt-3">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Transfer Code</h3>
                <p className="text-xs text-gray-400 mb-2">Generate a code to transfer to another device</p>
                
                {!transferCode ? (
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black mb-3"
                    onClick={handleGenerateTransferCode}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Generate Code
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-zinc-700 p-2 rounded-md break-all text-xs text-amber-200">
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
              
              <div className="pt-3 border-t border-zinc-700">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Backup Data</h3>
                <p className="text-xs text-gray-400 mb-2">Save your journey data</p>
                
                <Button 
                  variant="outline" 
                  className="w-full bg-zinc-700 hover:bg-zinc-600 text-amber-400"
                  onClick={handleDownloadData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Backup
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="import" className="space-y-3 mt-3">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Import Journey</h3>
                <p className="text-xs text-gray-400 mb-2">
                  Enter a transfer code to import your journey
                </p>
                
                <Input
                  placeholder="Paste code here"
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  className="bg-zinc-700 border-zinc-600 text-white mb-2"
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
            
            <TabsContent value="help" className="space-y-3 mt-3">
              <Card className="bg-zinc-700 border-zinc-600">
                <CardContent className="p-3">
                  <h3 className="text-amber-400 text-sm font-medium mb-2">How to use:</h3>
                  <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
                    <li>Generate a transfer code to use on another device</li>
                    <li>Download a backup file to save your data</li>
                    <li>Import your journey using a transfer code</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-zinc-700 border-zinc-600">
                <CardContent className="p-3">
                  <h3 className="text-amber-400 text-sm font-medium mb-2">उपयोग कैसे करें:</h3>
                  <ul className="text-xs text-gray-300 list-disc pl-4 space-y-1">
                    <li>दूसरे डिवाइस पर उपयोग करने के लिए ट्रांसफर कोड बनाएं</li>
                    <li>अपना डेटा सहेजने के लिए बैकअप फ़ाइल डाउनलोड करें</li>
                    <li>ट्रांसफर कोड का उपयोग करके अपनी यात्रा आयात करें</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Button 
                variant="outline" 
                className="w-full bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-700/50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Change Identity
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="ghost" 
        size="sm"
        className="text-gray-400 hover:text-amber-400 hover:bg-zinc-800/50"
        onClick={() => {
          setActiveTab('help');
          setIsOpen(true);
        }}
      >
        <HelpCircle className="mr-2 h-4 w-4" />
        Need Help?
      </Button>
    </div>
  );
};

export default IdentityManager;
