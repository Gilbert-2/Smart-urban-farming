
import React from 'react';
import { Alert, SensorData } from '@/lib/types';
import SystemControl from '@/components/SystemControl';
import SimulationReport from '@/components/SimulationReport';
import AlertsCard from '@/components/AlertsCard';

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
}

const ControlsAndReports: React.FC<ControlsAndReportsProps> = ({
  currentData,
  simulationData,
  alerts,
  onDismissAlert,
  onToggleControl,
  onDownloadReport,
  controlStatus
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
