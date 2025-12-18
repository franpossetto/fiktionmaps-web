import { FC, ReactNode } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalSideAnimateWrapperProps {
  children: ReactNode;
  open: boolean;
  setOpen: () => void;
  className?: string;
}

export const ModalSideAnimateWrapper: FC<ModalSideAnimateWrapperProps> = ({
  open,
  setOpen,
  children,
  className = "w-screen max-w-md md:min-w-[650px]"
}) => {
  return (
    <Dialog
      as="div"
      className="relative z-50"
      onClose={setOpen}
      open={open}
    >
      <AnimatePresence>
        {open && (
          <>
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="fixed inset-0 bg-black/80"
            />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                  <Dialog.Panel
                    as={motion.div}
                    initial={{ 
                      x: "100%",
                      opacity: 0.5,
                      scale: 0.95
                    }}
                    animate={{ 
                      x: 0,
                      opacity: 1,
                      scale: 1
                    }}
                    transition={{ 
                      type: "spring",
                      damping: 30,
                      stiffness: 300,
                      mass: 0.6,
                      duration: 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className={`pointer-events-auto ${className}`}
                  >
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-900">
                      <div className="pb-1 sm:pb-6">{children}</div>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
}; 