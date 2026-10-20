"use client";

import React from "react";
import EnvelopeLanding from "./components/EnvelopeLanding";

export default function PostcardLandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient Blurred Cafe Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-12px",
            backgroundImage: "url('/cafe.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(4px) brightness(0.52) saturate(0.95)",
            transform: "scale(1.03)",
          }}
        />
        {/* Soft Vignette Overlay to ensure the envelope & postcard remain the primary focus */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(20, 16, 12, 0.45) 0%, rgba(10, 8, 6, 0.82) 100%)",
          }}
        />
      </div>

      {/* Main Showcase: Animated 3D Envelope revealing the Postcard */}
      <main
        style={{
          width: "100%",
          maxWidth: "880px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <EnvelopeLanding />
      </main>
    </div>
  );
}
