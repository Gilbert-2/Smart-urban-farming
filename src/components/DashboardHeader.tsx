
import React from 'react';
import { Clock, Leaf } from 'lucide-react';

interface DashboardHeaderProps {
  currentTime: Date;
  isRunning: boolean;
  simulationSpeed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentTime,
  isRunning,
  simulationSpeed,
  onPlayPause,
  onSpeedChange
}) => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white p-4 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Leaf className="h-8 w-8 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold">Smart Urban Farming System</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-green-800/50 px-4 py-2 rounded-full">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-mono text-lg">
              {currentTime.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onPlayPause}
              className="bg-white text-green-800 hover:bg-green-100 font-bold py-2 px-4 rounded-full transition-colors"
            >
              {isRunning ? 'Pause' : 'Play'}
            </button>
            
            <select
              value={simulationSpeed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="bg-white text-green-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={1}>1x</option>
              <option value={5}>5x</option>
              <option value={10}>10x</option>
              <option value={50}>50x</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
