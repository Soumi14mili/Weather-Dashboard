import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Thermometer, Sun, Wind, Umbrella, ChevronDown, ChevronUp, Droplets, Shield } from 'lucide-react';
import { useWeatherContext } from '../context/WeatherContext';
import { generateHealthAdvice } from '../utils/healthAdvisor';
import PageWrapper from '../components/layout/PageWrapper';
import GlassCard from '../components/common/GlassCard';
import Skeleton from '../components/common/Skeleton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const AdviceCard = ({ advice }) => {
  const [expanded, setExpanded] = React.useState(false);

  const icons = {
    thermometer: <Thermometer size={24} className="text-orange-500" />,
    wind: <Wind size={24} className="text-teal-500" />,
    sun: <Sun size={24} className="text-yellow-500" />,
    umbrella: <Umbrella size={24} className="text-blue-500" />,
    droplet: <Droplets size={24} className="text-blue-400" />,
    activity: <Activity size={24} className="text-green-500" />,
    shield: <Shield size={24} className="text-purple-500" />
  };

  const getSeverityColor = (sev) => {
    switch(sev) {
      case 'danger': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400';
      case 'warning': return 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400';
      default: return 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400';
    }
  };

  return (
    <GlassCard className="p-5 flex flex-col gap-3 cursor-pointer hover:bg-white/40 dark:hover:bg-slate-800/60 transition-colors" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {icons[advice.icon] || <Activity size={24} />}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{advice.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSeverityColor(advice.severity)}`}>
              {advice.severity.toUpperCase()}
            </span>
          </div>
        </div>
        {expanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 text-sm">{advice.description}</p>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2 pl-2 border-l-2 border-slate-200 dark:border-slate-700">
              {advice.tips.map((tip, i) => (
                <li key={i} className="text-sm text-slate-500 dark:text-slate-400 flex items-start before:content-['•'] before:mr-2 before:text-blue-500">
                  {tip}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export default function HealthAdvisorPage() {
  const { weatherData, airQualityData, loading } = useWeatherContext();

  if (loading || !weatherData) {
    return (
      <PageWrapper>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Calculate simple health score
  const score = Math.max(10, 100 - (weatherData.current.uv * 2) - ((airQualityData?.aqi || 50) / 4));
  const advices = generateHealthAdvice(weatherData, airQualityData);

  return (
    <PageWrapper>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Your Personal Health Advisor</h1>
          <p className="text-slate-500 mt-2">Smart insights based on current weather conditions</p>
        </div>

        {/* Score Card */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-200 dark:text-slate-700" />
                <circle 
                  cx="64" cy="64" r="56" 
                  fill="transparent" 
                  stroke={score > 70 ? '#10b981' : score > 40 ? '#f59e0b' : '#ef4444'} 
                  strokeWidth="12" 
                  strokeDasharray={`${(score / 100) * 352} 352`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{Math.round(score)}</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Health Score</h2>
              <p className="text-slate-600 dark:text-slate-300">
                {score > 70 ? 'Great day for outdoor activities!' : score > 40 ? 'Take standard precautions today.' : 'Stay indoors if possible, conditions are harsh.'}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Recommendations Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-4">Targeted Advice</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advices.map((advice, i) => (
              <AdviceCard key={i} advice={advice} />
            ))}
          </div>
        </motion.div>

      </motion.div>
    </PageWrapper>
  );
}
