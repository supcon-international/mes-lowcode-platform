import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone,
  RefreshCw,
  Play,
  Square,
  Settings,
  BarChart3,
  Users,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAppContext } from '../App';
import { cn } from '../lib/utils';

const AppPreview: React.FC = () => {
  const { state, nextStep, previousStep } = useAppContext();
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRunning, setIsRunning] = useState(true);
  const navigate = useNavigate();

  // Mock data for the preview
  const mockData = {
    workOrders: [
      { id: 'WO-1001', product: 'Engine Block A1', status: 'In Progress', progress: 75, priority: 'High' },
      { id: 'WO-1002', product: 'Transmission Unit B2', status: 'Completed', progress: 100, priority: 'Normal' },
      { id: 'WO-1003', product: 'Brake Assembly C3', status: 'Pending', progress: 0, priority: 'High' },
      { id: 'WO-1004', product: 'Suspension Kit D4', status: 'In Progress', progress: 45, priority: 'Low' }
    ],
    metrics: {
      activeOrders: 24,
      productionRate: 94.2,
      qualityScore: 98.7,
      oee: 87.3
    },
    activities: [
      { time: '2 mins ago', activity: 'Work Order #WO-1002 completed', type: 'success' },
      { time: '5 mins ago', activity: 'Quality check passed for Batch #B234', type: 'success' },
      { time: '12 mins ago', activity: 'Material request submitted', type: 'info' },
      { time: '18 mins ago', activity: 'Equipment maintenance scheduled', type: 'warning' },
      { time: '25 mins ago', activity: 'Production target reached', type: 'success' }
    ],
    qualityChecks: [
      { id: 'QC-001', product: 'Engine Block A1', result: 'Pass', inspector: 'John Smith' },
      { id: 'QC-002', product: 'Transmission Unit B2', result: 'Pass', inspector: 'Sarah Johnson' },
      { id: 'QC-003', product: 'Brake Assembly C3', result: 'Fail', inspector: 'Mike Wilson' }
    ]
  };

  const getViewModeStyles = () => {
    switch (viewMode) {
      case 'tablet':
        return 'max-w-3xl mx-auto';
      case 'mobile':
        return 'max-w-sm mx-auto';
      default:
        return 'w-full';
    }
  };

  const DashboardPreview = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{state.formData.appName}</h1>
        <p className="text-gray-600">Manufacturing Execution System Dashboard</p>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
              <p className="text-3xl font-bold text-blue-600">{mockData.metrics.activeOrders}</p>
            </div>
            <Activity className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Production Rate</h3>
              <p className="text-3xl font-bold text-green-600">{mockData.metrics.productionRate}%</p>
            </div>
            <BarChart3 className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quality Score</h3>
              <p className="text-3xl font-bold text-yellow-600">{mockData.metrics.qualityScore}%</p>
            </div>
            <CheckCircle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Equipment OEE</h3>
              <p className="text-3xl font-bold text-purple-600">{mockData.metrics.oee}%</p>
            </div>
            <Settings className="w-10 h-10 text-purple-600" />
          </div>
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Work Orders</h3>
          <div className="space-y-4">
            {mockData.workOrders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <Badge 
                    variant={order.status === 'Completed' ? 'default' : order.status === 'In Progress' ? 'secondary' : 'outline'}
                    className={cn(
                      order.status === 'Completed' && 'bg-green-100 text-green-700',
                      order.status === 'In Progress' && 'bg-blue-100 text-blue-700'
                    )}
                  >
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{order.product}</p>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">{order.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {mockData.activities.map((activity, index) => {
              const getActivityIcon = () => {
                switch (activity.type) {
                  case 'success':
                    return <CheckCircle className="w-4 h-4 text-green-500" />;
                  case 'warning':
                    return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
                  default:
                    return <Clock className="w-4 h-4 text-blue-500" />;
                }
              };

              return (
                <div key={index} className="flex items-start gap-3">
                  {getActivityIcon()}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const QualityControlPreview = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quality Control</h1>
        <p className="text-gray-600">Quality inspection and compliance management</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Inspections Today</h3>
          <p className="text-3xl font-bold text-blue-600">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Pass Rate</h3>
          <p className="text-3xl font-bold text-green-600">96.2%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">Pending Reviews</h3>
          <p className="text-3xl font-bold text-orange-600">3</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Quality Checks</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Check ID</th>
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Result</th>
                  <th className="text-left py-2">Inspector</th>
                </tr>
              </thead>
              <tbody>
                {mockData.qualityChecks.map(check => (
                  <tr key={check.id} className="border-b border-gray-100">
                    <td className="py-3 font-medium">{check.id}</td>
                    <td className="py-3">{check.product}</td>
                    <td className="py-3">
                      <Badge 
                        variant={check.result === 'Pass' ? 'default' : 'destructive'}
                        className={check.result === 'Pass' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {check.result}
                      </Badge>
                    </td>
                    <td className="py-3">{check.inspector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductionPreview = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Production Tracking</h1>
        <p className="text-gray-600">Real-time production monitoring and control</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Production Lines</h3>
          <div className="space-y-4">
            {['Line A - Assembly', 'Line B - Testing', 'Line C - Packaging'].map((line, index) => (
              <div key={line} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="font-medium">{line}</span>
                </div>
                <Badge variant="outline">
                  {index === 0 ? 'Running' : index === 1 ? 'Maintenance' : 'Offline'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Today's Target</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Units Produced</span>
                <span className="font-medium">665 / 850</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Efficiency</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '94%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Application Preview</h1>
                <p className="text-muted-foreground">Live preview of your {state.formData.appName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="h-8 w-8 p-0"
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="h-8 w-8 p-0"
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="h-8 w-8 p-0"
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
                className="gap-2"
              >
                {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Stop' : 'Start'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-6">
            <div className={cn("transition-all duration-300", getViewModeStyles())}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{
                height: viewMode === 'mobile' ? '667px' : viewMode === 'tablet' ? '768px' : '800px'
              }}>
                {isRunning ? (
                  <Tabs defaultValue="dashboard" className="h-full flex flex-col">
                    <div className="border-b border-gray-200 bg-white px-6 pt-4">
                      <TabsList className="grid w-full grid-cols-3 max-w-md">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="production">Production</TabsTrigger>
                        <TabsTrigger value="quality">Quality</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                      <TabsContent value="dashboard" className="m-0 h-full">
                        <DashboardPreview />
                      </TabsContent>
                      
                      <TabsContent value="production" className="m-0 h-full">
                        <ProductionPreview />
                      </TabsContent>
                      
                      <TabsContent value="quality" className="m-0 h-full">
                        <QualityControlPreview />
                      </TabsContent>
                    </div>
                  </Tabs>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                        <Square className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Application Stopped</h3>
                        <p className="text-gray-600">Click start to run the preview</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="p-6 border-t border-border bg-background/80">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Live</Badge>
                  <span className="text-sm font-medium">Preview Status</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Responsive Design</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">{state.formData.industry}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">{state.formData.applicationType.replace('-', ' ')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                previousStep();
                navigate('/files');
              }}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Files
            </Button>

            <Button
              onClick={() => {
                nextStep();
                navigate('/terminal');
              }}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
            >
              <Settings className="w-4 h-4" />
              Open Terminal
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreview;
