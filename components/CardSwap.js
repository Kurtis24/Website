"use client";

import { useState, useEffect, Children, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Card = ({ children, className = "" }) => {
    return <div className={`w-full h-full ${className}`}>{children}</div>;
};

export default function CardSwap({
    children,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    className = "",
}) {
    const [items, setItems] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    // Initialize items from children
    useEffect(() => {
        setItems(Children.toArray(children));
    }, [children]);

    useEffect(() => {
        if (pauseOnHover && isHovered) return;
        if (items.length <= 1) return;

        const interval = setInterval(() => {
            setItems((currentItems) => {
                const newItems = [...currentItems];
                const firstItem = newItems.shift();
                newItems.push(firstItem);
                return newItems;
            });
        }, delay);

        return () => clearInterval(interval);
    }, [items.length, delay, pauseOnHover, isHovered]);

    // Calculate scales and positions for the stacked effect
    // We only show the first few items to keep DOM light and effect clean
    const visibleItems = items.slice(0, 3);
    // If we have fewer than 3 items, we still render them all.
    // Actually, to make the swap look correct, we need to handle the array rotation carefully.

    return (
        <div
            className={`relative w-full h-full perspective-1000 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => {
                        // We only render the first 3 items for the stack effect + the one leaving?
                        // Actually, simplest logic for a swap stack:
                        // Render all in reverse order so first is on top?
                        // Or render only top X.

                        // Let's render visual 3.
                        if (index > 2 && index !== items.length - 1) return null; // Optimization: only render top 3 and potentially the one moving to back?

                        // Actually, let's just render the top 3 items based on current order.
                        const isTop = index === 0;
                        const isSecond = index === 1;
                        const isThird = index === 2;

                        // We need consistent keys for AnimatePresence to work.
                        // Children.toArray attaches keys which might shuffle.
                        // Let's rely on the item's key if present, or generate one.
                        // But items array is being rotated. The element itself is stable.

                        if (index > 2) return null;

                        return (
                            <motion.div
                                key={item.key || index}
                                layout
                                initial={false}
                                animate={{
                                    scale: 1 - index * 0.05, // 1, 0.95, 0.9
                                    y: index * 15,          // 0, 15, 30 (stacking down/up?)
                                    // "verticalDistance" prop was requested. Let's try to map it.
                                    // Usually cardDistance is Z or scale diff, vertical is Y.
                                    y: index * (verticalDistance / 4),
                                    z: -index * cardDistance,
                                    opacity: 1 - index * 0.1,
                                    zIndex: items.length - index,
                                }}
                                exit={{
                                    scale: 0.8,
                                    opacity: 0,
                                    z: -100,
                                    transition: { duration: 0.5 }
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute w-full h-full"
                                style={{
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                {item}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
