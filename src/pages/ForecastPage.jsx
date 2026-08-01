import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, ArrowDown, ArrowUp } from 'lucide-react';
import { useWeatherContext } from '../context/WeatherContext';
import PageWrapper from '../components/layout/PageWrapper';
import GlassCard from '../components/common/GlassCard';
import Skeleton from '../components/common/Skeleton';
import WeatherIcon from '../components/common/WeatherIcon';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatTime, formatDate } from '../utils/formatters';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ForecastPage() {
  const { forecastData, loading } = useWeatherContext();

  if (loading || !forecastData) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </PageWrapper>
    );
  }

  const { hourly, daily } = forecastData;

  return (
    <PageWrapper>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
        </div>

        {/* Hourly Forecast */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Next 24 Hours</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
            {hourly.slice(0, 24).map((hour, i) => (
              <GlassCard key={i} className="min-w-[100px] flex flex-col items-center p-4 snap-center shrink-0">
                <span className="text-sm font-medium mb-2">{formatTime(hour.time)}</span>
                <WeatherIcon code={hour.weather_code} size={32} isDay={hour.is_day} className="mb-2" />
                <span className="text-lg font-bold mb-1">{Math.round(hour.temp)}°</span>
                <div className="flex items-center text-xs text-blue-500">
                  <Droplets size={12} className="mr-1" />
                  {hour.precip_prob}%
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
          <div className="space-y-3">
            {daily.map((day, i) => (
              <GlassCard key={i} className="flex items-center justify-between p-4">
                <div className="w-24 font-medium">
                  {i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : formatDate(day.date, { weekday: 'short' })}
                </div>
                <div className="flex items-center justify-center flex-1 gap-2">
                  <WeatherIcon code={day.weather_code} size={28} />
                  <span className="hidden sm:inline text-sm text-slate-500 capitalize">{day.condition}</span>
                </div>
                <div className="flex items-center gap-4 w-32 justify-end">
                  <div className="flex flex-col items-end text-sm">
                    <span className="flex items-center text-red-400 font-medium"><ArrowUp size={14}/>{Math.round(day.temp_max)}°</span>
                    <span className="flex items-center text-blue-400 font-medium"><ArrowDown size={14}/>{Math.round(day.temp_min)}°</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Temperature Trend */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Temperature Trend</h2>
          <GlassCard className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourly.slice(0, 24)}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tickFormatter={(t) => formatTime(t)} stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  labelFormatter={(t) => formatTime(t)}
                  contentStyle={{ borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.8)' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
