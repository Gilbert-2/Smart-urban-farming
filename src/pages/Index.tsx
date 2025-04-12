
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import SensorGrid from '@/components/SensorGrid';
import ControlsAndReports from '@/components/ControlsAndReports';
import { useSimulation } from '@/hooks/useSimulation';

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
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

export default Index;
