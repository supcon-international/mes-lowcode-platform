import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, FileEdit, Download, Sparkles, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { useAppContext } from '../App';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PRDGeneration: React.FC = () => {
  const { state, updateState, nextStep, previousStep } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.prdContent) {
      generatePRD();
    }
  }, []);

  const generatePRD = async () => {
    setIsGenerating(true);
    
    // Simulate PRD generation based on form data
    setTimeout(() => {
      const generatedPRD = createPRDContent();
      updateState({ prdContent: generatedPRD });
      setEditContent(generatedPRD);
      setIsGenerating(false);
    }, 3000);
  };

  const createPRDContent = (): string => {
    const { formData } = state;
    const currentDate = new Date().toLocaleDateString();
    
    return `# Product Requirements Document (PRD)
## ${formData.appName}

**Document Version:** 1.0  
**Date:** ${currentDate}  
**Industry:** ${formData.industry}  
**Application Type:** ${formData.applicationType}

---

## 1. Executive Summary

This document outlines the requirements for developing **${formData.appName}**, a comprehensive Manufacturing Execution System (MES) designed specifically for the ${formData.industry} industry. The system will focus on ${formData.applicationType.replace('-', ' ')} capabilities while providing a modern, user-friendly interface for production managers and operators.

## 2. Project Overview

### 2.1 Purpose
The ${formData.appName} system aims to streamline manufacturing operations by providing real-time visibility, control, and optimization of production processes specific to ${formData.industry} operations.

### 2.2 Scope
- Production tracking and monitoring
- Quality control and compliance management
- Resource planning and scheduling
- Real-time data collection and analytics
- Integration with existing enterprise systems

### 2.3 Target Users
- **Production Managers**: Overall production oversight and decision-making
- **Quality Control Specialists**: Quality assurance and compliance monitoring
- **Machine Operators**: Daily production execution and data entry
- **Plant Supervisors**: Shift management and resource coordination
- **System Administrators**: User management and system configuration

## 3. Functional Requirements

### 3.1 Core Features

#### 3.1.1 Production Tracking
- **Real-time Production Monitoring**: Live dashboard showing current production status
- **Work Order Management**: Create, track, and complete work orders
- **Production Scheduling**: Visual scheduling interface with drag-and-drop functionality
- **Machine Status Monitoring**: Real-time equipment status and utilization tracking
- **Production Metrics**: KPI tracking including OEE, throughput, and cycle times

#### 3.1.2 Quality Control
- **Quality Plan Management**: Define and manage quality control procedures
- **Inspection Workflows**: Guided inspection processes with checklist functionality
- **Non-Conformance Tracking**: Record and track quality issues and corrective actions
- **Statistical Process Control**: SPC charts and trend analysis
- **Compliance Reporting**: Automated compliance reports for regulatory requirements

#### 3.1.3 Inventory Management
- **Material Tracking**: Real-time inventory levels and consumption tracking
- **Lot/Batch Traceability**: Complete traceability from raw materials to finished goods
- **Warehouse Management**: Location tracking and inventory movements
- **Supplier Integration**: Integration with supplier systems for material planning

#### 3.1.4 Resource Management
- **Personnel Management**: Skill-based resource allocation and scheduling
- **Equipment Management**: Maintenance scheduling and performance tracking
- **Tool Management**: Tool allocation and calibration tracking
- **Capacity Planning**: Resource capacity analysis and optimization

### 3.2 Industry-Specific Features

${getIndustrySpecificFeatures(formData.industry)}

### 3.3 Integration Requirements
- **ERP Integration**: Seamless integration with existing ERP systems
- **SCADA/PLC Integration**: Real-time data collection from production equipment
- **Laboratory Information Systems (LIMS)**: Integration for quality data management
- **Warehouse Management Systems (WMS)**: Inventory and logistics integration
- **Business Intelligence Tools**: Data export for advanced analytics

## 4. Technical Requirements

### 4.1 System Architecture
- **Cloud-Native Design**: Scalable, microservices-based architecture
- **API-First Approach**: RESTful APIs for all system interactions
- **Real-Time Capabilities**: WebSocket support for live data updates
- **Mobile Responsive**: Cross-platform compatibility for mobile devices

### 4.2 Performance Requirements
- **Response Time**: < 2 seconds for all user interactions
- **Availability**: 99.9% uptime with automatic failover capabilities
- **Scalability**: Support for 100+ concurrent users
- **Data Retention**: 7 years of historical data storage

### 4.3 Security Requirements
- **Authentication**: Multi-factor authentication support
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: End-to-end encryption for all data transmission
- **Audit Trail**: Complete audit logging for all system activities
- **Compliance**: Industry-specific compliance standards adherence

## 5. User Interface Requirements

### 5.1 Design Principles
- **Intuitive Navigation**: Clean, modern interface with logical workflow
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 AA compliance for accessibility
- **Customizable Dashboards**: User-configurable dashboard layouts

### 5.2 Key Interfaces
- **Production Dashboard**: Real-time production overview with key metrics
- **Work Order Interface**: Streamlined work order creation and management
- **Quality Control Interface**: Inspection forms and quality data entry
- **Reporting Interface**: Interactive reports and analytics
- **Administration Interface**: System configuration and user management

## 6. Implementation Plan

### 6.1 Development Phases
- **Phase 1**: Core production tracking functionality (8 weeks)
- **Phase 2**: Quality control and compliance features (6 weeks)
- **Phase 3**: Advanced analytics and reporting (4 weeks)
- **Phase 4**: Integration and deployment (4 weeks)

### 6.2 Technology Stack
- **Frontend**: React with TypeScript, responsive design
- **Backend**: Node.js with Express.js framework
- **Database**: PostgreSQL for transactional data, InfluxDB for time-series data
- **Real-time**: WebSocket for live updates
- **Authentication**: OAuth 2.0 with JWT tokens
- **Deployment**: Docker containers with Kubernetes orchestration

## 7. Success Criteria

### 7.1 Key Performance Indicators
- **Production Efficiency**: 15% improvement in overall equipment effectiveness (OEE)
- **Quality Metrics**: 25% reduction in quality incidents
- **Data Accuracy**: 99%+ data accuracy in production reporting
- **User Adoption**: 90%+ user adoption within 3 months of deployment
- **System Performance**: <2 second response times for all operations

### 7.2 Business Outcomes
- Improved production visibility and control
- Enhanced quality management and compliance
- Reduced manual data entry and errors
- Better resource utilization and scheduling
- Faster decision-making through real-time insights

## 8. Risk Assessment

### 8.1 Technical Risks
- **Integration Complexity**: Risk of complex integrations with legacy systems
- **Data Migration**: Risk of data loss during migration from existing systems
- **Performance**: Risk of performance issues under high load

### 8.2 Mitigation Strategies
- **Phased Rollout**: Gradual implementation to minimize disruption
- **Comprehensive Testing**: Extensive testing in staging environment
- **Change Management**: User training and support programs
- **Backup Systems**: Robust backup and recovery procedures

## 9. Additional Requirements

${formData.customRequirements ? `### 9.1 Custom Requirements\n${formData.customRequirements}` : ''}

### 9.2 Compliance Requirements
${getComplianceRequirements(formData.industry)}

### 9.3 Future Enhancements
- Machine learning for predictive maintenance
- Advanced analytics and AI-powered insights
- IoT device integration for enhanced data collection
- Mobile app for field operations
- Voice-enabled interfaces for hands-free operation

---

**Document Status:** Draft  
**Next Review Date:** ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}  
**Approved By:** [To be filled]

