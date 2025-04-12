import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { SensorData, Alert, SimulationState } from '@/lib/types';
import { mockData, mockAlerts } from '@/lib/mockData';

export const useSimulation = () => {
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
  
  // Calculate simulation progress
  const simulationProgress = (currentDataIndex / (simulationState.simulationData.length - 1)) * 100;

  // Handle system controls
  const [manualControls, setManualControls] = useState({
    waterPump: false,
    growLights: false,
    ventilation: false,
    nutrientDispenser: false
  });

  // New state for water management and energy efficiency
  const [waterManagement, setWaterManagement] = useState({
    recyclingEfficiency: 85, // percentage of water recycled
    waterQuality: 92,        // percentage of water quality
    phLevel: 6.5,            // pH level (6-7 is optimal for most plants)
  });

  const [energyEfficiency, setEnergyEfficiency] = useState({
    ledEfficiency: 90,       // percentage of energy efficiency for LED lighting
    renewableEnergyUse: 65,  // percentage of energy from renewable sources
  });

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
  
  const checkSystemRequirements = () => {
    const { waterPump, growLights, ventilation } = manualControls;
    
    if (!waterPump) {
      toast.error("Water pump must be turned on before starting simulation", {
        position: "top-center",
        duration: 4000,
      });
      return false;
    }
    
    if (!growLights) {
      toast.error("Grow lights must be turned on before starting simulation", {
        position: "top-center",
        duration: 4000,
      });
      return false;
    }
    
    if (!ventilation) {
      toast.error("Ventilation system must be turned on before starting simulation", {
        position: "top-center",
        duration: 4000,
      });
      return false;
    }
    
    return true;
  };
  
  const handlePlayPause = () => {
    if (simulationCompleted && !simulationState.isRunning) {
      // Reset the simulation if it was completed and user wants to play again
      if (!checkSystemRequirements()) return;
      
      setCurrentDataIndex(0);
      setSimulationCompleted(false);
      setSimulationState(prev => ({
        ...prev,
        currentTime: new Date(mockData[0].timestamp),
        isRunning: true,
        alerts: [] // Clear alerts on restart
      }));
      
      toast.success("Simulation started with optimized water and energy settings", {
        position: "top-center",
        duration: 3000,
      });
    } else if (!simulationState.isRunning) {
      // Starting the simulation - check requirements
      if (!checkSystemRequirements()) return;
      
      // Normal play/pause toggle
      setSimulationState(prev => ({
        ...prev,
        isRunning: true
      }));
      
      toast.success("Simulation started with optimized water and energy settings", {
        position: "top-center",
        duration: 3000,
      });
    } else {
      // Pausing the simulation
      setSimulationState(prev => ({
        ...prev,
        isRunning: false
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

    // Add optimization messages for specific controls
    if (control === 'waterPump' && isActivated) {
      toast.success("Closed-loop water recycling system activated", {
        position: "bottom-right",
        duration: 3000,
      });
    }
    
    if (control === 'growLights' && isActivated) {
      toast.success("Energy-efficient LED lighting system activated", {
        position: "bottom-right",
        duration: 3000,
      });
    }

    if (control === 'ventilation' && isActivated) {
      toast.success("Optimized climate control system activated", {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };
  
  // Determine actuator status (either from simulation or manual override)
  const getActuatorStatus = (control: keyof typeof manualControls) => {
    // If manual control is active, use that state
    return manualControls[control];
  };

  // Handle report download
  const handleDownloadReport = () => {
    try {
      // Generate report content
      const reportTitle = "Smart Urban Farming System - Simulation Report";
      const dateTime = new Date().toLocaleString();
      const growthValue = parseFloat(currentData.growthLevel).toFixed(1);
      
      let reportContent = `${reportTitle}\n`;
      reportContent += `Generated: ${dateTime}\n\n`;
      reportContent += `SIMULATION SUMMARY\n`;
      reportContent += `----------------\n`;
      reportContent += `Plant Growth: ${growthValue}%\n`;
      reportContent += `Final Temperature: ${currentData.temperature.toFixed(1)}°C\n`;
      reportContent += `Final Humidity: ${currentData.humidity.toFixed(1)}%\n`;
      reportContent += `Final Soil Moisture: ${currentData.soilMoisture.toFixed(1)}%\n`;
      reportContent += `Final Water Level: ${currentData.waterLevel.toFixed(1)}%\n`;
      reportContent += `Total Energy Consumption: ${currentData.consumption.energy} kWh\n`;
      reportContent += `Total Water Consumption: ${currentData.consumption.water} liters\n\n`;
      
      // Add new water management and energy efficiency data
      reportContent += `WATER MANAGEMENT METRICS\n`;
      reportContent += `----------------------\n`;
      reportContent += `Water Recycling Efficiency: ${waterManagement.recyclingEfficiency}%\n`;
      reportContent += `Water Quality: ${waterManagement.waterQuality}%\n`;
      reportContent += `pH Level: ${waterManagement.phLevel}\n\n`;
      
      reportContent += `ENERGY EFFICIENCY METRICS\n`;
      reportContent += `------------------------\n`;
      reportContent += `LED Lighting Efficiency: ${energyEfficiency.ledEfficiency}%\n`;
      reportContent += `Renewable Energy Usage: ${energyEfficiency.renewableEnergyUse}%\n\n`;
      
      reportContent += `ALERTS LOG\n`;
      reportContent += `----------\n`;
      simulationState.alerts.forEach((alert, index) => {
        reportContent += `[${alert.level.toUpperCase()}] ${alert.timestamp.toLocaleString()}: ${alert.message}\n`;
      });
      
      // Create blob and download
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'farming-simulation-report.txt';
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("Report downloaded successfully!", {
        position: "top-center",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Failed to download report", {
        position: "top-center",
      });
    }
  };

  return {
    simulationState,
    currentData,
    simulationCompleted,
    simulationProgress,
    handlePlayPause,
    handleSpeedChange,
    handleDismissAlert,
    toggleControl,
    getActuatorStatus,
    handleDownloadReport,
    waterManagement,
    energyEfficiency
  };
};
