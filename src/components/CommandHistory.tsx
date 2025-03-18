
import { useState, useEffect } from 'react';
import { Framework, Feature } from '../utils/generateCommand';
import { Clock, Copy, CheckCircle2, Delete, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandHistoryItem {
  id: string;
  command: string;
  timestamp: number;
  framework: Framework;
  features: Feature[];
  projectName: string;
}

interface CommandHistoryProps {
  onSelectCommand?: (command: string, framework: Framework, features: Feature[]) => void;
}

const CommandHistory = ({ onSelectCommand }: CommandHistoryProps) => {
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Load command history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('commandHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (e) {
        console.error('Failed to parse command history:', e);
      }
    }
  }, []);
  
  const copyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopied(id);
    
    toast({
      title: 'Command copied!',
      description: 'Command has been copied to clipboard.',
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };
  
  const deleteCommand = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('commandHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: 'Command removed',
      description: 'Command has been removed from history.',
    });
  };
  
  const selectCommand = (item: CommandHistoryItem) => {
    if (onSelectCommand) {
      onSelectCommand(item.command, item.framework, item.features);
    }
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (history.length === 0) {
    return (
      <div className="rounded-xl glass p-6 text-center">
        <div className="flex justify-center mb-4">
          <Clock className="w-10 h-10 text-muted-foreground opacity-50" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Command History</h3>
        <p className="text-muted-foreground">
          Commands you generate will appear here for quick access.
        </p>
      </div>
    );
  }
  
  return (
    <div className="rounded-xl glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Command History
        </h3>
        <span className="text-xs text-muted-foreground">
          {history.length} saved {history.length === 1 ? 'command' : 'commands'}
        </span>
      </div>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        <AnimatePresence>
          {history.map((item) => (
            <motion.div
              key={item.id}
              className="p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              onClick={() => selectCommand(item)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium text-sm">
                    {item.projectName} 
                    <span className="text-muted-foreground ml-1">({item.framework})</span>
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(item.timestamp)}
                </span>
              </div>
              
              <div className="mb-2 font-mono text-xs bg-background/50 p-2 rounded overflow-x-auto">
                {item.command}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {item.features.slice(0, 3).map((feature) => (
                    <span 
                      key={feature} 
                      className="px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                  {item.features.length > 3 && (
                    <span className="px-1.5 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                      +{item.features.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyCommand(item.command, item.id);
                    }}
                    className="p-1 rounded hover:bg-secondary transition-colors"
                    aria-label="Copy command"
                  >
                    {copied === item.id ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCommand(item.id);
                    }}
                    className="p-1 rounded hover:bg-secondary transition-colors"
                    aria-label="Delete command"
                  >
                    <Delete className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommandHistory;