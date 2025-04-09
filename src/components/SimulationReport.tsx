
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Share2, Package } from 'lucide-react';
import { SensorData, Alert } from '@/lib/types';

interface SimulationReportProps {
  simulationData: SensorData[];
  currentData: SensorData;
  alerts: Alert[];
  onDownload: () => void;
}

const SimulationReport: React.FC<SimulationReportProps> = ({ 
  simulationData, 
  currentData, 
  alerts,
  onDownload
}) => {
  // Calculate averages from simulation data
  const calculateAverages = () => {
    if (!simulationData.length) return { temp: 0, humidity: 0, soilMoisture: 0 };
    
    const sum = simulationData.reduce((acc, data) => {
      return {
        temp: acc.temp + data.temperature,
        humidity: acc.humidity + data.humidity,
        soilMoisture: acc.soilMoisture + data.soilMoisture
      };
    }, { temp: 0, humidity: 0, soilMoisture: 0 });
    
    return {
      temp: (sum.temp / simulationData.length).toFixed(1),
      humidity: (sum.humidity / simulationData.length).toFixed(1),
      soilMoisture: (sum.soilMoisture / simulationData.length).toFixed(1)
    };
  };
  
  const averages = calculateAverages();
  const growthValue = parseFloat(currentData.growthLevel);
  const warningAlertsCount = alerts.filter(a => a.level === 'warning').length;
  const errorAlertsCount = alerts.filter(a => a.level === 'error').length;
  
  const downloadEntireProject = () => {
    // Create a link element to download the project from GitHub
    window.open('https://github.com/your-username/smart-urban-farming-system/archive/main.zip', '_blank');
    
    // Alternatively, provide instructions for downloading via UI
    alert("To download the entire project:\n\n1. Click on the GitHub icon in the top right corner\n2. On the GitHub page, click the green 'Code' button\n3. Select 'Download ZIP'\n\nOr use version control: git clone https://github.com/your-username/smart-urban-farming-system.git");
  };
  
  return (
    <Card className="border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-md text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-indigo-600 mr-2" />
            <span>Simulation Report</span>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-sm transition-all"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Growth Progress</div>
            <div className="text-2xl font-bold text-gray-800">{growthValue.toFixed(1)}%</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Alert Summary</div>
            <div className="flex items-center space-x-2">
              {warningAlertsCount > 0 && (
                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                  {warningAlertsCount} warnings
                </span>
              )}
              {errorAlertsCount > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                  {errorAlertsCount} errors
                </span>
              )}
              {warningAlertsCount === 0 && errorAlertsCount === 0 && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  All good
                </span>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Average Temperature</div>
            <div className="text-lg font-semibold text-gray-800">{averages.temp}°C</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Average Humidity</div>
            <div className="text-lg font-semibold text-gray-800">{averages.humidity}%</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            Share Results
          </button>
          
          <button 
            onClick={downloadEntireProject}
            className="flex items-center bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm transition-all"
          >
            <Package className="h-4 w-4 mr-1" />
            Download Project
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulationReport;
