
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Recycle, Flask } from 'lucide-react';

interface WaterManagementCardProps {
  recyclingEfficiency: number;
  waterQuality: number;
  phLevel: number;
  waterLevel: number;
}

const WaterManagementCard: React.FC<WaterManagementCardProps> = ({
  recyclingEfficiency,
  waterQuality,
  phLevel,
  waterLevel
}) => {
  const getPhLevelLabel = () => {
    if (phLevel < 6) return "Acidic";
    if (phLevel > 7) return "Alkaline";
    return "Optimal";
  };

  const getPhLevelColor = () => {
    if (phLevel < 5.5 || phLevel > 7.5) return "text-red-600 bg-red-100";
    if (phLevel < 6 || phLevel > 7) return "text-amber-600 bg-amber-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <Card className="border-2 border-gray-100 hover:border-cyan-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md text-gray-700 flex items-center">
          <Recycle className="h-5 w-5 text-cyan-600 mr-2" />
          <span>Water Management System</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Water Recycling */}
        <div className="flex items-center justify-between bg-cyan-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3">
              <Recycle className="h-5 w-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Closed-Loop Recycling</p>
              <p className="font-medium">{recyclingEfficiency}% Efficient</p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-cyan-800 border border-cyan-200">
            {recyclingEfficiency >= 80 ? 'High Efficiency' : 'Standard'}
          </div>
        </div>

        {/* Water Quality */}
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Water Quality</p>
              <p className="font-medium">{waterQuality}%</p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-blue-800 border border-blue-200">
            {waterQuality >= 90 ? 'Excellent' : waterQuality >= 70 ? 'Good' : 'Needs Filtering'}
          </div>
        </div>

        {/* pH Level */}
        <div className="flex items-center justify-between bg-violet-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-violet-100 rounded-full flex items-center justify-center mr-3">
              <Flask className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">pH Level</p>
              <p className="font-medium">{phLevel.toFixed(1)}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getPhLevelColor()}`}>
            {getPhLevelLabel()}
          </div>
        </div>

        {/* Current Tank Level */}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Tank Level</span>
            <span className="text-sm font-medium">{waterLevel.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full" style={{ width: `${waterLevel}%` }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterManagementCard;
