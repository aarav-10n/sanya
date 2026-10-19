"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Synthesized vintage typewriter sound generator using Web Audio API
const playTypewriterSound = () => {
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140 + Math.random() * 80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.04);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1200 + Math.random() * 400, ctx.currentTime);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {
    // Audio context initialization
  }
};

const STAMP_COLLECTION = [
  {
    id: "airmail",
    title: "1926 Airmail",
    color: "#8b261e",
    accent: "#f4ebd0",
    motif: "✈",
    price: "24¢",
    label: "U.S. AIR MAIL",
  },
  {
    id: "botanical",
    title: "Rose Botanical",
    color: "#2c5e3b",
    accent: "#e9eed9",
    motif: "🌹",
    price: "15¢",
    label: "ROYAL BOTANICAL",
  },
  {
    id: "nautical",
    title: "Nautical Clipper",
    color: "#1d3557",
    accent: "#e2eafc",
    motif: "⛵",
    price: "30¢",
    label: "TRANS-OCEANIC",
  },
  {
    id: "celestial",
    title: "Celestial Astrolabe",
    color: "#4a2840",
    accent: "#f3e8f0",
    motif: "🪐",
    price: "50¢",
    label: "DEEP SPACE 2026",
  },
];

export default function PostcardLandingPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [stampIndex, setStampIndex] = useState(0);

  // Editable text states
  const [message, setMessage] = useState(
    "Dearest Traveler,\n\n" +
    "Welcome to Sanya — crafted with timeless aesthetic care and modern React code.\n\n" +
    "Every line here represents a shared component, every stamp a connected app in our Turborepo.\n\n" +
    "May your journeys through this code be swift and inspiring."
  );
  const [fromName, setFromName] = useState("Aarav & Sanya");
  const [addressLine1, setAddressLine1] = useState("To: The Curious Explorer");
  const [addressLine2, setAddressLine2] = useState("Via: React Web / App Monorepo");
  const [addressLine3, setAddressLine3] = useState("Loc: github.com/aarav-10n/sanya");

  const cardInnerRef = useRef<HTMLDivElement>(null);

  // GSAP 3D Rotation Flip — zero layout shift, strictly pivots around 50% 50%
  useEffect(() => {
    if (!cardInnerRef.current) return;
    gsap.to(cardInnerRef.current, {
      rotationY: isFlipped ? 180 : 0,
      duration: 0.75,
      ease: "power2.inOut",
      transformOrigin: "50% 50%",
      force3D: true,
    });
  }, [isFlipped]);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
    playTypewriterSound();
  };

  const currentStamp = STAMP_COLLECTION[stampIndex] ?? STAMP_COLLECTION[0]!;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 16px 40px 16px",
        position: "relative",
      }}
    >
      {/* Top Vintage Navigation Header */}
      <header
        className="desk-header"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          right: "16px",
          maxWidth: "1050px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "rgba(35, 27, 22, 0.75)",
          border: "1px solid rgba(190, 150, 100, 0.2)",
          borderRadius: "8px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px" }}>✉️</span>
          <div>
            <h1
              style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: "15px",
                letterSpacing: "0.2em",
                color: "#e8d8be",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Postal Bureau • Sanya Studio
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "rgba(232, 216, 190, 0.6)",
                fontFamily: "'Courier Prime', monospace",
              }}
            >
              Monorepo Public Web • Port 3000
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="http://localhost:3001"
            style={{
              fontFamily: "'Special Elite', monospace",
              fontSize: "13px",
              padding: "7px 16px",
              borderRadius: "4px",
              backgroundColor: "rgba(180, 70, 50, 0.85)",
              color: "#fff",
              border: "1px solid rgba(255, 200, 180, 0.3)",
              transition: "all 0.2s ease",
              boxShadow: "0 2px 8px rgba(180, 70, 50, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            Launch App Console (:3001) →
          </a>
        </div>
      </header>

      {/* Main Postcard Showcase */}
      <main
        style={{
          width: "100%",
          maxWidth: "880px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="postcard-wrapper">
          <div
            ref={cardInnerRef}
            className="postcard-inner"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
            title={isFlipped ? "Tap to view back" : "Tap postcard to flip"}
          >
            {/* ============================================================== */}
            {/* POSTCARD BACK: Exact replica of reference image with inputs    */}
            {/* ============================================================== */}
            <div
              className="postcard-face postcard-back"
              style={{
                backgroundImage: "url('/postcard-bg.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: "#231b15",
              }}
            >
              {/* Warm Ambient Sheen */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(ellipse at 30% 25%, rgba(255, 245, 220, 0.12) 0%, transparent 60%)",
                }}
              />

              {/* ---------------------------------------------------------- */}
              {/* LEFT SIDE: Directly editable typewriter letter             */}
              {/* ---------------------------------------------------------- */}
              <div
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "18%",
                  width: "41.5%",
                  height: "66%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <textarea
                  value={message}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    playTypewriterSound();
                  }}
                  placeholder="Click here to type your letter..."
                  spellCheck={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    resize: "none",
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                    lineHeight: 1.45,
                    color: "#241b16",
                    overflowY: "auto",
                    padding: 0,
                    margin: 0,
                    cursor: "text",
                  }}
                />
              </div>

              {/* ---------------------------------------------------------- */}
              {/* BOTTOM LEFT: "FROM:" Text Input directly on the line       */}
              {/* ---------------------------------------------------------- */}
              <div
                style={{
                  position: "absolute",
                  left: "11.5%",
                  bottom: "8.5%",
                  width: "35%",
                  height: "6%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={fromName}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setFromName(e.target.value);
                    playTypewriterSound();
                  }}
                  placeholder="Your Name / Signature"
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                    color: "#241b16",
                    fontWeight: 600,
                    cursor: "text",
                  }}
                />
              </div>

              {/* ---------------------------------------------------------- */}
              {/* TOP RIGHT: Click directly on stamp to change it            */}
              {/* ---------------------------------------------------------- */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setStampIndex((prev) => (prev + 1) % STAMP_COLLECTION.length);
                  playTypewriterSound();
                }}
                title="Click stamp to change design"
                style={{
                  position: "absolute",
                  top: "7.1%",
                  right: "5.5%",
                  width: "10.4%",
                  height: "18.8%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: "92%",
                    height: "92%",
                    backgroundColor: currentStamp.color,
                    border: "2px dashed #ede2cf",
                    borderRadius: "2px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 2px",
                    color: currentStamp.accent,
                    fontFamily: "'Courier Prime', monospace",
                    transform: "rotate(-1.5deg)",
                    userSelect: "none",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.5px" }}>
                    {currentStamp.label}
                  </span>
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>{currentStamp.motif}</span>
                  <span style={{ fontSize: "9px", fontWeight: 700 }}>{currentStamp.price}</span>
                </div>

                {/* Overlaid Wavy Postal Ink Cancellation Mark */}
                <div
                  style={{
                    position: "absolute",
                    left: "-28px",
                    top: "10px",
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    opacity: 0.65,
                    transform: "rotate(-8deg)",
                  }}
                >
                  <div style={{ width: "65px", height: "1px", backgroundColor: "#1e1e1e" }} />
                  <div style={{ width: "75px", height: "1px", backgroundColor: "#1e1e1e" }} />
                  <div style={{ width: "60px", height: "1px", backgroundColor: "#1e1e1e" }} />
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* RIGHT SIDE: 4 Horizontal Address Lines with direct inputs  */}
              {/* ---------------------------------------------------------- */}
              {/* Line 1 */}
              <div
                style={{
                  position: "absolute",
                  left: "56.6%",
                  top: "40.5%",
                  width: "34.3%",
                  height: "5.5%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={addressLine1}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setAddressLine1(e.target.value);
                    playTypewriterSound();
                  }}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                    color: "#241b16",
                    cursor: "text",
                  }}
                />
              </div>

              {/* Line 2 */}
              <div
                style={{
                  position: "absolute",
                  left: "56.6%",
                  top: "48.8%",
                  width: "34.3%",
                  height: "5.5%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={addressLine2}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setAddressLine2(e.target.value);
                    playTypewriterSound();
                  }}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                    color: "#241b16",
                    cursor: "text",
                  }}
                />
              </div>

              {/* Line 3 */}
              <div
                style={{
                  position: "absolute",
                  left: "56.6%",
                  top: "57.2%",
                  width: "34.3%",
                  height: "5.5%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={addressLine3}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setAddressLine3(e.target.value);
                    playTypewriterSound();
                  }}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                    color: "#241b16",
                    cursor: "text",
                  }}
                />
              </div>

              {/* Line 4: Clickable portal link to app dashboard */}
              <div
                style={{
                  position: "absolute",
                  left: "56.6%",
                  top: "65.5%",
                  width: "34.3%",
                  height: "5.5%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <a
                  href="http://localhost:3001"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                    fontWeight: 700,
                    color: "#8b261e",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>→ Launch App (Port 3001)</span>
                </a>
              </div>
            </div>

            {/* ============================================================== */}
            {/* POSTCARD FRONT: Vintage Scenic Illustration Side               */}
            {/* ============================================================== */}
            <div
              className="postcard-face postcard-front"
              style={{
                backgroundColor: "#2e231c",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                border: "12px solid #eae1d0",
              }}
            >
              {/* Vintage Grain & Vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle at center, transparent 40%, rgba(20, 14, 10, 0.7) 100%), linear-gradient(135deg, rgba(200, 120, 50, 0.3) 0%, rgba(20, 30, 60, 0.6) 100%)",
                  zIndex: 2,
                }}
              />

              {/* Scenic Graphic Artwork */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, #1b263b 0%, #415a77 40%, #c77dff 65%, #ffb703 85%, #fb8500 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {/* Silhouette mountains */}
                <div
                  style={{
                    width: "120%",
                    height: "140px",
                    background: "#0d1b2a",
                    clipPath:
                      "polygon(0 100%, 15% 45%, 35% 85%, 55% 30%, 75% 75%, 90% 40%, 100% 100%)",
                  }}
                />
              </div>

              {/* Vintage Embossed Typographic Banner */}
              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  textAlign: "center",
                  textShadow: "0 4px 15px rgba(0,0,0,0.8)",
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    color: "#fefae0",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  Greetings from
                </div>
                <h2
                  style={{
                    fontFamily: "'Special Elite', monospace",
                    fontSize: "3.6rem",
                    letterSpacing: "0.25em",
                    color: "#fefae0",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  S A N Y A
                </h2>
                <div
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "0.9rem",
                    color: "#dda15e",
                    letterSpacing: "0.2em",
                    marginTop: "8px",
                  }}
                >
                  EST. 2026 • REACT MONOREPO ARCHITECTURE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle, Elegant Hint Below Postcard */}
        <div
          style={{
            marginTop: "18px",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "12px",
            color: "rgba(232, 216, 190, 0.45)",
            textAlign: "center",
            letterSpacing: "0.08em",
            pointerEvents: "none",
          }}
        >
          {isFlipped
            ? "✦ Tap postcard to flip back to letter"
            : "✦ Tap card to flip • Click stamp to change • Click text to edit"}
        </div>
      </main>
    </div>
  );
}
