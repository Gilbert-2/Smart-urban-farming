
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlantGrowthCardProps {
  growthPercentage: number;
}

const PlantGrowthCard: React.FC<PlantGrowthCardProps> = ({ growthPercentage }) => {
  // Convert string to number if needed
  const growthValue = typeof growthPercentage === 'string' 
    ? parseFloat(growthPercentage) 
    : growthPercentage;
  
  // Determine plant growth stage
  const getGrowthStage = () => {
    if (growthValue < 20) return "Seedling";
    if (growthValue < 40) return "Early Growth";
    if (growthValue < 60) return "Vegetative";
    if (growthValue < 80) return "Mature";
    if (growthValue < 100) return "Ready for Harvest";
    return "Fully Grown";
  };
  
  // Get color based on growth stage
  const getGrowthColor = () => {
    if (growthValue < 20) return "bg-green-300";
    if (growthValue < 40) return "bg-green-400";
    if (growthValue < 60) return "bg-green-500";
    if (growthValue < 80) return "bg-green-600";
    if (growthValue < 100) return "bg-green-700";
    return "bg-emerald-600";
  };

  // Plant size visualization
  const getPlantHeight = () => {
    // Make sure to use the full range for plant height (5 to 100)
    return Math.max(5, Math.min(growthValue, 100));
  };

  // Get days to harvest estimate
  const getDaysToHarvest = () => {
    if (growthValue >= 80) return "Ready now!";
    const daysLeft = Math.ceil((80 - growthValue) / 5); // Rough estimate
    return `~${daysLeft} days`;
  }

  return (
    <Card className="border-2 border-gray-100 hover:border-green-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md text-gray-700 flex items-center">
            <Sprout className="h-5 w-5 text-green-600 mr-2" />
            <span>Plant Growth</span>
          </CardTitle>
          <span className={`text-sm ${
            growthValue >= 80 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          } px-2 py-1 rounded-full font-medium`}>
            {getGrowthStage()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-3xl font-bold">{growthValue.toFixed(1)}%</span>
          <span className="text-sm text-green-600 font-medium">
            {growthValue >= 100 ? "Fully Grown!" : (growthValue >= 80 ? "Ready!" : `Harvest in: ${getDaysToHarvest()}`)}
          </span>
        </div>
        
        <div className="relative pt-1 mb-6">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div 
              style={{ width: `${growthValue}%` }}
              className={`${getGrowthColor()} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500`}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>0%</span>
            <span>Harvest at 80%</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Plant visualization */}
        <div className="flex justify-center h-28 relative">
          <div className="absolute bottom-0 w-full bg-amber-100 h-3 rounded-t-sm"></div>
          
          {/* Plant stem */}
          <div 
            className="absolute bottom-3"
            style={{ height: `${getPlantHeight() * 0.2}px` }}
          >
            <div className="w-2 bg-green-600 h-full mx-auto relative">
              {/* Add some texture to the stem */}
              {growthValue > 30 && (
                <div className="absolute top-1/2 left-1/2 w-1 h-4 bg-green-700 -translate-y-1/2 -translate-x-1/2"></div>
              )}
            </div>
            
            {/* Plant leaves - show more as growth increases */}
            {growthValue >= 10 && (
              <div className="absolute w-6 h-3 bg-green-500 rounded-full -left-6 top-1 transform -rotate-12"></div>
            )}
            
            {growthValue >= 20 && (
              <div className="absolute w-6 h-3 bg-green-500 rounded-full -right-6 top-3 transform rotate-12"></div>
            )}
            
            {growthValue >= 40 && (
              <div className="absolute w-8 h-4 bg-green-500 rounded-full -left-8 top-6 transform -rotate-12"></div>
            )}
            
            {growthValue >= 50 && (
              <div className="absolute w-8 h-4 bg-green-500 rounded-full -right-8 top-8 transform rotate-12"></div>
            )}
            
            {growthValue >= 70 && (
              <div className="absolute w-10 h-5 bg-green-500 rounded-full -left-10 top-10 transform -rotate-12"></div>
            )}
            
            {growthValue >= 80 && (
              <div className="absolute w-10 h-5 bg-green-500 rounded-full -right-10 top-12 transform rotate-12"></div>
            )}
            
            {/* Add more leaves for near-fully grown plants */}
            {growthValue >= 90 && (
              <div className="absolute w-11 h-6 bg-green-600 rounded-full -left-12 top-3 transform -rotate-20"></div>
            )}
            
            {growthValue >= 95 && (
              <div className="absolute w-11 h-6 bg-green-600 rounded-full -right-12 top-5 transform rotate-20"></div>
            )}
            
            {/* Flower/fruit for fully grown plants */}
            {growthValue >= 100 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
                {/* Add little petals around the flower */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-amber-300 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-amber-300 rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-300 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Growth stages indicator */}
        <div className="flex justify-between mt-4 text-xs text-gray-500 border-t pt-2">
          <div className={`flex flex-col items-center ${growthValue >= 20 ? 'text-green-600 font-medium' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${growthValue >= 20 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Seedling</span>
          </div>
          <div className={`flex flex-col items-center ${growthValue >= 40 ? 'text-green-600 font-medium' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${growthValue >= 40 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Early</span>
          </div>
          <div className={`flex flex-col items-center ${growthValue >= 60 ? 'text-green-600 font-medium' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${growthValue >= 60 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Mature</span>
          </div>
          <div className={`flex flex-col items-center ${growthValue >= 80 ? 'text-green-600 font-medium' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${growthValue >= 80 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Harvest</span>
          </div>
          <div className={`flex flex-col items-center ${growthValue >= 100 ? 'text-green-600 font-medium' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${growthValue >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span>Full</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantGrowthCard;
