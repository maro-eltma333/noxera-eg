/**
 * A password input component with an animated reveal/hide functionality.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "./utils";
import { TextRoll } from "./text-roll";
import { EyeIcon } from "./eye-icon";

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    placeholder?: string;
    className?: string; // Additional classes for the container
    inputClassName?: string; // Additional classes for the input field
}

export function PasswordInput({
    value,
    onChange,
    id = "password-input",
    placeholder = "Password",
    className,
    inputClassName
}: PasswordInputProps) {
    // State for password visibility and value
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Refs for DOM elements and animation frame
    const inputRef = useRef<HTMLInputElement>(null);
    const frameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // IDs for accessibility
    const toggleButtonId = `${id}-toggle`;

    // Synchronizes scroll position between the input and the masked overlay
    const syncScroll = useCallback(() => {
        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        frameRef.current = requestAnimationFrame(() => {
            if (inputRef.current) {
                setScrollLeft(inputRef.current.scrollLeft);
            }
        });
    }, []);

    // Cleanup animation frame on component unmount
    useEffect(() => {
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    // Event handlers for input synchronization
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        syncScroll();
    };
    const handleSelect = syncScroll;
    const handleKeyUp = syncScroll;
    const handleClick = syncScroll;

    // Mouse interaction handlers for focus styling
    const handleMouseDown = useCallback(() => {
        // Add a data attribute when mouse is used for focus
        containerRef.current?.setAttribute("data-mouse-focus", "true");
    }, []);

    const handleBlur = useCallback(() => {
        // Remove the data attribute when input loses focus
        containerRef.current?.removeAttribute("data-mouse-focus");
    }, []);

    return (
        <div ref={containerRef} className={cn("w-full relative", className)}>
            {/* Actual password input field - transparent text */}
            <input
                ref={inputRef}
                value={value}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                type="password"
                id={id}
                aria-label="Password"
                placeholder={placeholder}
                aria-describedby={toggleButtonId}
                onChange={handleChange}
                onSelect={handleSelect}
                onKeyUp={handleKeyUp}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onBlur={handleBlur}
                className={cn(
                    "w-full pl-11 pr-12 py-3.5 border border-gray-200 bg-white focus:outline-none focus:border-primary transition-colors text-sm font-medium tabular-nums font-code text-transparent caret-neutral-800 focus-visible:outline-none focus:ring-1 focus:ring-primary shadow-sm",
                    inputClassName
                )}
            />
            {/* Animated text overlay */}
            <div
                aria-hidden
                className={cn(
                    "font-code tabular-nums absolute inset-0 pl-11 py-3.5 pr-12 text-sm font-medium flex items-center pointer-events-none",
                    !value && "opacity-0"
                )}
            >
                <div className="overflow-hidden w-full flex text-black">
                    <TextRoll
                        className="whitespace-nowrap w-full leading-none translate-y-[2px]"
                        initialText={value || " "}
                        rollingText={(value || " ")
                            .split("")
                            .map((_, i) => "•")
                            .join("")}
                        isRolling={!isPasswordVisible}
                        scrollLeft={scrollLeft}
                    />
                </div>
            </div>
            {/* Show/hide password toggle button */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <motion.button
                    type="button"
                    aria-label={!isPasswordVisible ? "Show password" : "Hide password"}
                    id={toggleButtonId}
                    aria-controls={id}
                    aria-pressed={isPasswordVisible}
                    className={cn(
                        "size-7 flex justify-center items-center rounded-md transition-colors duration-200 cursor-pointer focus-visible:outline-none focus:text-primary",
                        {
                            "text-gray-400": !isPasswordVisible,
                            "text-primary": isPasswordVisible,
                        }
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsPasswordVisible(!isPasswordVisible);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0 }}
                >
                    <EyeIcon open={isPasswordVisible} size={20} />
                </motion.button>
            </div>
        </div>
    );
}
