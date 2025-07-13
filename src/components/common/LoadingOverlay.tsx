import { motion } from 'framer-motion';

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export const LoadingOverlay = ({ 
  message = "LOADING...", 
  className = "" 
}: LoadingOverlayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`fixed inset-0 bg-black/20 flex items-center justify-center z-50 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {message}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}; 