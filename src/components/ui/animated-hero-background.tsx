"use client";
import { motion } from "framer-motion";

// FloatingPaths component (adapted from your provided background-paths.tsx)
function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 30 }, (_, i) => ({ // Reduced length for potentially better performance/subtlety
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${ // Corrected C to C
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        // Adjusted color for DAIV.PRO theme (dark purple background)
        // Using shades of white/light purple for the paths
        color: `rgba(255, 255, 255, ${0.01 + i * 0.008})`, // More subtle white paths
        width: 0.4 + i * 0.02, // Slightly thinner paths
    }));

    return (
        <svg
            className="w-full h-full"
            viewBox="0 0 696 875" // Adjusted viewBox to better fit the path data range, especially y-axis
            fill="none"
            preserveAspectRatio="xMidYMid slice" // Ensures SVG scales and covers
        >
            <title>Animated Background Paths</title>
            {paths.map((path) => (
                <motion.path
                    key={path.id}
                    d={path.d}
                    stroke={path.color} // Use the calculated color
                    strokeWidth={path.width}
                    initial={{ pathLength: 0.4, opacity: 0.4 }} // Softer initial state
                    animate={{
                        pathLength: 1,
                        opacity: [0.25, 0.5, 0.35], // Softer animation opacity flicker
                        pathOffset: [0, 1, 0],
                    }}
                    transition={{
                        duration: 40 + Math.random() * 25, // Slightly longer, more varied duration
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    }}
                />
            ))}
        </svg>
    );
}

export function AnimatedHeroBackground() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden -z-10"> {/* Changed absolute to fixed */}
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
        </div>
    );
} 