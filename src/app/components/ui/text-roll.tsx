/**
 * TextRoll is a component that creates a rolling/flipping text animation effect.
 * It's used for password masking animations, where characters flip between
 * their actual value and bullet points (•).
 */

"use client";

import {
    motion,
    VariantLabels,
    Target,
    TargetAndTransition,
    Transition,
} from "motion/react";

export type TextRollProps = {
    // The text to show initially or when not rolling
    initialText: string;
    // The text to show during the rolling animation
    rollingText: string;
    // Controls whether the rolling animation is active
    isRolling: boolean;
    // Optional function to customize the delay for each character's enter animation
    getEnterDelay?: (index: number) => number;
    // Optional function to customize the delay for each character's exit animation
    getExitDelay?: (index: number) => number;
    className?: string;
    // Custom transition settings for the animation
    transition?: Transition;
    // Custom animation variants for enter/exit states
    variants?: {
        enter: {
            initial: Target | VariantLabels | boolean;
            animate: TargetAndTransition | VariantLabels;
        };
        exit: {
            initial: Target | VariantLabels | boolean;
            animate: TargetAndTransition | VariantLabels;
        };
    };
    onAnimationComplete?: () => void;
    // Horizontal scroll position to sync with input field
    scrollLeft: number;
};

export function TextRoll({
    initialText,
    rollingText,
    isRolling,
    getEnterDelay = (i) => i * 0.045,
    getExitDelay = (i) => i * 0.045,
    className,
    transition = { duration: 0.45, ease: [0.645, 0.045, 0.355, 1] },
    onAnimationComplete,
    variants,
    scrollLeft = 0,
}: TextRollProps) {
    // Default 3D flip animation variants if none provided
    const defaultVariants = {
        enter: {
            initial: { rotateX: 0, opacity: 1, filter: "blur(0px)" },
            animate: { rotateX: 90, opacity: 0, filter: "blur(1px)" },
        },
        exit: {
            initial: { rotateX: 90, opacity: 0, filter: "blur(1px)" },
            animate: { rotateX: 0, opacity: 1, filter: "blur(0px)" },
        },
    } as const;

    // Ensure both texts have the same length by padding with spaces
    const maxLength = Math.max(initialText.length, rollingText.length);
    const initialLetters = initialText.padEnd(maxLength, " ").split("");
    const rollingLetters = rollingText.padEnd(maxLength, " ").split("");

    return (
        <motion.span
            style={{
                transform: `translateX(-${scrollLeft}px)`,
                transition: "transform 0s", // Instant scroll sync
                whiteSpace: "nowrap",
            }}
            className={className}
        >
            {initialLetters.map((_, i) => {
                const initialLetter = initialLetters[i];
                const rollingLetter = rollingLetters[i];

                return (
                    <span
                        key={i}
                        className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
                        aria-hidden="true"
                    >
                        {/* Top half of the flipping animation */}
                        <motion.span
                            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
                            initial={false}
                            animate={
                                isRolling
                                    ? variants?.enter?.animate ?? defaultVariants.enter.animate
                                    : variants?.enter?.initial ?? defaultVariants.enter.initial
                            }
                            transition={{
                                ...transition,
                                delay: getEnterDelay(i),
                            }}
                        >
                            {initialLetter === " " ? "\u00A0" : initialLetter}
                        </motion.span>
                        {/* Bottom half of the flipping animation */}
                        <motion.span
                            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_125%]"
                            initial={false}
                            animate={
                                isRolling
                                    ? variants?.exit?.animate ?? defaultVariants.exit.animate
                                    : variants?.exit?.initial ?? defaultVariants.exit.initial
                            }
                            transition={{
                                ...transition,
                                delay: getExitDelay(i),
                            }}
                            onAnimationComplete={
                                initialLetters.length === i + 1
                                    ? onAnimationComplete
                                    : undefined
                            }
                        >
                            {rollingLetter === " " ? "\u00A0" : rollingLetter}
                        </motion.span>
                        {/* Invisible span to maintain proper spacing */}
                        <span className="invisible">
                            {initialLetter === " " ? "\u00A0" : initialLetter}
                        </span>
                    </span>
                );
            })}
            {/* Screen reader text for accessibility */}
            <span className="sr-only">{isRolling ? rollingText : initialText}</span>
        </motion.span>
    );
}
