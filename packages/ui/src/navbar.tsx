import React, { type JSX } from "react";
import { Badge } from "./badge";

export interface NavbarProps {
  currentApp: "web" | "app";
  title?: string;
}

export function Navbar({ currentApp, title = "React Monorepo" }: NavbarProps): JSX.Element {
  const isWeb = currentApp === "web";

  return (
    <header
      style={{
        width: "100%",
        borderBottom: "1px solid rgba(128, 128, 128, 0.15)",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(10, 10, 10, 0.75)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0070f3, #7928ca)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#fff",
              fontSize: "16px",
            }}
          >
            ⚛
          </div>
          <span style={{ fontWeight: 700, fontSize: "16px", letterSpacing: "-0.02em" }}>
            {title}
          </span>
          <Badge variant={isWeb ? "blue" : "purple"}>
            {isWeb ? "apps/web (Port 3000)" : "apps/app (Port 3001)"}
          </Badge>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href={isWeb ? "#architecture" : "http://localhost:3000"}
            style={{
              fontSize: "14px",
              opacity: isWeb ? 0.9 : 0.6,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            {isWeb ? "Architecture" : "← Public Site (:3000)"}
          </a>
          <a
            href={isWeb ? "http://localhost:3001" : "#dashboard"}
            style={{
              fontSize: "14px",
              opacity: isWeb ? 0.6 : 0.9,
              fontWeight: 500,
              textDecoration: "none",
              backgroundColor: isWeb ? "rgba(255,255,255,0.08)" : "transparent",
              padding: isWeb ? "6px 14px" : "0",
              borderRadius: "6px",
            }}
          >
            {isWeb ? "Launch App (:3001) →" : "Dashboard"}
          </a>
        </nav>
      </div>
    </header>
  );
}
