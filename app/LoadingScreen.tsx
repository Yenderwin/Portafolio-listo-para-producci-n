'use client';
import { motion, Variants } from 'framer-motion';

const text = "Jormali Cevallos";
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: i * 0.1 },
    }),
};

const charVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', damping: 12, stiffness: 200 },
    },
};

export default function LoadingScreen() {
    return (
        <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]"
        >
            <motion.div
                key="loading-text"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex overflow-hidden text-white text-2xl md:text-4xl font-black tracking-widest uppercase"
            >
                {text.split("").map((char, index) => (
                    <motion.span key={index} variants={charVariants}>
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}
