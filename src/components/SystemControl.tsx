
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Droplet, Sun, Fan, Beaker, PowerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemControlProps {
  waterPump: boolean;
  growLights: boolean;
  ventilation: boolean;
  nutrientDispenser: boolean;
  onToggleWaterPump: () => void;
  onToggleGrowLights: () => void;
  onToggleVentilation: () => void;
  onToggleNutrientDispenser: () => void;
}

const SystemControl: React.FC<SystemControlProps> = ({
  waterPump,
  growLights,
  ventilation,
  nutrientDispenser,
  onToggleWaterPump,
  onToggleGrowLights,
  onToggleVentilation,
  onToggleNutrientDispenser
}) => {
  const renderToggle = (
    icon: React.ReactNode,
    label: string,
    isActive: boolean,
    onToggle: () => void,
    activeColor: string
  ) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className={cn(
          "h-10 w-10 flex items-center justify-center rounded-full mr-3",
          isActive ? activeColor : "bg-gray-200"
        )}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className={cn(
          "text-xs px-2 py-1 rounded-full",
          isActive 
            ? "bg-green-100 text-green-800" 
            : "bg-gray-100 text-gray-800"
        )}>
          {isActive ? "ON" : "OFF"}
        </span>
        <Switch 
          checked={isActive}
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  );

  return (
    <Card className="border-2 border-gray-100 hover:border-purple-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md text-gray-700 flex items-center">
          <PowerIcon className="h-5 w-5 text-purple-600 mr-2" />
          <span>System Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {renderToggle(
          <Droplet className={cn("h-6 w-6", waterPump ? "text-blue-500" : "text-gray-500")} />,
          "Water Pump",
          waterPump,
          onToggleWaterPump,
          "bg-blue-100"
        )}
        
        {renderToggle(
          <Sun className={cn("h-6 w-6", growLights ? "text-amber-500" : "text-gray-500")} />,
          "Grow Lights",
          growLights,
          onToggleGrowLights,
          "bg-amber-100"
        )}
        
        {renderToggle(
          <Fan className={cn("h-6 w-6", ventilation ? "text-green-500" : "text-gray-500")} />,
          "Ventilation",
          ventilation,
          onToggleVentilation,
          "bg-green-100"
        )}
        
        {renderToggle(
          <Beaker className={cn("h-6 w-6", nutrientDispenser ? "text-purple-500" : "text-gray-500")} />,
          "Nutrient Dispenser",
          nutrientDispenser,
          onToggleNutrientDispenser,
          "bg-purple-100"
        )}
      </CardContent>
    </Card>
  );
};

export default SystemControl;
