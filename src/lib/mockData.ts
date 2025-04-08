
import { SensorData, Alert } from './types';

// Simulate data for 24 hours with 5-minute intervals
export const generateMockData = (): SensorData[] => {
  const data: SensorData[] = [];
  const startTime = new Date('2025-04-06T08:00:00');
  
  // Generate 288 data points (24 hours with 5-minute intervals)
  for (let i = 0; i < 288; i++) {
    const timestamp = new Date(startTime.getTime() + i * 5 * 60 * 1000);
    const hour = timestamp.getHours();
    
    // Base values with diurnal patterns
    const baseTemp = 18 + (Math.sin((hour - 6) * Math.PI / 12) * 6);
    const temperature = baseTemp + (Math.random() * 2 - 1);
    
    const humidity = 75 - ((temperature - 18) * 2) + (Math.random() * 10 - 5);
    
    let lightIntensity = 0;
    if (hour >= 6 && hour <= 20) {
      lightIntensity = Math.sin((hour - 6) * Math.PI / 14) * 15000;
      lightIntensity = Math.max(0, lightIntensity + (Math.random() * 500 - 250));
    } else {
      lightIntensity = Math.random() * 100; // Minimal light at night
    }
    
    // Generate simulated soil moisture that decreases and then jumps when watering
    const baseIndex = i % 24; // Pattern repeats every 24 readings
    let soilMoisture = 80 - (baseIndex * 0.8); // Gradually decreases
    if (baseIndex === 23) soilMoisture = 80; // Reset when watered
    
    // Growth increases gradually over the day - now goes all the way to 100%
    const growthPercent = Math.min(100, ((i / 288) * 100)).toFixed(2);
    
    // Actuator states
    const needsWater = soilMoisture < 65;
    const needsLight = hour >= 6 && hour <= 20 && lightIntensity < 5000;
    const needsVentilation = temperature > 24 || humidity > 70;
    const needsNutrients = hour === 8 || hour === 16;
    
    const waterLevel = 90 - (i / 288) * 70; // Decreases more significantly throughout the day
    
    // Energy consumption increases throughout the day
    const energyConsumption = ((i / 288) * 1000).toFixed(2);
    
    // Water consumption increases with each watering
    const waterConsumption = (Math.floor(i / 24) * 2).toFixed(2);
    
    const dataPoint: SensorData = {
      timestamp: timestamp.toISOString(),
      temperature: parseFloat(temperature.toFixed(2)),
      humidity: parseFloat(humidity.toFixed(2)),
      soilMoisture: parseFloat(soilMoisture.toFixed(2)),
      lightIntensity: parseFloat(lightIntensity.toFixed(2)),
      co2Level: 450 + (Math.random() * 50 - 25),
      waterLevel: parseFloat(waterLevel.toFixed(2)),
      growthLevel: growthPercent,
      actuators: {
        waterPump: needsWater,
        growLights: needsLight,
        ventilation: needsVentilation,
        nutrientDispenser: needsNutrients
      },
      consumption: {
        energy: energyConsumption,
        water: waterConsumption
      }
    };
    
    data.push(dataPoint);
  }
  
  return data;
};

export const generateMockAlerts = (): Alert[] => {
  return [
    {
      level: 'warning',
      message: 'Water level low. Refill water tank soon.',
      timestamp: new Date('2025-04-06T14:23:00')
    },
    {
      level: 'info',
      message: 'Plants ready for harvest!',
      timestamp: new Date('2025-04-07T06:15:00')
    },
    {
      level: 'warning',
      message: 'Temperature above optimal range',
      timestamp: new Date('2025-04-06T12:45:00')
    }
  ];
};

// Initial mock data for the simulation
export const mockData = generateMockData();
export const mockAlerts = generateMockAlerts();
