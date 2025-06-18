import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal as TerminalIcon, Play, Trash2, Download, Upload, Cloud } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { useAppContext } from '../App';
import { cn } from '../lib/utils';

interface TerminalCommand {
  command: string;
  output: string;
  type: 'command' | 'output' | 'error';
  timestamp: Date;
}

const Terminal: React.FC = () => {
  const { state, previousStep } = useAppContext();
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('/mes-project');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const welcomeMessage = `Welcome to MES Builder Terminal
Generated project: ${state.formData.appName}
Industry: ${state.formData.industry}
Type: ${state.formData.applicationType}

Type 'help' for available commands.
`;

  useEffect(() => {
    // Add welcome message on component mount
    setCommands([{
      command: '',
      output: welcomeMessage,
      type: 'output',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new commands are added
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commands]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    setIsExecuting(true);
    
    // Add command to history
    const newCommand: TerminalCommand = {
      command: cmd,
      output: '',
      type: 'command',
      timestamp: new Date()
    };
    
    setCommands(prev => [...prev, newCommand]);

    // Simulate command execution
    setTimeout(() => {
      const output = processCommand(cmd.trim());
      const outputCommand: TerminalCommand = {
        command: '',
        output: output.text,
        type: output.type,
        timestamp: new Date()
      };
      
      setCommands(prev => [...prev, outputCommand]);
      setIsExecuting(false);
    }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
  };

  const processCommand = (cmd: string): { text: string; type: 'output' | 'error' } => {
    const parts = cmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        return {
          text: `Available commands:
  help              - Show this help message
  ls                - List files and directories
  cd <directory>    - Change directory
  cat <file>        - Display file contents
  pwd               - Show current directory
  tree              - Show directory tree
  build             - Build the application
  start             - Start development server
  test              - Run tests
  deploy            - Deploy application
  status            - Show project status
  logs              - Show application logs
  clear             - Clear terminal
  exit              - Exit terminal`,
          type: 'output'
        };

      case 'ls':
        return {
          text: `src/
server/
database/
package.json
README.md
vite.config.ts
tsconfig.json
.env.example
Dockerfile
docker-compose.yml`,
          type: 'output'
        };

      case 'pwd':
        return {
          text: currentDirectory,
          type: 'output'
        };

      case 'cd':
        if (args.length === 0) {
          return { text: currentDirectory, type: 'output' };
        }
        const newDir = args[0] === '..' ? '/mes-project' : `${currentDirectory}/${args[0]}`;
        setCurrentDirectory(newDir);
        return { text: '', type: 'output' };

      case 'tree':
        return {
          text: `mes-project/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── ProductionTracker.tsx
│   │   ├── QualityControl.tsx
│   │   └── InventoryManager.tsx
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── routes/
│   │   ├── production.js
│   │   ├── quality.js
│   │   └── inventory.js
│   └── app.js
├── database/
│   ├── migrations/
│   └── schema.sql
└── package.json`,
          type: 'output'
        };

      case 'cat':
        if (args.length === 0) {
          return { text: 'cat: missing file argument', type: 'error' };
        }
        const fileName = args[0];
        if (fileName === 'package.json') {
          return {
            text: `{
  "name": "${state.formData.appName.toLowerCase().replace(/\s+/g, '-')}-mes",
  "version": "1.0.0",
  "description": "Manufacturing Execution System for ${state.formData.industry}",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "start": "node server/app.js"
  }
}`,
            type: 'output'
          };
        }
        return { text: `cat: ${fileName}: No such file or directory`, type: 'error' };

      case 'build':
        return {
          text: `Building ${state.formData.appName}...
✓ TypeScript compilation successful
✓ Vite build completed
✓ Assets optimized
✓ Build completed in 2.3s

Output: dist/`,
          type: 'output'
        };

      case 'start':
        return {
          text: `Starting development server...
✓ Server started on http://localhost:3001
✓ Frontend dev server on http://localhost:5173
✓ Database connected
✓ Ready for development`,
          type: 'output'
        };

      case 'test':
        return {
          text: `Running tests for ${state.formData.appName}...
✓ Unit tests: 24 passed
✓ Integration tests: 8 passed
✓ E2E tests: 6 passed

Test coverage: 94.2%
All tests passed!`,
          type: 'output'
        };

      case 'deploy':
        return {
          text: `Deploying ${state.formData.appName}...
✓ Building production bundle
✓ Optimizing assets
✓ Uploading to cloud platform
✓ Configuring load balancer
✓ Running health checks

Deployment successful!
URL: https://${state.formData.appName.toLowerCase().replace(/\s+/g, '-')}.mes-platform.com`,
          type: 'output'
        };

      case 'status':
        return {
          text: `Project Status: ${state.formData.appName}
Industry: ${state.formData.industry}
Type: ${state.formData.applicationType}
Files: ${state.generatedFiles.length}
Status: Ready for deployment
Health: ✓ All systems operational`,
          type: 'output'
        };

      case 'logs':
        return {
          text: `[2025-06-18 17:10:42] INFO: Application started
[2025-06-18 17:10:43] INFO: Database connected
[2025-06-18 17:10:44] INFO: Routes loaded
[2025-06-18 17:10:45] INFO: Socket.IO initialized
[2025-06-18 17:10:46] INFO: Production module loaded
[2025-06-18 17:10:47] INFO: Quality control module loaded
[2025-06-18 17:10:48] INFO: Server ready on port 3001`,
          type: 'output'
        };

      case 'clear':
        setCommands([]);
        return { text: '', type: 'output' };

      case 'exit':
        return {
          text: 'Goodbye! Terminal session ended.',
          type: 'output'
        };

      default:
        return {
          text: `bash: ${command}: command not found. Type 'help' for available commands.`,
          type: 'error'
        };
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isExecuting) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const clearTerminal = () => {
    setCommands([]);
  };

  const downloadLogs = () => {
    const logsContent = commands
      .map(cmd => `[${cmd.timestamp.toISOString()}] ${cmd.type === 'command' ? '$ ' + cmd.command : cmd.output}`)
      .join('\n');
    
    const blob = new Blob([logsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.formData.appName.replace(/\s+/g, '_')}_terminal_logs.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                <TerminalIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">System Terminal</h1>
                <p className="text-muted-foreground">Command line interface for system exploration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Connected
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadLogs}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export Logs
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearTerminal}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <Card className="h-full bg-gray-900 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-sm text-gray-300 ml-4">
                      {state.formData.appName} Terminal
                    </span>
                  </div>
                  <Badge variant="outline" className="text-gray-300 border-gray-600">
                    {currentDirectory}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 h-full">
                <div className="h-full flex flex-col">
                  {/* Terminal Output */}
                  <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="font-mono text-sm space-y-1">
                      {commands.map((cmd, index) => (
                        <div key={index} className="break-words">
                          {cmd.type === 'command' ? (
                            <div className="text-green-400">
                              <span className="text-blue-400">user@mes-builder</span>
                              <span className="text-white">:</span>
                              <span className="text-cyan-400">{currentDirectory}</span>
                              <span className="text-white">$ </span>
                              <span className="text-white">{cmd.command}</span>
                            </div>
                          ) : (
                            <div 
                              className={cn(
                                "whitespace-pre-wrap",
                                cmd.type === 'error' ? 'text-red-400' : 'text-gray-300'
                              )}
                            >
                              {cmd.output}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Current Input Line */}
                      <div className="text-green-400 flex">
                        <span className="text-blue-400">user@mes-builder</span>
                        <span className="text-white">:</span>
                        <span className="text-cyan-400">{currentDirectory}</span>
                        <span className="text-white">$ </span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={isExecuting}
                          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm"
                          autoFocus
                        />
                        {isExecuting && (
                          <span className="text-yellow-400 animate-pulse">⚡</span>
                        )}
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Command Suggestions */}
                  <div className="border-t border-gray-700 p-4 bg-gray-800/50">
                    <div className="flex flex-wrap gap-2">
                      {['help', 'ls', 'tree', 'build', 'start', 'deploy', 'status'].map((cmd) => (
                        <Button
                          key={cmd}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentCommand(cmd);
                            inputRef.current?.focus();
                          }}
                          className="text-xs bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                        >
                          {cmd}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border bg-background/80">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                previousStep();
                navigate('/preview');
              }}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Preview
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Terminal ready • {commands.length} commands executed
              </div>
              
              <Button
                onClick={() => {
                  // This would implement the deployment functionality
                  executeCommand('deploy');
                }}
                className="gap-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black"
              >
                <Cloud className="w-4 h-4" />
                Deploy Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
