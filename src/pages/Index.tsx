
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/DashboardHeader';
import SensorGrid from '@/components/SensorGrid';
import ControlsAndReports from '@/components/ControlsAndReports';
import { useSimulation } from '@/hooks/useSimulation';
import { toast } from "sonner";

interface UserData {
  name: string;
  location?: string;
  cropType?: string;
  farmLayout?: string;
  experienceLevel?: string;
  goal?: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  
  const {
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
  } = useSimulation();

  useEffect(() => {
    // Check if user has completed the form
    const storedUserData = localStorage.getItem("farmingSimulationUser");
    
    if (!storedUserData) {
      // Redirect to welcome page if form not completed
      navigate("/");
      return;
    }
    
    // Parse user data and set state
    const parsedUserData = JSON.parse(storedUserData);
    setUserData(parsedUserData);
    
    // Show welcome toast
    toast.success(`Welcome to your farm, ${parsedUserData.name}!`, {
      position: "top-center",
      duration: 4000,
    });
    
    // Apply any user preferences from the form
    if (parsedUserData.goal) {
      const goals: Record<string, string> = {
        maximumYield: "Maximum Yield",
        minimumWater: "Minimum Water Usage",
        energyEfficiency: "Energy Efficiency",
        qualityProduce: "Quality Produce",
        educationalDemo: "Educational/Demonstration"
      };
      
      // Show goal-specific toast
      setTimeout(() => {
        toast.info(`Your goal is set to: ${goals[parsedUserData.goal]}`, {
          position: "top-center",
          duration: 3000,
        });
      }, 1000);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {userData && (
          <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  {userData.name}'s Urban Farm
                </h2>
                <p className="text-sm text-gray-500">
                  {userData.location && `Location: ${userData.location} • `}
                  {userData.cropType && getCropDisplayName(userData.cropType)}
                  {userData.goal && ` • Goal: ${getGoalDisplayName(userData.goal)}`}
                </p>
              </div>
              <button 
                onClick={() => navigate("/?reset=true")}
                className="text-sm text-gray-500 hover:text-gray-700 mt-2 md:mt-0"
              >
                Edit Farm Settings
              </button>
            </div>
          </div>
        )}
        
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
          {/* Sensor Grid Components */}
          <SensorGrid 
            currentData={currentData} 
            currentTime={simulationState.currentTime} 
          />
          
          {/* System Controls & Reports */}
          <ControlsAndReports
            currentData={currentData}
            simulationData={simulationState.simulationData}
            alerts={simulationState.alerts}
            onDismissAlert={handleDismissAlert}
            onToggleControl={toggleControl}
            onDownloadReport={handleDownloadReport}
            controlStatus={{
              waterPump: getActuatorStatus('waterPump'),
              growLights: getActuatorStatus('growLights'),
              ventilation: getActuatorStatus('ventilation'),
              nutrientDispenser: getActuatorStatus('nutrientDispenser')
            }}
            waterManagement={waterManagement}
            energyEfficiency={energyEfficiency}
          />
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Smart Urban Farming System • Simulation Dashboard • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

// Helper functions to convert stored values to display names
function getCropDisplayName(cropCode: string): string {
  const cropMap: Record<string, string> = {
    leafyGreens: "Growing Leafy Greens",
    herbs: "Growing Herbs",
    tomatoes: "Growing Tomatoes",
    peppers: "Growing Peppers",
    strawberries: "Growing Strawberries",
    mixedVegetables: "Growing Mixed Vegetables",
  };
  
  return cropMap[cropCode] || cropCode;
}

function getGoalDisplayName(goalCode: string): string {
  const goalMap: Record<string, string> = {
    maximumYield: "Maximum Yield",
    minimumWater: "Minimum Water Usage",
    energyEfficiency: "Energy Efficiency",
    qualityProduce: "Quality Produce",
    educationalDemo: "Educational/Demonstration",
  };
  
  return goalMap[goalCode] || goalCode;
}

export default Index;
