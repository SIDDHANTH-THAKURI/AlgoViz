import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Activity size={48} className="text-white" />
          <h1 className="text-5xl font-bold">AlgoViz</h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl opacity-90 max-w-2xl mx-auto"
        >
          Interactive visualizations of computer science algorithms. 
          Watch how sorting, pathfinding, and tree algorithms work step by step.
        </motion.p>
      </div>
    </header>
  );
};

export default Header;