import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, 
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { formatTime } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/30 dark:border-gray-600/30 rounded-xl p-3 shadow-lg">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {typeof entry.value === 'number' ? Math.round(entry.value * 10) / 10 : entry.value}
        </p>
      ))}
    </div>
  );
};

const WeatherChart = ({ 
  data, 
  dataKeys = [{ key: 'value', color: '#3B82F6' }],
  dataKey,
  title, 
  color = '#3B82F6', 
  unit = '', 
  type = 'area',
  xKey = 'time'
}) => {
  // Support legacy single dataKey prop
  const keys = dataKey ? [{ key: dataKey, color }] : dataKeys;

  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: -20, bottom: 0 }
  };

  const renderXAxis = () => (
    <XAxis 
      dataKey={xKey} 
      axisLine={false} 
      tickLine={false} 
      tick={{ fontSize: 11, fill: '#9CA3AF' }}
      tickFormatter={(val) => {
        if (xKey === 'time') {
          try { return formatTime(val); } catch { return val; }
        }
        if (xKey === 'date') {
          try {
            return new Date(val).toLocaleDateString('en-US', { weekday: 'short' });
          } catch { return val; }
        }
        return val;
      }}
    />
  );

  const renderYAxis = () => (
    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
  );

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.2)" />
            {renderXAxis()}
            {renderYAxis()}
            <Tooltip content={<CustomTooltip />} />
            {keys.map((k) => (
              <Line key={k.key} type="monotone" dataKey={k.key} stroke={k.color} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: k.color }} />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.2)" />
            {renderXAxis()}
            {renderYAxis()}
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156,163,175,0.1)' }} />
            {keys.map((k) => (
              <Bar key={k.key} dataKey={k.key} fill={k.color} radius={[4,4,0,0]} />
            ))}
          </BarChart>
        );
      case 'area':
      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              {keys.map((k) => (
                <linearGradient key={`grad-${k.key}`} id={`gradient-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={k.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={k.color} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156,163,175,0.2)" />
            {renderXAxis()}
            {renderYAxis()}
            <Tooltip content={<CustomTooltip />} />
            {keys.map((k) => (
              <Area key={k.key} type="monotone" dataKey={k.key} stroke={k.color} strokeWidth={2.5} fillOpacity={1} fill={`url(#gradient-${k.key})`} />
            ))}
          </AreaChart>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {title && <h3 className="text-gray-700 dark:text-gray-200 font-semibold mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
