
export interface SensorData {
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
  co2Level: number;
  waterLevel: number;
  growthLevel: string;
  actuators: {
    waterPump: boolean;
    growLights: boolean;
    ventilation: boolean;
    nutrientDispenser: boolean;
  };
  consumption: {
    energy: string;
    water: string;
  };
}

export interface Alert {
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
}

export interface SimulationState {
  isRunning: boolean;
  simulationSpeed: number;
  currentTime: Date;
  simulationData: SensorData[];
  alerts: Alert[];
}
