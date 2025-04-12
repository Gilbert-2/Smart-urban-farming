
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Wind, Zap } from 'lucide-react';

interface EnergyEfficiencyCardProps {
  ledEfficiency: number;
  renewableEnergyUse: number;
  energyConsumption: string;
}

const EnergyEfficiencyCard: React.FC<EnergyEfficiencyCardProps> = ({
  ledEfficiency,
  renewableEnergyUse,
  energyConsumption
}) => {
  const energyValue = parseFloat(energyConsumption);
  const getEnergyLabel = () => {
    if (energyValue < 300) return "Highly Efficient";
    if (energyValue < 500) return "Efficient";
    return "High Usage";
  };

  return (
    <Card className="border-2 border-gray-100 hover:border-green-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md text-gray-700 flex items-center">
          <Zap className="h-5 w-5 text-green-600 mr-2" />
          <span>Energy Efficiency</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* LED Lighting */}
        <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <Lightbulb className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">LED Lighting</p>
              <p className="font-medium">{ledEfficiency}% Efficient</p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-amber-800 border border-amber-200">
            {ledEfficiency >= 85 ? 'High Efficiency' : 'Standard'}
          </div>
        </div>

        {/* Renewable Energy */}
        <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Wind className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Renewable Energy</p>
              <p className="font-medium">{renewableEnergyUse}% of Total</p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-green-800 border border-green-200">
            {renewableEnergyUse >= 60 ? 'Eco-Friendly' : 'Moderate Use'}
          </div>
        </div>

        {/* Energy Consumption */}
        <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Energy Usage</p>
              <p className="font-medium">{energyValue.toFixed(2)} kWh</p>
            </div>
          </div>
          <div className="bg-white px-2 py-1 rounded-full text-xs font-semibold text-purple-800 border border-purple-200">
            {getEnergyLabel()}
          </div>
        </div>

        {/* Energy Efficiency Progress */}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">System Efficiency Rating</span>
            <span className="text-sm font-medium">
              {Math.round((ledEfficiency + renewableEnergyUse) / 2)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-green-300 to-green-600 h-2.5 rounded-full" 
              style={{ width: `${(ledEfficiency + renewableEnergyUse) / 2}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyEfficiencyCard;
