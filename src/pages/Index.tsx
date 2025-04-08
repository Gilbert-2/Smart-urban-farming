
import React, { useState, useEffect } from 'react';
import { Thermometer, Droplet, Gauge, Wind } from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import SensorCard from '@/components/SensorCard';
import LightIntensityCard from '@/components/LightIntensityCard';
import SystemControl from '@/components/SystemControl';
import PlantGrowthCard from '@/components/PlantGrowthCard';
import ResourceUsageCard from '@/components/ResourceUsageCard';
import WaterLevelCard from '@/components/WaterLevelCard';
import AlertsCard from '@/components/AlertsCard';
import { mockData, mockAlerts } from '@/lib/mockData';
import { SensorData, Alert, SimulationState } from '@/lib/types';

const Index = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    simulationSpeed: 5,
    currentTime: new Date(mockData[0].timestamp),
    simulationData: mockData,
    alerts: mockAlerts,
  });
  
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const currentData = simulationState.simulationData[currentDataIndex];
  
  // Manual control flags
  const [manualControls, setManualControls] = useState({
    waterPump: false,
    growLights: false,
    ventilation: false,
    nutrientDispenser: false
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulationState.isRunning) {
      interval = setInterval(() => {
        setCurrentDataIndex((prevIndex) => {
          // Loop back to start if we reach the end
          const newIndex = prevIndex + 1 < simulationState.simulationData.length ? prevIndex + 1 : 0;
          // Update current time
          setSimulationState(prev => ({
            ...prev,
            currentTime: new Date(simulationState.simulationData[newIndex].timestamp)
          }));
          return newIndex;
        });
      }, 1000 / simulationState.simulationSpeed); // Adjust speed
    }
    
    return () => clearInterval(interval);
  }, [simulationState.isRunning, simulationState.simulationSpeed, simulationState.simulationData]);
  
  const handlePlayPause = () => {
    setSimulationState(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };
  
  const handleSpeedChange = (speed: number) => {
    setSimulationState(prev => ({
      ...prev,
      simulationSpeed: speed
    }));
  };
  
  const handleDismissAlert = (index: number) => {
    setSimulationState(prev => ({
      ...prev,
      alerts: prev.alerts.filter((_, i) => i !== index)
    }));
  };
  
  // Toggle system controls
  const toggleControl = (control: keyof typeof manualControls) => {
    setManualControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };
  
  // Determine actuator status (either from simulation or manual override)
  const getActuatorStatus = (control: keyof typeof manualControls) => {
    // If manual control is active, use that state
    return manualControls[control];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          currentTime={simulationState.currentTime}
          isRunning={simulationState.isRunning}
          simulationSpeed={simulationState.simulationSpeed}
          onPlayPause={handlePlayPause}
          onSpeedChange={handleSpeedChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            time={simulationState.currentTime}
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
          
          {/* System Controls */}
          <SystemControl 
            waterPump={getActuatorStatus('waterPump')}
            growLights={getActuatorStatus('growLights')}
            ventilation={getActuatorStatus('ventilation')}
            nutrientDispenser={getActuatorStatus('nutrientDispenser')}
            onToggleWaterPump={() => toggleControl('waterPump')}
            onToggleGrowLights={() => toggleControl('growLights')}
            onToggleVentilation={() => toggleControl('ventilation')}
            onToggleNutrientDispenser={() => toggleControl('nutrientDispenser')}
          />
          
          {/* Alerts */}
          <div className="lg:col-span-3">
            <AlertsCard 
              alerts={simulationState.alerts}
              onDismissAlert={handleDismissAlert}
            />
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Smart Urban Farming System • Simulation Dashboard • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
