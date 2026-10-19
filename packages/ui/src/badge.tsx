import React, { type JSX } from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "purple" | "amber" | "gray";
  style?: React.CSSProperties;
}

export function Badge({
  children,
  variant = "blue",
  style,
}: BadgeProps): JSX.Element {
  const variantStyles: Record<string, React.CSSProperties> = {
    blue: {
      backgroundColor: "rgba(0, 112, 243, 0.12)",
      color: "#0070f3",
      borderColor: "rgba(0, 112, 243, 0.3)",
    },
    green: {
      backgroundColor: "rgba(16, 185, 129, 0.12)",
      color: "#10b981",
      borderColor: "rgba(16, 185, 129, 0.3)",
    },
    purple: {
      backgroundColor: "rgba(139, 92, 246, 0.12)",
      color: "#8b5cf6",
      borderColor: "rgba(139, 92, 246, 0.3)",
    },
    amber: {
      backgroundColor: "rgba(245, 158, 11, 0.12)",
      color: "#f59e0b",
      borderColor: "rgba(245, 158, 11, 0.3)",
    },
    gray: {
      backgroundColor: "rgba(156, 163, 175, 0.12)",
      color: "#9ca3af",
      borderColor: "rgba(156, 163, 175, 0.3)",
    },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "3px 10px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 600,
        border: "1px solid",
        lineHeight: 1.2,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
