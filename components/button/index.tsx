"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

const variantStyle: Record<
    "primary" | "secondary",
    Pick<CSSProperties, "backgroundImage" | "backgroundClip" | "backgroundOrigin" | "border">
> = {
    primary: {
        border: "3px solid transparent",
        backgroundImage:
            "linear-gradient(to right, #00283D, #006EA8), linear-gradient(to top, #00283D, #006EA8)",
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "border-box",
    },
    secondary: {
        border: "3px solid transparent",
        backgroundImage:
            "linear-gradient(to right, #862113, #E94424), linear-gradient(to top, #CC2F17, #B32711)",
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "border-box",
    },
};

export const Button = ({
    children,
    onClick,
    variant = "primary",
    className = "",
}: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary";
    className?: string;
}) => {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            style={variantStyle[variant]}
            className={clsx(
                "px-4 py-2 rounded-[12px] text-white cursor-pointer font-bold text-[16px] tracking-wide font-mono",
                className,
            )}
            whileHover={{
                scale: 1.03,
                y: -2,
                filter: "brightness(1.08)",
                transition: { type: "spring", stiffness: 500, damping: 22 },
            }}
            whileTap={{ scale: 0.97, y: 0 }}
        >
            {children}
        </motion.button>
    );
};
