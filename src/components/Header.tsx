import { motion } from 'framer-motion';
import { Activity, Sparkles, Code2, Play, Zap } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-gradient text-white pt-20 pb-16 md:pt-28 md:pb-24 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-pink-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 text-center">
        {/* Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Activity size={32} className="text-white floating-animation" />
              </div>
              <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 pulse-animation" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                AlgoViz
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Description Section with Better Contrast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-10"
        >
          {/* Main description with dark background for contrast */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 max-w-4xl mx-auto mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
              Interactive Visualizations of Computer Science Algorithms
            </h2>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Watch sorting, pathfinding, searching, and tree algorithms come to life with beautiful animations
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
            >
              <Code2 size={16} className="text-blue-200" />
              <span className="text-white font-medium text-sm">Interactive Learning</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
            >
              <Sparkles size={16} className="text-yellow-200" />
              <span className="text-white font-medium text-sm">Beautiful Animations</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
            >
              <Play size={16} className="text-green-200" />
              <span className="text-white font-medium text-sm">Real-time Visualization</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
            >
              <Zap size={16} className="text-purple-200" />
              <span className="text-white font-medium text-sm">15+ Algorithms</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-blue-100 text-sm md:text-base">
            Choose an algorithm below and start visualizing! 👇
          </p>
        </motion.div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </header>
  );
};

export default Header;