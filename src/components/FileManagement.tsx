import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  FolderTree, 
  File, 
  Folder, 
  Download, 
  Save, 
  Eye,
  ChevronRight,
  ChevronDown,
  Search,
  FileText,
  Code,
  Database,
  Settings,
  Package
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';
import { useAppContext } from '../App';
import { cn } from '../lib/utils';
import Monaco from '@monaco-editor/react';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  size?: number;
  extension?: string;
}

const FileManagement: React.FC = () => {
  const { state, updateState, nextStep, previousStep } = useAppContext();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'server', 'database']));
  const [fileContent, setFileContent] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  // Build file tree from generated files
  const fileTree = useMemo(() => {
    const tree: FileNode = { name: 'root', path: '', type: 'folder', children: [] };
    
    state.generatedFiles.forEach(file => {
      const pathParts = file.path.split('/');
      let currentNode = tree;
      
      pathParts.forEach((part, index) => {
        if (!currentNode.children) currentNode.children = [];
        
        let childNode = currentNode.children.find(child => child.name === part);
        
        if (!childNode) {
          const isFile = index === pathParts.length - 1;
          childNode = {
            name: part,
            path: pathParts.slice(0, index + 1).join('/'),
            type: isFile ? 'file' : 'folder',
            children: isFile ? undefined : [],
            extension: isFile ? part.split('.').pop() : undefined,
            size: isFile ? file.content.length : undefined
          };
          currentNode.children.push(childNode);
        }
        
        currentNode = childNode;
      });
    });
    
    return tree.children || [];
  }, [state.generatedFiles]);

  // Filter files based on search term
  const filteredFiles = useMemo(() => {
    if (!searchTerm) return state.generatedFiles;
    
    return state.generatedFiles.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.path.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state.generatedFiles, searchTerm]);

  const getFileIcon = (extension?: string) => {
    switch (extension) {
      case 'tsx':
      case 'ts':
      case 'js':
        return Code;
      case 'json':
        return Package;
      case 'sql':
        return Database;
      case 'css':
        return Settings;
      case 'md':
        return FileText;
      default:
        return File;
    }
  };

  const getLanguage = (fileType?: string, extension?: string): string => {
    switch (fileType) {
      case 'typescript':
        if (extension === 'tsx') {
          return 'typescriptreact';
        }
        return 'typescript';
      case 'javascript':
        if (extension === 'jsx') {
          return 'javascriptreact';
        }
        return 'javascript';
      case 'json':
        return 'json';
      case 'sql':
        return 'sql';
      case 'css':
        return 'css';
      case 'markdown':
        return 'markdown';
      case 'yaml':
        return 'yaml';
      default:
        return 'plaintext';
    }
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleFileSelect = (filePath: string) => {
    const file = state.generatedFiles.find(f => f.path === filePath);
    if (file) {
      setSelectedFile(filePath);
      setFileContent(file.content);
      setHasChanges(false);
    }
  };

  const handleContentChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFileContent(value);
      setHasChanges(true);
    }
  };

  const handleSaveFile = () => {
    if (selectedFile) {
      const updatedFiles = state.generatedFiles.map(file =>
        file.path === selectedFile
          ? { ...file, content: fileContent }
          : file
      );
      updateState({ generatedFiles: updatedFiles });
      setHasChanges(false);
    }
  };

  const handleDownloadFile = () => {
    if (selectedFile) {
      const file = state.generatedFiles.find(f => f.path === selectedFile);
      if (file) {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  };

  const handleDownloadAll = () => {
    // This would implement ZIP download functionality
    // For now, we'll show a simple alert
    alert('Downloading all files as ZIP... (Feature would be implemented with JSZip)');
  };

  const renderFileNode = (node: FileNode, level: number = 0): React.ReactNode => {
    const Icon = node.type === 'folder' ? Folder : getFileIcon(node.extension);
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;
    
    return (
      <div key={node.path}>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-secondary rounded",
            isSelected && "bg-primary/20 text-primary",
            "text-sm"
          )}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              handleFileSelect(node.path);
            }
          }}
        >
          {node.type === 'folder' && (
            <>
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </>
          )}
          <Icon className="w-4 h-4" />
          <span className="flex-1 truncate">{node.name}</span>
          {node.type === 'file' && node.size && (
            <span className="text-xs text-muted-foreground">
              {(node.size / 1024).toFixed(1)}KB
            </span>
          )}
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedFileData = selectedFile ? state.generatedFiles.find(f => f.path === selectedFile) : null;

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <FolderTree className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">File Management</h1>
                <p className="text-muted-foreground">Browse and edit generated files</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {state.generatedFiles.length} files
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAll}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download All
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* File Explorer */}
            <ResizablePanel defaultSize={30} minSize={25}>
              <div className="h-full flex flex-col border-r border-border">
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search files..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {searchTerm ? (
                      // Search Results
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground px-2 py-1">
                          Search Results ({filteredFiles.length})
                        </h3>
                        {filteredFiles.map(file => {
                          const Icon = getFileIcon(file.name.split('.').pop());
                          return (
                            <div
                              key={file.path}
                              className={cn(
                                "flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-secondary rounded text-sm",
                                selectedFile === file.path && "bg-primary/20 text-primary"
                              )}
                              onClick={() => handleFileSelect(file.path)}
                            >
                              <Icon className="w-4 h-4" />
                              <div className="flex-1 min-w-0">
                                <div className="truncate">{file.name}</div>
                                <div className="text-xs text-muted-foreground truncate">{file.path}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      // File Tree
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground px-2 py-1">
                          Project Files
                        </h3>
                        {fileTree.map(node => renderFileNode(node))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Editor/Preview */}
            <ResizablePanel defaultSize={70}>
              {selectedFileData ? (
                <div className="h-full flex flex-col">
                  {/* File Header */}
                  <div className="p-4 border-b border-border bg-background/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {React.createElement(getFileIcon(selectedFileData.name.split('.').pop()), { className: "w-5 h-5" })}
                        <div>
                          <h3 className="font-medium">{selectedFileData.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedFileData.path}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {hasChanges && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Unsaved changes
                          </Badge>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadFile}
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveFile}
                          disabled={!hasChanges}
                          className="gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="flex-1 overflow-hidden">
                    <Monaco
                      height="100%"
                      language={getLanguage(selectedFileData.type, selectedFileData.name.split('.').pop())}
                      theme="vs-light"
                      value={fileContent}
                      onChange={handleContentChange}
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineHeight: 1.5,
                        padding: { top: 20 },
                        automaticLayout: true,
                        wordWrap: 'on',
                        folding: true,
                        lineNumbers: 'on',
                        renderWhitespace: 'selection'
                      }}
                    />
                  </div>
                </div>
              ) : (
                // No file selected
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4 max-w-md">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                      <File className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Select a File</h3>
                      <p className="text-muted-foreground">
                        Choose a file from the explorer to view and edit its contents
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {state.generatedFiles.length} files generated for your {state.formData.appName}
                      </p>
                      <div className="flex justify-center gap-2">
                        <Badge variant="outline">{state.formData.industry}</Badge>
                        <Badge variant="outline">{state.formData.applicationType}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border bg-background/80">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                previousStep();
                navigate('/code');
              }}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Code Generation
            </Button>

            <Button
              onClick={() => {
                nextStep();
                navigate('/preview');
              }}
              className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              <Eye className="w-4 h-4" />
              Preview Application
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagement;
