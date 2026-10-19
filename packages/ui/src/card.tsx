import React, { type JSX } from "react";

export interface CardProps {
  className?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  badge?: string;
  style?: React.CSSProperties;
}

export function Card({
  className,
  title,
  description,
  children,
  footer,
  badge,
  style,
}: CardProps): JSX.Element {
  return (
    <div
      className={className}
      style={{
        borderRadius: "12px",
        border: "1px solid rgba(128, 128, 128, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>{title}</h3>
        {badge && (
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "999px",
              backgroundColor: "rgba(0, 112, 243, 0.15)",
              color: "#0070f3",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.7, lineHeight: 1.5 }}>
          {description}
        </p>
      )}

      {children && <div style={{ marginTop: "4px" }}>{children}</div>}

      {footer && (
        <div
          style={{
            marginTop: "auto",
            paddingTop: "12px",
            borderTop: "1px solid rgba(128, 128, 128, 0.1)",
            fontSize: "13px",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
