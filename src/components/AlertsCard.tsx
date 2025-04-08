
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert } from '@/lib/types';

interface AlertsCardProps {
  alerts: Alert[];
  onDismissAlert: (index: number) => void;
}

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts, onDismissAlert }) => {
  if (alerts.length === 0) {
    return (
      <Card className="border-2 border-gray-100 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-md text-gray-700 flex items-center">
            <Bell className="h-5 w-5 text-gray-600 mr-2" />
            <span>Alerts & Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[calc(100%-4rem)]">
          <p className="text-gray-500 italic">No alerts at this time</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-gray-100 hover:border-orange-300 transition-all duration-300 h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md text-gray-700 flex items-center">
            <Bell className="h-5 w-5 text-orange-600 mr-2" />
            <span>Alerts & Notifications</span>
          </CardTitle>
          <span className="bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full font-medium">
            {alerts.length} {alerts.length === 1 ? 'Alert' : 'Alerts'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-[300px] overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {alerts.map((alert, index) => (
            <div 
              key={`${alert.message}-${index}`} 
              className={cn(
                "p-3 flex items-start justify-between relative",
                alert.level === 'warning' ? "bg-amber-50" : 
                alert.level === 'error' ? "bg-red-50" : 
                "bg-blue-50"
              )}
            >
              <div className="flex">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                  alert.level === 'warning' ? "bg-amber-100" : 
                  alert.level === 'error' ? "bg-red-100" : 
                  "bg-blue-100"
                )}>
                  {alert.level === 'info' ? (
                    <Info className="h-5 w-5 text-blue-600" />
                  ) : (
                    <AlertTriangle className={cn(
                      "h-5 w-5",
                      alert.level === 'warning' ? "text-amber-600" : "text-red-600"
                    )} />
                  )}
                </div>
                <div>
                  <p className={cn(
                    "font-medium",
                    alert.level === 'warning' ? "text-amber-800" : 
                    alert.level === 'error' ? "text-red-800" : 
                    "text-blue-800"
                  )}>
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true
                    })}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => onDismissAlert(index)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
