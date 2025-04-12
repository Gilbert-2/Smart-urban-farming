
import React from 'react';
import { Alert, SensorData } from '@/lib/types';
import SystemControl from '@/components/SystemControl';
import SimulationReport from '@/components/SimulationReport';
import AlertsCard from '@/components/AlertsCard';
import WaterManagementCard from '@/components/WaterManagementCard';
import EnergyEfficiencyCard from '@/components/EnergyEfficiencyCard';

interface ControlsAndReportsProps {
  currentData: SensorData;
  simulationData: SensorData[];
  alerts: Alert[];
  onDismissAlert: (index: number) => void;
  onToggleControl: (control: string) => void;
  onDownloadReport: () => void;
  controlStatus: {
    waterPump: boolean;
    growLights: boolean;
    ventilation: boolean;
    nutrientDispenser: boolean;
  };
  waterManagement?: {
    recyclingEfficiency: number;
    waterQuality: number;
    phLevel: number;
  };
  energyEfficiency?: {
    ledEfficiency: number;
    renewableEnergyUse: number;
  };
}

const ControlsAndReports: React.FC<ControlsAndReportsProps> = ({
  currentData,
  simulationData,
  alerts,
  onDismissAlert,
  onToggleControl,
  onDownloadReport,
  controlStatus,
  waterManagement = {
    recyclingEfficiency: 85,
    waterQuality: 92,
    phLevel: 6.5
  },
  energyEfficiency = {
    ledEfficiency: 90,
    renewableEnergyUse: 65
  }
}) => {
  return (
    <>
      {/* System Controls */}
      <SystemControl 
        waterPump={controlStatus.waterPump}
        growLights={controlStatus.growLights}
        ventilation={controlStatus.ventilation}
        nutrientDispenser={controlStatus.nutrientDispenser}
        onToggleWaterPump={() => onToggleControl('waterPump')}
        onToggleGrowLights={() => onToggleControl('growLights')}
        onToggleVentilation={() => onToggleControl('ventilation')}
        onToggleNutrientDispenser={() => onToggleControl('nutrientDispenser')}
      />
      
      {/* Water Management */}
      <WaterManagementCard 
        recyclingEfficiency={waterManagement.recyclingEfficiency}
        waterQuality={waterManagement.waterQuality}
        phLevel={waterManagement.phLevel}
        waterLevel={currentData.waterLevel}
      />
      
      {/* Energy Efficiency */}
      <EnergyEfficiencyCard 
        ledEfficiency={energyEfficiency.ledEfficiency}
        renewableEnergyUse={energyEfficiency.renewableEnergyUse}
        energyConsumption={currentData.consumption.energy}
      />
      
      {/* Simulation Report */}
      <SimulationReport 
        simulationData={simulationData}
        currentData={currentData}
        alerts={alerts}
        onDownload={onDownloadReport}
      />
      
      {/* Alerts */}
      <div className="lg:col-span-3">
        <AlertsCard 
          alerts={alerts}
          onDismissAlert={onDismissAlert}
        />
      </div>
    </>
  );
};

export default ControlsAndReports;
