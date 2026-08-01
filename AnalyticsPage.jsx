import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeatherContext } from '../context/WeatherContext';
import PageWrapper from '../components/layout/PageWrapper';
import GlassCard from '../components/common/GlassCard';
import Skeleton from '../components/common/Skeleton';
import WeatherChart from '../components/charts/WeatherChart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AnalyticsPage() {
  const { forecastData, loading } = useWeatherContext();
  const [range, setRange] = useState('24h');

  if (loading || !forecastData) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  const { hourly, daily } = forecastData;
  const data = range === '24h' ? hourly.slice(0, 24) : daily;
  const xKey = range === '24h' ? 'time' : 'date';

  return (
    <PageWrapper>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Weather Analytics</h1>
          
          <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-xl inline-flex">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${range === '24h' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'text-slate-500'}`}
              onClick={() => setRange('24h')}
            >
              24 Hours
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${range === '7d' ? 'bg-white dark:bg-slate-600 shadow-sm' : 'text-slate-500'}`}
              onClick={() => setRange('7d')}
            >
              7 Days
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <GlassCard className="p-4 h-[300px] flex flex-col">
              <h3 className="font-semibold mb-2">Temperature {range === '24h' ? '' : '(High/Low)'}</h3>
              <div className="flex-1 min-h-0">
                <WeatherChart 
                  data={data} 
                  type={range === '24h' ? 'area' : 'line'} 
                  dataKeys={range === '24h' ? [{key: 'temp', color: '#f97316'}] : [{key: 'temp_max', color: '#ef4444'}, {key: 'temp_min', color: '#3b82f6'}]} 
                  xKey={xKey} 
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-4 h-[300px] flex flex-col">
              <h3 className="font-semibold mb-2">Precipitation Probability</h3>
              <div className="flex-1 min-h-0">
                <WeatherChart 
                  data={data} 
                  type="bar" 
                  dataKeys={[{key: 'precip_prob', color: '#3b82f6'}]} 
                  xKey={xKey} 
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-4 h-[300px] flex flex-col">
              <h3 className="font-semibold mb-2">Wind Speed</h3>
              <div className="flex-1 min-h-0">
                <WeatherChart 
                  data={data} 
                  type="line" 
                  dataKeys={[{key: 'wind_speed', color: '#14b8a6'}]} 
                  xKey={xKey} 
                />
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <GlassCard className="p-4 h-[300px] flex flex-col">
              <h3 className="font-semibold mb-2">Humidity</h3>
              <div className="flex-1 min-h-0">
                <WeatherChart 
                  data={data} 
                  type="area" 
                  dataKeys={[{key: 'humidity', color: '#06b6d4'}]} 
                  xKey={xKey} 
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
