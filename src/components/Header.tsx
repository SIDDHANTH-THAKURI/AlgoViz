import { motion } from 'framer-motion';
import { Activity, Sparkles, Code2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-gradient text-white py-20 relative">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="relative">
            <Activity size={56} className="text-white floating-animation" />
            <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-300 pulse-animation" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            AlgoViz
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed font-light">
            Interactive visualizations of computer science algorithms
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mt-2">
            Watch sorting, pathfinding, and tree algorithms come to life with beautiful animations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-6 text-sm opacity-80"
        >
          <div className="flex items-center gap-2">
            <Code2 size={16} />
            <span>Interactive Learning</span>
          </div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span>Beautiful Animations</span>
          </div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="flex items-center gap-2">
            <Activity size={16} />
            <span>Real-time Visualization</span>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 opacity-10 rounded-full blur-lg"></div>
    </header>
  );
};

export default Header;