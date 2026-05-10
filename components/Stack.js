"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Stack({
    cards = [],
    randomRotation = false,
    sensitivity = 200,
    sendToBackOnClick = true,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
}) {
    const [items, setItems] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Initialize with unique IDs
        setItems(cards.map((card, index) => ({ id: index, content: card })));
    }, [cards]);

    useEffect(() => {
        if (!autoplay || (pauseOnHover && isHovered)) return;

        const interval = setInterval(() => {
            moveFirstToLast();
        }, autoplayDelay);

        return () => clearInterval(interval);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, items]);

    const moveFirstToLast = () => {
        setItems((currentItems) => {
            if (currentItems.length <= 1) return currentItems;
            const newItems = [...currentItems];
            const first = newItems.shift();
            // Generate specific new ID so React treats it as a new element entering = clean exit/enter animation
            newItems.push({ ...first, id: Date.now() + Math.random() });
            return newItems;
        });
    };

    const handleCardClick = () => {
        if (sendToBackOnClick) {
            moveFirstToLast();
        }
    };

    return (
        <div
            className="relative w-full h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence>
                    {items.map((item, index) => {
                        // Only render top few cards for performance and visual clarity
                        if (index > 2) return null;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{
                                    scale: 1 - items.length * 0.05, // Start small if entering from back
                                    y: items.length * 10,
                                    opacity: 0
                                }}
                                animate={{
                                    scale: 1 - index * 0.05,
                                    y: index * 10,
                                    z: -index,
                                    zIndex: items.length - index,
                                    rotate: randomRotation && index === 0 ? (Math.random() - 0.5) * 10 : 0,
                                    opacity: 1
                                }}
                                exit={{
                                    scale: 0.9,
                                    opacity: 0,
                                    y: 100,
                                    x: (Math.random() - 0.5) * 100, // Flick direction
                                    transition: { duration: 0.4, ease: "easeInOut" }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 20,
                                    mass: 1
                                }}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transformOrigin: "center center",
                                    cursor: sendToBackOnClick ? "pointer" : "default",
                                }}
                                onClick={index === 0 ? handleCardClick : undefined}
                                drag={index === 0 ? "x" : false}
                                dragSnapToOrigin={true}
                                onDragEnd={(e, { offset }) => {
                                    if (Math.abs(offset.x) > sensitivity) {
                                        moveFirstToLast();
                                    }
                                }}
                            >
                                {item.content}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
