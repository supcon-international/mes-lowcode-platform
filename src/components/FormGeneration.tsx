import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Factory, Settings, FileText, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useAppContext } from '../App';

const FormGeneration: React.FC = () => {
  const { state, updateState, nextStep, previousStep } = useAppContext();
  const [formData, setFormData] = useState(state.formData);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const industries = [
    { value: 'manufacturing', label: 'General Manufacturing', description: 'Multi-purpose manufacturing operations' },
    { value: 'automotive', label: 'Automotive', description: 'Vehicle and parts manufacturing' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals', description: 'Drug and medical device production' },
    { value: 'food-beverage', label: 'Food & Beverage', description: 'Food processing and packaging' },
    { value: 'electronics', label: 'Electronics', description: 'Electronic components and devices' },
    { value: 'aerospace', label: 'Aerospace', description: 'Aircraft and space technology' },
    { value: 'chemical', label: 'Chemical', description: 'Chemical processing and materials' },
    { value: 'textiles', label: 'Textiles', description: 'Fabric and clothing manufacturing' }
  ];

  const applicationTypes = [
    { value: 'production-tracking', label: 'Production Tracking', description: 'Monitor production progress and performance' },
    { value: 'quality-control', label: 'Quality Control', description: 'Quality assurance and compliance management' },
    { value: 'inventory-management', label: 'Inventory Management', description: 'Material and product inventory tracking' },
    { value: 'resource-planning', label: 'Resource Planning', description: 'Planning and scheduling resources' },
    { value: 'maintenance', label: 'Maintenance Management', description: 'Equipment maintenance and monitoring' },
    { value: 'compliance', label: 'Compliance & Reporting', description: 'Regulatory compliance and reporting' },
    { value: 'analytics', label: 'Analytics & Dashboards', description: 'Data analysis and visualization' },
    { value: 'comprehensive', label: 'Comprehensive MES', description: 'Full-featured manufacturing execution system' }
  ];

  useEffect(() => {
    // Auto-generate form based on chat history if form is empty
    if (!formData.appName && state.chatHistory.length > 0) {
      generateFormFromChat();
    }
  }, []);

  const generateFormFromChat = () => {
    const chatContent = state.chatHistory
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content.toLowerCase())
      .join(' ');

    // Extract likely app name
    let suggestedName = '';
    if (chatContent.includes('automotive')) suggestedName = 'Automotive MES';
    else if (chatContent.includes('pharmaceutical')) suggestedName = 'Pharma MES';
    else if (chatContent.includes('food')) suggestedName = 'Food Production MES';
    else if (chatContent.includes('electronics')) suggestedName = 'Electronics MES';
    else suggestedName = 'Manufacturing MES';

    // Extract likely industry
    let suggestedIndustry = '';
    if (chatContent.includes('automotive')) suggestedIndustry = 'automotive';
    else if (chatContent.includes('pharmaceutical') || chatContent.includes('pharma')) suggestedIndustry = 'pharmaceuticals';
    else if (chatContent.includes('food') || chatContent.includes('beverage')) suggestedIndustry = 'food-beverage';
    else if (chatContent.includes('electronics') || chatContent.includes('electronic')) suggestedIndustry = 'electronics';
    else suggestedIndustry = 'manufacturing';

    // Extract likely application type
    let suggestedType = '';
    if (chatContent.includes('quality')) suggestedType = 'quality-control';
    else if (chatContent.includes('inventory')) suggestedType = 'inventory-management';
    else if (chatContent.includes('track') || chatContent.includes('production')) suggestedType = 'production-tracking';
    else if (chatContent.includes('comprehensive') || chatContent.includes('full')) suggestedType = 'comprehensive';
    else suggestedType = 'production-tracking';

    const generatedForm = {
      appName: suggestedName,
      industry: suggestedIndustry,
      applicationType: suggestedType,
      customRequirements: state.formData.customRequirements
    };

    setFormData(generatedForm);
    updateState({ formData: generatedForm });
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
    updateState({ formData: updatedForm });
  };

  const handleGeneratePRD = async () => {
    if (!formData.appName || !formData.industry || !formData.applicationType) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate PRD generation
    setTimeout(() => {
      setIsGenerating(false);
      nextStep();
      navigate('/prd');
    }, 2000);
  };

  const selectedIndustry = industries.find(i => i.value === formData.industry);
  const selectedAppType = applicationTypes.find(a => a.value === formData.applicationType);

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20 overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Application Configuration</h1>
              <p className="text-muted-foreground">Configure your MES application details</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Auto-generated from chat
            </Badge>
          </div>
        </div>

        {/* Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              MES Application Details
            </CardTitle>
            <CardDescription>
              Define the core specifications for your manufacturing execution system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Application Name */}
            <div className="space-y-2">
              <Label htmlFor="appName" className="text-base font-medium">Application Name</Label>
              <Input
                id="appName"
                value={formData.appName}
                onChange={(e) => handleInputChange('appName', e.target.value)}
                placeholder="e.g., Automotive Production MES"
                className="h-12 text-base"
              />
              <p className="text-sm text-muted-foreground">
                Choose a descriptive name for your MES application
              </p>
            </div>

            <Separator />

            {/* Industry Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Industry Type</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      <div className="flex items-center gap-3">
                        <Factory className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{industry.label}</div>
                          <div className="text-xs text-muted-foreground">{industry.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedIndustry && (
                <Card className="bg-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Factory className="w-4 h-4 text-primary" />
                      <span className="font-medium">{selectedIndustry.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedIndustry.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator />

            {/* Application Type Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Application Type</Label>
              <Select value={formData.applicationType} onValueChange={(value) => handleInputChange('applicationType', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select application type" />
                </SelectTrigger>
                <SelectContent>
                  {applicationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedAppType && (
                <Card className="bg-secondary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="font-medium">{selectedAppType.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedAppType.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator />

            {/* Custom Requirements */}
            <div className="space-y-2">
              <Label htmlFor="customRequirements" className="text-base font-medium">
                Additional Requirements
              </Label>
              <Textarea
                id="customRequirements"
                value={formData.customRequirements}
                onChange={(e) => handleInputChange('customRequirements', e.target.value)}
                placeholder="Describe any specific features, integrations, or custom requirements..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4" />
                Include specific workflows, integrations, compliance needs, or custom features
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Preview */}
        {formData.appName && formData.industry && formData.applicationType && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Application</Label>
                  <p className="font-medium">{formData.appName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Industry</Label>
                  <p className="font-medium">{selectedIndustry?.label}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <p className="font-medium">{selectedAppType?.label}</p>
                </div>
              </div>
              {formData.customRequirements && (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Requirements</Label>
                  <p className="text-sm">{formData.customRequirements}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              previousStep();
              navigate('/chat');
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Chat
          </Button>

          <Button
            onClick={handleGeneratePRD}
            disabled={!formData.appName || !formData.industry || !formData.applicationType || isGenerating}
            className="gap-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating PRD...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate PRD
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormGeneration;
