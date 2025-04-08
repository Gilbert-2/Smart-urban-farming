
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Zap } from 'lucide-react';

interface ResourceUsageCardProps {
  energyConsumption: string;
  waterConsumption: string;
}

const ResourceUsageCard: React.FC<ResourceUsageCardProps> = ({
  energyConsumption,
  waterConsumption
}) => {
  return (
    <Card className="border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-md text-gray-700">Resource Consumption</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start justify-between p-3 bg-amber-50 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <Zap className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Energy Usage</p>
              <p className="text-xl font-bold">{parseFloat(energyConsumption).toFixed(2)} <span className="text-sm font-normal text-gray-500">kWh</span></p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-medium text-amber-800 border border-amber-200">
            {parseFloat(energyConsumption) < 500 ? 'Efficient' : 'High Usage'}
          </div>
        </div>
        
        <div className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Water Usage</p>
              <p className="text-xl font-bold">{parseFloat(waterConsumption).toFixed(2)} <span className="text-sm font-normal text-gray-500">liters</span></p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-medium text-blue-800 border border-blue-200">
            {parseFloat(waterConsumption) < 10 ? 'Conservative' : 'Moderate'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUsageCard;
