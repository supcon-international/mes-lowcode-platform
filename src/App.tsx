import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import FormGeneration from './components/FormGeneration';
import PRDGeneration from './components/PRDGeneration';
import CodeGeneration from './components/CodeGeneration';
import FileManagement from './components/FileManagement';
import AppPreview from './components/AppPreview';
import Terminal from './components/Terminal';
import ThemeToggle from './components/ThemeToggle';
import { cn } from './lib/utils';
import './App.css';

// Global Application Context
interface AppState {
  currentStep: number;
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
  formData: {
    appName: string;
    industry: string;
    applicationType: string;
    customRequirements: string;
  };
  prdContent: string;
  generatedFiles: Array<{ name: string; path: string; content: string; type: string }>;
  isGenerating: boolean;
  theme: 'light' | 'dark';
}

interface AppContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetWorkflow: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

function App() {
  const [state, setState] = useState<AppState>({
    currentStep: 0,
    chatHistory: [],
    formData: {
      appName: '',
      industry: '',
      applicationType: '',
      customRequirements: ''
    },
    prdContent: '',
    generatedFiles: [],
    isGenerating: false,
    theme: 'light'
  });

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 7) }));
  };

  const previousStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 0) }));
  };

  const resetWorkflow = () => {
    setState({
      currentStep: 0,
      chatHistory: [],
      formData: {
        appName: '',
        industry: '',
        applicationType: '',
        customRequirements: ''
      },
      prdContent: '',
      generatedFiles: [],
      isGenerating: false,
      theme: state.theme
    });
  };

  const contextValue: AppContextType = {
    state,
    updateState,
    nextStep,
    previousStep,
    resetWorkflow
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className={cn("min-h-screen flex", state.theme === 'dark' ? 'dark' : '')}>
          <Sidebar />
          <main className="flex-1 flex flex-col bg-background">
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/chat" replace />} />
                <Route path="/chat" element={<ChatInterface />} />
                <Route path="/form" element={<FormGeneration />} />
                <Route path="/prd" element={<PRDGeneration />} />
                <Route path="/code" element={<CodeGeneration />} />
                <Route path="/files" element={<FileManagement />} />
                <Route path="/preview" element={<AppPreview />} />
                <Route path="/terminal" element={<Terminal />} />
              </Routes>
            </div>
            <ThemeToggle />
          </main>
          <Toaster />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