---

*This PRD serves as the foundation for the development of ${formData.appName}. All stakeholders should review and approve this document before proceeding with development.*`;
  };

  const getIndustrySpecificFeatures = (industry: string): string => {
    switch (industry) {
      case 'automotive':
        return `#### Automotive-Specific Features
- **Vehicle Identification Number (VIN) Tracking**: Complete vehicle traceability
- **Just-in-Time (JIT) Production**: Lean manufacturing support
- **Supplier Quality Management**: Vendor quality scorecards and audits
- **Recall Management**: Product recall tracking and notification systems
- **IATF 16949 Compliance**: Automotive quality management standards`;
      
      case 'pharmaceuticals':
        return `#### Pharmaceutical-Specific Features
- **Batch Record Management**: Electronic batch records (EBR) with e-signatures
- **FDA 21 CFR Part 11 Compliance**: Electronic records and signatures validation
- **Serialization and Track & Trace**: Product serialization for anti-counterfeiting
- **Deviation Management**: Automated deviation tracking and investigation
- **Good Manufacturing Practice (GMP) Compliance**: GMP documentation and procedures`;
      
      case 'food-beverage':
        return `#### Food & Beverage-Specific Features
- **HACCP Management**: Hazard Analysis Critical Control Points tracking
- **Allergen Management**: Allergen tracking and cross-contamination prevention
- **Shelf-Life Management**: Expiration date tracking and FIFO management
- **Nutritional Information**: Recipe management with nutritional calculations
- **FDA Food Safety Modernization Act (FSMA) Compliance**: Food safety regulations`;
      
      case 'electronics':
        return `#### Electronics-Specific Features
