import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Bot, User, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { useAppContext } from '../App';
import { cn } from '../lib/utils';

const ChatInterface: React.FC = () => {
  const { state, updateState, nextStep } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user' as const, content: inputValue.trim() };
    updateState({
      chatHistory: [...state.chatHistory, userMessage]
    });

    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on conversation context
    setTimeout(() => {
      const assistantResponse = generateAssistantResponse(inputValue.trim(), state.chatHistory.length);
      updateState({
        chatHistory: [...state.chatHistory, userMessage, { role: 'assistant', content: assistantResponse }]
      });
      setIsTyping(false);
    }, 1500);
  };

  const generateAssistantResponse = (userInput: string, messageCount: number): string => {
    const input = userInput.toLowerCase();
    
    if (messageCount === 0) {
      return `Thank you for describing your MES requirements! I understand you need a ${
        input.includes('manufacturing') ? 'manufacturing execution system' :
        input.includes('production') ? 'production management system' :
        input.includes('quality') ? 'quality control system' :
        input.includes('inventory') ? 'inventory management system' :
        'manufacturing execution system'
      }.

Based on your description, I can help you build a comprehensive solution. Let me gather some specific details to create the perfect MES application for your needs.

Would you like me to generate a form to capture the key requirements, or do you have more specific details to share about your manufacturing processes?`;
    }

    if (messageCount <= 2) {
      return `Great! I'm gathering all the important details. From what you've shared, I can see you need features like:

${input.includes('track') ? '• Production tracking and monitoring' : ''}
${input.includes('quality') ? '• Quality control and compliance' : ''}
${input.includes('inventory') ? '• Inventory and material management' : ''}
${input.includes('report') ? '• Reporting and analytics' : ''}
${input.includes('real-time') ? '• Real-time data collection' : ''}

I think we have enough information to get started. Shall I create a detailed form where you can specify your application name, industry type, and other key requirements?`;
    }

    return `Perfect! I have a good understanding of your requirements. I'm ready to generate a comprehensive form that will capture all the specific details needed to build your MES application.

The form will include:
• Application name and description
• Industry-specific configurations  
• Application type selection
• Custom feature requirements

Ready to proceed to the form generation step?`;
  };

  const handleGenerateForm = () => {
    // Extract key requirements from chat history
    const requirements = state.chatHistory
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ');

    updateState({
      formData: {
        ...state.formData,
        customRequirements: requirements
      }
    });

    nextStep();
    navigate('/form');
  };

  const suggestedPrompts = [
    "I need a production tracking system for automotive manufacturing",
    "Build a quality control MES for pharmaceutical production",
    "Create an inventory management system for food processing",
    "I want a comprehensive MES for electronics assembly",
    "Need a real-time production monitoring dashboard"
  ];

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MES Requirements Chat</h1>
              <p className="text-muted-foreground">Describe your manufacturing execution system needs</p>
            </div>
          </div>
          
          {state.chatHistory.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="secondary" className="gap-1">
                <Bot className="w-3 h-3" />
                AI Assistant Active
              </Badge>
              <Badge variant="outline">{state.chatHistory.length} messages</Badge>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto flex flex-col p-6">
          {state.chatHistory.length === 0 ? (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-6 max-w-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-3">Welcome to MES Builder</h2>
                  <p className="text-lg text-muted-foreground">
                    I'm your AI assistant ready to help you build a comprehensive Manufacturing Execution System. 
                    Tell me about your manufacturing processes, requirements, and goals.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lightbulb className="w-4 h-4" />
                    Try one of these examples:
                  </div>
                  <div className="grid gap-2">
                    {suggestedPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start text-left h-auto p-4 whitespace-normal"
                        onClick={() => handleSuggestedPrompt(prompt)}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <span className="flex-1">{prompt}</span>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                {state.chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-4",
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    )}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    
                    <Card className={cn(
                      "max-w-[80%]",
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card'
                    )}>
                      <CardContent className="p-4">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <Card className="bg-card">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          )}

          {/* Input Area */}
          <div className="mt-6 space-y-4">
            {state.chatHistory.length >= 2 && (
              <div className="flex justify-center">
                <Button
                  onClick={handleGenerateForm}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Requirements Form
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your MES requirements, manufacturing processes, or specific needs..."
                  className="min-h-[60px] resize-none pr-12"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 h-8 w-8"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
