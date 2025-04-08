
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LightIntensityCardProps {
  value: number;
  time: Date;
}

const LightIntensityCard: React.FC<LightIntensityCardProps> = ({ value, time }) => {
  const maxLight = 15000;
  const percentage = (value / maxLight) * 100;
  
  // Get actual hours from time
  const hours = time.getHours();
  
  // Determine if it's day or night
  const isDay = hours >= 6 && hours <= 20;
  
  // Light intensity categories
  const getLightCategory = () => {
    if (value < 1000) return "Dark";
    if (value < 5000) return "Dim";
    if (value < 10000) return "Moderate";
    if (value < 15000) return "Bright";
    return "Very Bright";
  };
  
  // Get color based on light intensity
  const getLightColor = () => {
    if (value < 1000) return "bg-indigo-900";
    if (value < 5000) return "bg-indigo-600";
    if (value < 10000) return "bg-amber-400";
    return "bg-amber-500";
  };

  return (
    <Card className="overflow-hidden border-2 border-gray-100 hover:border-amber-300 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md text-gray-700 flex items-center">
            {isDay ? <SunIcon className="h-5 w-5 text-amber-500 mr-2" /> : <MoonIcon className="h-5 w-5 text-indigo-500 mr-2" />}
            <span>Light Intensity</span>
          </CardTitle>
          <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
            {getLightCategory()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-3xl font-bold">{value.toFixed(0)}</span>
          <span className="text-sm text-muted-foreground">lux</span>
        </div>
        
        <div className="relative pt-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>0</span>
            <div className="flex space-x-1">
              <span className="bg-amber-200 px-1.5 rounded">5000</span>
              <span>to</span>
              <span className="bg-amber-200 px-1.5 rounded">10000</span>
            </div>
            <span>15000</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div 
              style={{ width: `${percentage}%` }}
              className={`${getLightColor()} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500`}
            ></div>
          </div>
        </div>
        
        {/* Light visualization */}
        <div className="mt-2 flex justify-center">
          <div className="w-full h-8 bg-gradient-to-r from-indigo-900 via-amber-400 to-amber-500 rounded-lg opacity-70"></div>
          <div 
            className="absolute w-2 h-8 bg-white border-2 border-amber-600 rounded"
            style={{ marginLeft: `${percentage}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LightIntensityCard;
