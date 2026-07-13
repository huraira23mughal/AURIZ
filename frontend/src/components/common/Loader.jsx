import { motion } from "framer-motion";

function Loader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 bg-[#05060A] flex items-center justify-center z-[9999]"
        >
            <div className="flex flex-col items-center">

                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                    }}
                    className="w-24 h-24 border-4 border-yellow-400 border-t-transparent rounded-full"
                />

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                    }}
                    className="mt-8 text-4xl font-black tracking-widest text-yellow-400"
                >
                    AURIZ
                </motion.h1>

                <p className="text-gray-400 mt-4">
                    Loading Premium Experience...
                </p>

            </div>
        </motion.div>
    );
}

export default Loader;