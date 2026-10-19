"use client";

import React, { ReactNode } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  style,
  ...props
}: ButtonProps) => {
  const baseStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: 500,
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    border: "1px solid transparent",
    fontFamily: "inherit",
    textDecoration: "none",
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "6px 12px", fontSize: "13px", height: "32px" },
    md: { padding: "8px 16px", fontSize: "14px", height: "40px" },
    lg: { padding: "12px 24px", fontSize: "16px", height: "48px" },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#0070f3",
      color: "#ffffff",
      borderColor: "#0070f3",
      boxShadow: "0 2px 4px rgba(0, 112, 243, 0.2)",
    },
    secondary: {
      backgroundColor: "#1f2937",
      color: "#f9fafb",
      borderColor: "#374151",
    },
    outline: {
      backgroundColor: "transparent",
      color: "inherit",
      borderColor: "rgba(128, 128, 128, 0.3)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "inherit",
      borderColor: "transparent",
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
