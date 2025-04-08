
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
import { toast } from "sonner";

const Index = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isRunning: false,
    simulationSpeed: 5,
    currentTime: new Date(mockData[0].timestamp),
    simulationData: mockData,
    alerts: mockAlerts,
  });
  
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const currentData = simulationState.simulationData[currentDataIndex];
  
  // Manual control flags
  const [manualControls, setManualControls] = useState({
    waterPump: false,
    growLights: false,
    ventilation: false,
    nutrientDispenser: false
  });

  // Calculate simulation progress
  const simulationProgress = (currentDataIndex / (simulationState.simulationData.length - 1)) * 100;

  // Check for critical conditions and create alerts
  useEffect(() => {
    // Only check for conditions if simulation is running or when just completed
    if (!simulationState.isRunning && !simulationCompleted) return;
    
    const checkConditionsAndCreateAlerts = () => {
      let newAlerts: Alert[] = [...simulationState.alerts];
      const currentTime = simulationState.currentTime;
      
      // Check water level
      if (currentData.waterLevel <= 25 && !newAlerts.some(a => a.message.includes('Water level critical'))) {
        newAlerts = [
          {
            level: 'error',
            message: 'Water level critical. Refill required!',
            timestamp: new Date(currentTime)
          },
          ...newAlerts
        ];
        
        toast.error("Critical: Water level too low!", {
          position: "top-center",
          duration: 5000,
        });
      } else if (currentData.waterLevel <= 40 && !newAlerts.some(a => a.message.includes('Water level low'))) {
        newAlerts = [
          {
            level: 'warning',
            message: 'Water level low. Consider refilling soon.',
            timestamp: new Date(currentTime)
          },
          ...newAlerts
        ];
      }
      
      // Check temperature
      if (currentData.temperature > 28 && !newAlerts.some(a => a.message.includes('temperature'))) {
        newAlerts = [
          {
            level: 'warning',
            message: 'Temperature above optimal range',
            timestamp: new Date(currentTime)
          },
          ...newAlerts
        ];
        
        toast.warning("Warning: Temperature too high", {
          position: "top-center",
        });
      }
      
      // Check soil moisture
      if (currentData.soilMoisture < 40 && !newAlerts.some(a => a.message.includes('soil moisture'))) {
        newAlerts = [
          {
            level: 'warning',
            message: 'Soil moisture low. Watering recommended.',
            timestamp: new Date(currentTime)
          },
          ...newAlerts
        ];
      }
      
      // Plant growth milestones
      const growthValue = parseFloat(currentData.growthLevel);
      if (growthValue >= 80 && growthValue < 85 && !newAlerts.some(a => a.message.includes('ready for harvest'))) {
        newAlerts = [
          {
            level: 'info',
            message: 'Plants ready for harvest!',
            timestamp: new Date(currentTime)
          },
          ...newAlerts
        ];
        
        toast.success("Plants are ready for harvest!", {
          position: "top-center",
        });
      }
      
      if (growthValue >= 98 && !newAlerts.some(a => a.message.includes('fully grown'))) {
        newAlerts = [
          {
            level: 'info',
            message: 'Plants have fully grown to 100%!',
            timestamp: new Date(currentTime)
          },
          ...newAlerts
        ];
        
        toast.success("Plants have reached full growth!", {
          position: "top-center",
          duration: 5000,
        });
      }
      
      if (newAlerts.length !== simulationState.alerts.length) {
        setSimulationState(prev => ({
          ...prev,
          alerts: newAlerts
        }));
      }
    };
    
    checkConditionsAndCreateAlerts();
  }, [currentDataIndex, simulationState.isRunning, currentData, simulationState.alerts, simulationCompleted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (simulationState.isRunning && !simulationCompleted) {
      interval = setInterval(() => {
        setCurrentDataIndex((prevIndex) => {
          // Check if we've reached the end of the data
          if (prevIndex + 1 >= simulationState.simulationData.length) {
            // Stop the simulation and mark as completed
            setSimulationState(prev => ({
              ...prev,
              isRunning: false
            }));
            setSimulationCompleted(true);
            toast.success("Simulation complete! Full 24-hour cycle finished.", {
              duration: 4000,
              position: "top-center",
            });
            
            // Also trigger one final alert check at completion
            setTimeout(() => {
              const finalGrowthValue = parseFloat(simulationState.simulationData[prevIndex].growthLevel);
              const finalAlert: Alert = {
                level: 'info',
                message: `Simulation completed with plant growth at ${finalGrowthValue}%`,
                timestamp: new Date()
              };
              
              setSimulationState(prev => ({
                ...prev,
                alerts: [finalAlert, ...prev.alerts]
              }));
            }, 500);
            
            return prevIndex; // Keep the index at the last data point
          }
          
          // Continue to next data point
          const newIndex = prevIndex + 1;
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
  }, [simulationState.isRunning, simulationState.simulationSpeed, simulationState.simulationData, simulationCompleted]);
  
  const handlePlayPause = () => {
    if (simulationCompleted && !simulationState.isRunning) {
      // Reset the simulation if it was completed and user wants to play again
      setCurrentDataIndex(0);
      setSimulationCompleted(false);
      setSimulationState(prev => ({
        ...prev,
        currentTime: new Date(mockData[0].timestamp),
        isRunning: true,
        alerts: [] // Clear alerts on restart
      }));
    } else {
      // Normal play/pause toggle
      setSimulationState(prev => ({
        ...prev,
        isRunning: !prev.isRunning
      }));
    }
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
    
    // Show notification when control is manually toggled
    const isActivated = !manualControls[control];
    const controlDisplayNames = {
      waterPump: "Water Pump",
      growLights: "Grow Lights",
      ventilation: "Ventilation",
      nutrientDispenser: "Nutrient Dispenser"
    };
    
    toast.info(`${controlDisplayNames[control]} ${isActivated ? 'activated' : 'deactivated'}`, {
      position: "bottom-right",
      duration: 2000,
    });
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
          isCompleted={simulationCompleted}
          progress={simulationProgress}
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
