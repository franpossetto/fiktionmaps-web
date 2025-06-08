import { ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalCenterAnimateWrapperProps {
  children: ReactNode;
  open: boolean;
  setOpen: () => void;
  className?: string;
}

export const ModalCenterAnimateWrapper: React.FC<ModalCenterAnimateWrapperProps> = ({
  open,
  setOpen,
  children,
  className = "mx-auto max-w-xl"
}) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={setOpen}
          open={open}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-500 bg-opacity-25"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.2
              }}
            >
              <Dialog.Panel className={`transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 dark:bg-gray-900 dark:divide-gray-700 ${className}`}>
                {children}
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
