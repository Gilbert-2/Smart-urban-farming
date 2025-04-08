
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets } from 'lucide-react';

interface WaterLevelCardProps {
  waterLevel: number;
}

const WaterLevelCard: React.FC<WaterLevelCardProps> = ({ waterLevel }) => {
  // Get the appropriate color based on water level
  const getWaterLevelColor = () => {
    if (waterLevel <= 20) return "bg-red-500";
    if (waterLevel <= 40) return "bg-amber-500";
    return "bg-blue-500";
  };

  // Get water level status
  const getWaterLevelStatus = () => {
    if (waterLevel <= 20) return "Low";
    if (waterLevel <= 40) return "Warning";
    if (waterLevel <= 60) return "Adequate";
    return "Full";
  };

  return (
    <Card className="border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md text-gray-700 flex items-center">
            <Droplets className="h-5 w-5 text-blue-600 mr-2" />
            <span>Water Level</span>
          </CardTitle>
          <span className={`text-sm px-2 py-1 rounded-full font-medium ${
            waterLevel <= 20 ? "bg-red-100 text-red-800" : 
            waterLevel <= 40 ? "bg-amber-100 text-amber-800" : 
            "bg-blue-100 text-blue-800"
          }`}>
            {getWaterLevelStatus()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-3">
          <span className="text-3xl font-bold">{waterLevel.toFixed(1)}%</span>
          {waterLevel <= 20 && (
            <span className="text-sm text-red-600 font-medium">Refill needed</span>
          )}
        </div>
        
        {/* Water tank visualization */}
        <div className="relative w-full h-32 border-2 border-gray-300 rounded-lg overflow-hidden">
          {/* Water fill animation */}
          <div 
            className={`absolute bottom-0 w-full ${getWaterLevelColor()} transition-all duration-1000 ease-in-out`}
            style={{ height: `${waterLevel}%` }}
          >
            {/* Water ripple effect */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-pulse"></div>
          </div>
          
          {/* Level markers */}
          <div className="absolute top-0 bottom-0 left-0 w-6 bg-white/50 flex flex-col justify-between text-xs font-medium px-1">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterLevelCard;
