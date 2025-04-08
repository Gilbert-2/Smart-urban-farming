
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  minValue: number;
  maxValue: number;
  optimalMin: number;
  optimalMax: number;
  inverted?: boolean;
}

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  icon,
  minValue,
  maxValue,
  optimalMin,
  optimalMax,
  inverted = false
}) => {
  // Calculate percentage for the progress bar
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;
  
  // Determine if the current value is within optimal range
  const isOptimal = value >= optimalMin && value <= optimalMax;
  
  // Determine color based on whether the value is within optimal range
  const getStatusColor = () => {
    if (inverted) {
      return value < optimalMin ? "bg-amber-500" : 
             value > optimalMax ? "bg-red-500" : 
             "bg-emerald-500";
    } else {
      return value < optimalMin ? "bg-amber-500" : 
             value > optimalMax ? "bg-amber-500" : 
             "bg-emerald-500";
    }
  };

  return (
    <Card className="overflow-hidden border-2 border-gray-100 hover:border-green-300 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md text-gray-700 flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
          <span className={cn(
            "text-sm px-2 py-1 rounded-full font-medium",
            isOptimal ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
          )}>
            {isOptimal ? "Optimal" : "Attention"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-3xl font-bold">{value.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        <div className="relative pt-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span>{minValue}</span>
            <div className="flex space-x-1">
              <span className="bg-emerald-200 px-1.5 rounded">{optimalMin}</span>
              <span>to</span>
              <span className="bg-emerald-200 px-1.5 rounded">{optimalMax}</span>
            </div>
            <span>{maxValue}</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div 
              style={{ width: `${percentage}%` }}
              className={`${getStatusColor()} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500`}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorCard;
