
import React from 'react';
import { Clock, Leaf, Info, BarChart3, Download } from 'lucide-react';

interface DashboardHeaderProps {
  currentTime: Date;
  isRunning: boolean;
  simulationSpeed: number;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  isCompleted?: boolean;
  progress?: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentTime,
  isRunning,
  simulationSpeed,
  onPlayPause,
  onSpeedChange,
  isCompleted = false,
  progress = 0
}) => {
  return (
    <header className="bg-gradient-to-r from-green-700 to-green-900 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <Leaf className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Smart Urban Farming System</h1>
            <p className="text-green-100 mt-1 hidden md:block">Real-time plant growth monitoring & automation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-green-800/50 px-4 py-2 rounded-full shadow-inner">
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
              className="bg-white text-green-800 hover:bg-green-100 font-bold py-2 px-5 rounded-full transition-colors shadow-md"
            >
              {isCompleted && !isRunning ? 'Restart' : (isRunning ? 'Pause' : 'Play')}
            </button>
            
            <select
              value={simulationSpeed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="bg-white text-green-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            >
              <option value={1}>1x</option>
              <option value={5}>5x</option>
              <option value={10}>10x</option>
              <option value={50}>50x</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Progress bar for simulation with animated gradient */}
      <div className="mt-5">
        <div className="relative">
          <div className="w-full bg-green-900/70 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-green-300 to-green-100 h-3 rounded-full transition-all duration-300 relative overflow-hidden" 
              style={{ width: `${progress}%` }}
            >
              {/* Shimmering effect */}
              <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                   style={{ 
                     backgroundSize: "200% 100%", 
                     animation: "shimmer 2s infinite" 
                   }}
              ></div>
            </div>
          </div>
          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
        <div className="flex justify-between text-xs mt-1 text-green-100">
          <span>0%</span>
          <div className="flex items-center">
            <BarChart3 className="h-3 w-3 mr-1" />
            <span>{isCompleted ? "Completed" : `${Math.round(progress)}% Complete`}</span>
          </div>
          <span>100%</span>
        </div>
      </div>
      
      {isCompleted && (
        <div className="mt-3 bg-green-100 text-green-800 px-4 py-2 rounded-full text-center text-sm font-medium flex items-center justify-center shadow-inner">
          <Info className="h-4 w-4 mr-2" />
          Simulation completed! Press 'Restart' to run again or download the report.
          <Download className="h-4 w-4 ml-2" />
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
