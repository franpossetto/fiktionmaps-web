import { motion } from "framer-motion"

export const RedMarker = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            className="custom-marker"
        >

            <div className="marker-content">
                <span className="marker-text"></span>
            </div>
        </motion.div>
    )
}
