
import React from 'react';
import { Thermometer, Droplet, Gauge, Wind } from 'lucide-react';
import { SensorData } from '@/lib/types';
import SensorCard from '@/components/SensorCard';
import LightIntensityCard from '@/components/LightIntensityCard';
import WaterLevelCard from '@/components/WaterLevelCard';
import ResourceUsageCard from '@/components/ResourceUsageCard';
import PlantGrowthCard from '@/components/PlantGrowthCard';

interface SensorGridProps {
  currentData: SensorData;
  currentTime: Date;
}

const SensorGrid: React.FC<SensorGridProps> = ({ currentData, currentTime }) => {
  return (
    <>
      {/* Temperature */}
      <SensorCard 
        title="Temperature"
        value={currentData.temperature}
        unit="°C"
        icon={<Thermometer className="h-5 w-5 text-red-500 mr-2" />}
        minValue={10}
        maxValue={35}
        optimalMin={18}
        optimalMax={24}
      />
      
      {/* Humidity */}
      <SensorCard 
        title="Humidity"
        value={currentData.humidity}
        unit="%"
        icon={<Droplet className="h-5 w-5 text-blue-500 mr-2" />}
        minValue={0}
        maxValue={100}
        optimalMin={50}
        optimalMax={70}
      />
      
      {/* Soil Moisture */}
      <SensorCard 
        title="Soil Moisture"
        value={currentData.soilMoisture}
        unit="%"
        icon={<Gauge className="h-5 w-5 text-amber-600 mr-2" />}
        minValue={0}
        maxValue={100}
        optimalMin={60}
        optimalMax={80}
      />
      
      {/* CO2 Level */}
      <SensorCard 
        title="CO₂ Level"
        value={currentData.co2Level}
        unit="ppm"
        icon={<Wind className="h-5 w-5 text-green-500 mr-2" />}
        minValue={300}
        maxValue={1000}
        optimalMin={400}
        optimalMax={800}
        inverted={true}
      />
      
      {/* Light Intensity */}
      <LightIntensityCard 
        value={currentData.lightIntensity}
        time={currentTime}
      />
      
      {/* Water Level */}
      <WaterLevelCard 
        waterLevel={currentData.waterLevel}
      />
      
      {/* Resource Usage */}
      <ResourceUsageCard 
        energyConsumption={currentData.consumption.energy}
        waterConsumption={currentData.consumption.water}
      />
      
      {/* Plant Growth */}
      <PlantGrowthCard 
        growthPercentage={parseFloat(currentData.growthLevel)}
      />
    </>
  );
};

export default SensorGrid;
