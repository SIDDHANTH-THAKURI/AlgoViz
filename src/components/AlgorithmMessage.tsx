import { motion } from 'framer-motion';
import { MessageCircle, Activity, Pause, Zap } from 'lucide-react';
import type { VisualizationState } from '../types';

interface AlgorithmMessageProps {
  visualizationState: VisualizationState;
}

const AlgorithmMessage = ({ visualizationState }: AlgorithmMessageProps) => {
  const { steps, currentStep, isPlaying, isPaused } = visualizationState;
  
  const currentMessage = steps.length > 0 && steps[currentStep]?.message 
    ? steps[currentStep].message 
    : 'Ready to start visualization';

  const getStatusInfo = () => {
    if (isPlaying) return { 
      icon: <Activity size={24} />, 
      label: 'Running', 
      gradient: 'from-green-500 to-emerald-600',
      textColor: 'text-green-400',
      bgColor: 'bg-green-500/20'
    };
    if (isPaused) return { 
      icon: <Pause size={24} />, 
      label: 'Paused', 
      gradient: 'from-orange-500 to-yellow-500',
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    };
    return { 
      icon: <Zap size={24} />, 
      label: 'Ready', 
      gradient: 'from-blue-500 to-purple-600',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    };
  };

  const status = getStatusInfo();

  return (
    <section className="py-16 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle size={28} className="text-purple-400" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
              Algorithm Status
            </h2>
          </div>
          <p className="text-lg text-gray-300">
            Real-time feedback and progress tracking
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            {/* Status Badge */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${status.gradient} mb-6 shadow-lg`}
            >
              {status.icon}
              <span className="font-bold text-white text-lg">{status.label}</span>
            </motion.div>
            
            {/* Message Display */}
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className={`${status.bgColor} rounded-xl p-6 border border-white/10`}>
                <p className="text-white text-lg leading-relaxed font-medium">
                  {currentMessage}
                </p>
              </div>
            </motion.div>
            
            {/* Progress Section */}
            {steps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                {/* Progress Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-card p-4">
                    <div className={`text-2xl font-bold ${status.textColor} mb-1`}>
                      {currentStep + 1}
                    </div>
                    <div className="text-sm text-gray-300">Current Step</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-white mb-1">
                      {steps.length}
                    </div>
                    <div className="text-sm text-gray-300">Total Steps</div>
                  </div>
                  <div className="glass-card p-4">
                    <div className={`text-2xl font-bold ${status.textColor} mb-1`}>
                      {Math.round(((currentStep + 1) / steps.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-300">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="glass-card p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-white">Algorithm Progress</span>
                    <span className="text-sm text-gray-300">
                      {currentStep + 1} / {steps.length}
                    </span>
                  </div>
                  <div className="progress-track">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="progress-fill"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* No Steps Message */}
            {steps.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-6 border border-dashed border-white/20"
              >
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Begin</h3>
                <p className="text-gray-300">
                  Select an algorithm and click "Start Visualization" to see the magic happen!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlgorithmMessage;