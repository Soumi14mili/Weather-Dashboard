import React from 'react';
import WeatherIcon from '../common/WeatherIcon';

const ChartTooltip = ({ active, payload, label, unit = '' }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/60 border border-white/40 dark:border-gray-600/50 rounded-xl p-3 shadow-xl">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <div className="flex items-center space-x-2">
          {data.weatherCode !== undefined && (
            <WeatherIcon code={data.weatherCode} size={20} isDay={data.isDay !== 0} />
          )}
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            {payload[0].value}{unit}
          </p>
        </div>
        {data.condition && (
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 capitalize">
            {data.condition}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
