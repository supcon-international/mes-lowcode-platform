import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useAppContext } from '../App';

const ThemeToggle: React.FC = () => {
  const { state, updateState } = useAppContext();

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    updateState({ theme: newTheme });
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="rounded-full w-10 h-10 p-0 shadow-lg bg-background/80 backdrop-blur-sm border-border hover:bg-secondary"
      >
        {state.theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
