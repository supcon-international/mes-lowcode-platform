import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code, CheckCircle, Clock, Loader2, FileCode, Database, Globe, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useAppContext } from '../App';

interface GenerationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  duration: number;
  files: string[];
}

const CodeGeneration: React.FC = () => {
  const { state, updateState, nextStep, previousStep } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const generationSteps: GenerationStep[] = [
    {
      id: 'setup',
      title: 'Project Setup',
      description: 'Creating project structure and configuration files',
      icon: Settings,
      duration: 2000,
      files: ['package.json', 'tsconfig.json', 'vite.config.ts', '.env.example', 'README.md']
    },
    {
      id: 'frontend',
      title: 'Frontend Components',
      description: 'Generating React components and UI elements',
      icon: Globe,
      duration: 4000,
      files: [
        'src/App.tsx',
        'src/components/Dashboard.tsx',
        'src/components/ProductionTracker.tsx',
        'src/components/QualityControl.tsx',
        'src/components/InventoryManager.tsx',
        'src/components/WorkOrderManager.tsx',
        'src/components/Analytics.tsx',
        'src/components/Settings.tsx',
        'src/styles/globals.css'
      ]
    },
    {
      id: 'backend',
      title: 'Backend Services',
      description: 'Creating API endpoints and business logic',
      icon: Database,
      duration: 3500,
      files: [
        'server/app.js',
        'server/routes/production.js',
        'server/routes/quality.js',
        'server/routes/inventory.js',
        'server/routes/workorders.js',
        'server/middleware/auth.js',
        'server/middleware/validation.js',
        'server/controllers/productionController.js',
        'server/models/Production.js'
      ]
    },
    {
      id: 'database',
      title: 'Database Schema',
      description: 'Setting up database tables and relationships',
      icon: Database,
      duration: 2500,
      files: [
        'database/migrations/001_create_production_tables.sql',
        'database/migrations/002_create_quality_tables.sql',
        'database/migrations/003_create_inventory_tables.sql',
        'database/seeds/sample_data.sql',
        'database/schema.sql'
      ]
    },
    {
      id: 'integration',
      title: 'Industry Integration',
      description: 'Implementing industry-specific features and compliance',
      icon: FileCode,
      duration: 3000,
      files: [
        'src/modules/IndustryCompliance.tsx',
        'src/modules/QualityStandards.tsx',
        'src/modules/RegulatoryReporting.tsx',
        'src/utils/industryHelpers.ts',
        'server/services/complianceService.js'
      ]
    },
    {
      id: 'finalization',
      title: 'Finalization',
      description: 'Optimizing code and preparing for deployment',
      icon: CheckCircle,
      duration: 1500,
      files: [
        'Dockerfile',
        'docker-compose.yml',
        '.github/workflows/deploy.yml',
        'docs/deployment.md',
        'docs/user-guide.md'
      ]
    }
  ];

  useEffect(() => {
    if (state.generatedFiles.length === 0) {
      startGeneration();
    }
  }, []);

  const startGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    setProgress(0);

    const allFiles: Array<{ name: string; path: string; content: string; type: string }> = [];

    for (let i = 0; i < generationSteps.length; i++) {
      const step = generationSteps[i];
      setCurrentStep(i);

      // Simulate step processing
      await new Promise(resolve => setTimeout(resolve, step.duration));

      // Generate files for this step
      const stepFiles = generateFilesForStep(step);
      allFiles.push(...stepFiles);

      setCompletedSteps(prev => [...prev, step.id]);
      setProgress(((i + 1) / generationSteps.length) * 100);
    }

    updateState({ generatedFiles: allFiles });
    setIsGenerating(false);
  };

  const generateFilesForStep = (step: GenerationStep): Array<{ name: string; path: string; content: string; type: string }> => {
    return step.files.map(fileName => ({
      name: fileName.split('/').pop() || fileName,
      path: fileName,
      content: generateFileContent(fileName, step.id),
      type: getFileType(fileName)
    }));
  };

  const generateFileContent = (fileName: string, stepId: string): string => {
    const { formData } = state;
    
    if (fileName === 'package.json') {
      return `{
  "name": "${formData.appName.toLowerCase().replace(/\s+/g, '-')}-mes",
  "version": "1.0.0",
  "description": "Manufacturing Execution System for ${formData.industry}",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "server": "node server/app.js"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "express": "^4.18.2",
    "socket.io": "^4.6.1",
    "socket.io-client": "^4.6.1",
    "recharts": "^2.5.0",
    "date-fns": "^2.29.3"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^4.9.3",
    "vite": "^4.1.0"
  }
}`;
    }

    if (fileName === 'src/App.tsx') {
      return `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductionTracker from './components/ProductionTracker';
import QualityControl from './components/QualityControl';
import InventoryManager from './components/InventoryManager';
import WorkOrderManager from './components/WorkOrderManager';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/production" element={<ProductionTracker />} />
          <Route path="/quality" element={<QualityControl />} />
          <Route path="/inventory" element={<InventoryManager />} />
          <Route path="/workorders" element={<WorkOrderManager />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;`;
    }

    if (fileName === 'src/components/Dashboard.tsx') {
      return `import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">${formData.appName}</h1>
        <p className="text-gray-600">Manufacturing Execution System Dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Production Rate</h3>
          <p className="text-3xl font-bold text-green-600">94.2%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Quality Score</h3>
          <p className="text-3xl font-bold text-yellow-600">98.7%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Equipment OEE</h3>
          <p className="text-3xl font-bold text-purple-600">87.3%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Work Order #1001 completed</span>
              <span className="text-sm text-gray-500">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Quality check passed for Batch #B234</span>
              <span className="text-sm text-gray-500">5 mins ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Material request submitted</span>
              <span className="text-sm text-gray-500">12 mins ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Production Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Today's Target</span>
                <span className="text-sm text-gray-900">850 units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Week Progress</span>
                <span className="text-sm text-gray-900">4,200 / 5,000 units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;`;
    }

    if (fileName === 'server/app.js') {
      return `const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/production', require('./routes/production'));
app.use('/api/quality', require('./routes/quality'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/workorders', require('./routes/workorders'));

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: '${formData.appName} API' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(\`${formData.appName} server running on port \${PORT}\`);
});`;
    }

    if (fileName === 'database/schema.sql') {
      return `-- ${formData.appName} Database Schema
-- Industry: ${formData.industry}
-- Application Type: ${formData.applicationType}

-- Production Tables
CREATE TABLE work_orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  product_code VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(10) DEFAULT 'normal',
  scheduled_start TIMESTAMP,
  scheduled_end TIMESTAMP,
  actual_start TIMESTAMP,
  actual_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE production_lines (
  id SERIAL PRIMARY KEY,
  line_name VARCHAR(100) NOT NULL,
  line_code VARCHAR(20) UNIQUE NOT NULL,
  capacity INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quality_checks (
  id SERIAL PRIMARY KEY,
  work_order_id INTEGER REFERENCES work_orders(id),
  check_type VARCHAR(50) NOT NULL,
  result VARCHAR(20) NOT NULL,
  inspector_id VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_items (
  id SERIAL PRIMARY KEY,
  item_code VARCHAR(50) UNIQUE NOT NULL,
  item_name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  unit_of_measure VARCHAR(20),
  current_stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 0,
  max_stock INTEGER,
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_work_orders_status ON work_orders(status);
CREATE INDEX idx_work_orders_scheduled_start ON work_orders(scheduled_start);
CREATE INDEX idx_quality_checks_work_order ON quality_checks(work_order_id);
CREATE INDEX idx_inventory_items_code ON inventory_items(item_code);`;
    }

    // Generate basic content for other files
    return `// Generated file: ${fileName}
// Part of ${formData.appName}
// Industry: ${formData.industry}
// Application Type: ${formData.applicationType}
// Generated on: ${new Date().toISOString()}

${stepId === 'setup' ? '// Project configuration file' : ''}
${stepId === 'frontend' ? '// Frontend React component' : ''}
${stepId === 'backend' ? '// Backend API service' : ''}
${stepId === 'database' ? '// Database migration or schema' : ''}
${stepId === 'integration' ? '// Industry-specific integration' : ''}
${stepId === 'finalization' ? '// Deployment and documentation' : ''}

// This file is automatically generated based on your MES requirements.
// Customize as needed for your specific ${formData.industry} operations.

export default {};`;
  };

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'js':
        return 'javascript';
      case 'json':
        return 'json';
      case 'sql':
        return 'sql';
      case 'css':
        return 'css';
      case 'md':
        return 'markdown';
      case 'yml':
      case 'yaml':
        return 'yaml';
      default:
        return 'text';
    }
  };

  const handleViewFiles = () => {
    nextStep();
    navigate('/files');
  };

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Code Generation</h1>
              <p className="text-muted-foreground">Generating your MES application</p>
            </div>
          </div>
          
          {isGenerating && (
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Generating Code
              </Badge>
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Generation Progress
            </CardTitle>
            <CardDescription>
              Building your {state.formData.appName} application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {state.generatedFiles.length > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{state.generatedFiles.length} files generated</span>
                <span>•</span>
                <span>{state.formData.industry} industry</span>
                <span>•</span>
                <span>{state.formData.applicationType.replace('-', ' ')} focused</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generation Steps */}
        <div className="space-y-4">
          {generationSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === index && isGenerating;
            const isUpcoming = index > currentStep;

            return (
              <Card 
                key={step.id}
                className={`border transition-all duration-300 ${
                  isCompleted ? 'bg-green-50 border-green-200' :
                  isCurrent ? 'bg-blue-50 border-blue-200' :
                  'bg-card'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' :
                      isCurrent ? 'bg-blue-500' :
                      'bg-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : isCurrent ? (
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isUpcoming ? 'text-gray-500' : 'text-white'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${
                          isCompleted ? 'text-green-700' :
                          isCurrent ? 'text-blue-700' :
                          'text-gray-600'
                        }`}>
                          {step.title}
                        </h3>
                        {isCompleted && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Complete
                          </Badge>
                        )}
                        {isCurrent && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            <Clock className="w-3 h-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{step.description}</p>
                      
                      {(isCompleted || isCurrent) && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Generated Files:</p>
                          <div className="flex flex-wrap gap-1">
                            {step.files.map((file, fileIndex) => (
                              <Badge 
                                key={fileIndex} 
                                variant="outline" 
                                className="text-xs"
                              >
                                {file}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Generation Complete */}
        {!isGenerating && state.generatedFiles.length > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Code Generation Complete!
              </h3>
              <p className="text-green-600 mb-4">
                Your {state.formData.appName} application has been successfully generated with {state.generatedFiles.length} files.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={handleViewFiles}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <FileCode className="w-4 h-4" />
                  View Generated Files
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              previousStep();
              navigate('/prd');
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to PRD
          </Button>

          {!isGenerating && state.generatedFiles.length > 0 && (
            <Button
              onClick={handleViewFiles}
              className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <FileCode className="w-4 h-4" />
              Explore Files
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeGeneration;
