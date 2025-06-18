import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MessageCircle, 
  FileText, 
  FileEdit, 
  Code, 
  FolderTree, 
  Eye, 
  Terminal as TerminalIcon,
  Settings,
  Zap,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useAppContext } from '../App';
import { cn } from '../lib/utils';

const Sidebar: React.FC = () => {
  const { state, resetWorkflow } = useAppContext();

  const navigationItems = [
    {
      to: '/chat',
      icon: MessageCircle,
      label: 'Chat Interface',
      step: 0,
      description: 'Define requirements'
    },
    {
      to: '/form',
      icon: FileText,
      label: 'Form Generation',
      step: 1,
      description: 'Configure app details'
    },
    {
      to: '/prd',
      icon: FileEdit,
      label: 'PRD Generation',
      step: 2,
      description: 'Product Requirements'
    },
    {
      to: '/code',
      icon: Code,
      label: 'Code Generation',
      step: 3,
      description: 'Generate application code'
    },
    {
      to: '/files',
      icon: FolderTree,
      label: 'File Management',
      step: 4,
      description: 'Browse and edit files'
    },
    {
      to: '/preview',
      icon: Eye,
      label: 'App Preview',
      step: 5,
      description: 'Live application preview'
    },
    {
      to: '/terminal',
      icon: TerminalIcon,
      label: 'Terminal',
      step: 6,
      description: 'System exploration'
    }
  ];

  const getStepStatus = (step: number) => {
    if (step < state.currentStep) return 'completed';
    if (step === state.currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-80 h-screen bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">MES Builder</h1>
            <p className="text-sm text-muted-foreground">Low-Code Platform</p>
          </div>
        </div>
        
        {state.formData.appName && (
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-sm font-medium text-foreground">Current Project:</p>
            <p className="text-sm text-muted-foreground truncate">{state.formData.appName}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <h2 className="text-sm font-semibold text-muted-foreground mb-3">Workflow Steps</h2>
        
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const status = getStepStatus(item.step);
          const isDisabled = item.step > state.currentStep + 1;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group",
                  isActive && "bg-primary text-primary-foreground",
                  !isActive && status === 'completed' && "bg-green-50 hover:bg-green-100 text-green-700",
                  !isActive && status === 'current' && "bg-blue-50 hover:bg-blue-100 text-blue-700",
                  !isActive && status === 'upcoming' && !isDisabled && "hover:bg-secondary text-muted-foreground",
                  isDisabled && "opacity-50 cursor-not-allowed"
                )
              }
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {status === 'completed' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">{item.label}</span>
                  <Badge 
                    variant={status === 'completed' ? 'default' : status === 'current' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {index + 1}
                  </Badge>
                </div>
                <p className="text-xs opacity-75 truncate">{item.description}</p>
              </div>
            </NavLink>
          );
        })}
      </nav>

      <Separator />

      {/* Actions */}
      <div className="p-4 space-y-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={resetWorkflow}
        >
          <RefreshCw className="w-4 h-4" />
          Reset Workflow
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Step {state.currentStep + 1} of {navigationItems.length}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