- **Component Traceability**: Electronic component tracking and genealogy
- **Test Data Management**: Automated test equipment (ATE) integration
- **Counterfeit Prevention**: Component authentication and verification
- **RoHS Compliance**: Restriction of Hazardous Substances tracking
- **IPC Standards**: Electronics manufacturing standards compliance`;
      
      default:
        return `#### Manufacturing-Specific Features
- **Lean Manufacturing**: Waste reduction and continuous improvement tools
- **Six Sigma Integration**: Statistical quality control and process improvement
- **Preventive Maintenance**: Equipment maintenance scheduling and tracking
- **Energy Management**: Energy consumption monitoring and optimization
- **Environmental Compliance**: Environmental impact tracking and reporting`;
    }
  };

  const getComplianceRequirements = (industry: string): string => {
    switch (industry) {
      case 'automotive':
        return `- IATF 16949 (Automotive Quality Management)
- ISO 14001 (Environmental Management)
- OSHA Safety Standards
- EPA Environmental Regulations`;
      
      case 'pharmaceuticals':
        return `- FDA 21 CFR Part 11 (Electronic Records)
- ICH Guidelines (International Council for Harmonisation)
- Good Manufacturing Practice (GMP)
- ISO 13485 (Medical Devices Quality Management)`;
      
      case 'food-beverage':
        return `- FDA Food Safety Modernization Act (FSMA)
- HACCP (Hazard Analysis Critical Control Points)
- SQF (Safe Quality Food) Certification
- USDA Regulations`;
      
      default:
        return `- ISO 9001 (Quality Management Systems)
- ISO 14001 (Environmental Management)
- OSHA Safety Standards
- Industry-specific regulatory requirements`;
    }
  };

  const handleSavePRD = () => {
    updateState({ prdContent: editContent });
    setIsEditing(false);
  };

  const handleDownloadPRD = () => {
    const blob = new Blob([state.prdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.formData.appName.replace(/\s+/g, '_')}_PRD.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerateCode = () => {
    nextStep();
    navigate('/code');
  };

  if (isGenerating) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <FileEdit className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Generating PRD</h3>
              <p className="text-muted-foreground">Creating your Product Requirements Document...</p>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
              </div>
              <p className="text-sm text-muted-foreground">Analyzing requirements and generating content...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileEdit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Product Requirements Document</h1>
                <p className="text-muted-foreground">Review and edit your MES requirements</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                Generated
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPRD}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="preview" className="h-full flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="preview" className="flex-1 p-6 m-0">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>PRD Preview</CardTitle>
                  <CardDescription>
                    Review the generated Product Requirements Document
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full px-6">
                    <div className="prose prose-slate max-w-none pb-6">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {state.prdContent}
                      </ReactMarkdown>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="edit" className="flex-1 p-6 m-0">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Edit PRD</CardTitle>
                      <CardDescription>
                        Modify the PRD content using Markdown syntax
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditContent(state.prdContent);
                          setIsEditing(false);
                        }}
                      >
                        Reset
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSavePRD}
                        className="gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="h-full w-full resize-none border-0 focus:ring-0 font-mono text-sm"
                    placeholder="Edit your PRD content here..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border bg-background/80">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => {
                previousStep();
                navigate('/form');
              }}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Form
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={generatePRD}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </Button>
              
              <Button
                onClick={handleGenerateCode}
                className="gap-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              >
                <Sparkles className="w-4 h-4" />
                Generate Code
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PRDGeneration;
