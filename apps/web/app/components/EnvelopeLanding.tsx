"use client";

import React, { useState, useEffect, useRef } from "react";
import Postcard from "./Postcard";
import "./EnvelopeLanding.css";

// Synthesize authentic wax seal break & paper slide sound using Web Audio API
const playEnvelopeOpenSound = () => {
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // 1. Crisp wax seal pop / snap (higher frequency transient click)
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = "sine";
    popOsc.frequency.setValueAtTime(680, ctx.currentTime);
    popOsc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.05);
    popGain.gain.setValueAtTime(0.35, ctx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start();
    popOsc.stop(ctx.currentTime + 0.055);

    // 2. Paper slide / rustle sound (soft bandpass-filtered noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.4);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1600, ctx.currentTime + 0.04);
    filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.38);
    filter.Q.value = 2.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.09);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(ctx.currentTime + 0.04);
  } catch {
    // Audio initialization fallback
  }
};

/**
 * Authentic Royal Purple Wax Seal SVG
 * Features rich layered wax gradients, organic melted bevels, and an embossed vintage monogram emblem.
 */
function WaxSealGraphic() {
  return (
    <svg
      className="wax-seal-svg"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Deep Imperial Purple Wax Gradient */}
        <radialGradient id="waxBaseGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="42%" stopColor="#7e22ce" />
          <stop offset="78%" stopColor="#581c87" />
          <stop offset="100%" stopColor="#3b0764" />
        </radialGradient>

        {/* Inner Debossed Well Gradient */}
        <radialGradient id="waxWellGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#6b21a8" />
          <stop offset="75%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#2e1065" />
        </radialGradient>

        {/* Embossed Gold / Lavender Highlight Filter */}
        <filter id="sealEmbossFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.4" floodColor="#ffffff" floodOpacity="0.32" />
          <feDropShadow dx="0" dy="-1" stdDeviation="0.6" floodColor="#1e053a" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* Organic Melted Wax Outer Contour */}
      <path
        d="M50,4 
           C63,3 75,7 83,16 
           C92,25 97,37 96,50 
           C97,63 91,76 82,84 
           C73,93 61,97 49,96 
           C36,97 24,92 16,83 
           C7,74 3,62 4,50 
           C3,37 8,24 17,16 
           C26,7 37,4 50,4 Z"
        fill="url(#waxBaseGrad)"
      />

      {/* Outer Raised Melt Lip */}
      <path
        d="M50,6 
           C61,5 73,9 80,18 
           C89,26 93,37 92,50 
           C93,62 88,73 80,81 
           C71,90 60,94 48,93 
           C36,94 25,89 17,81 
           C9,72 5,61 6,50 
           C5,38 9,26 18,18 
           C26,9 37,6 50,6 Z"
        stroke="rgba(233, 213, 255, 0.22)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Inner Pressed Seal Ridge */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="url(#waxWellGrad)"
        stroke="rgba(192, 132, 252, 0.45)"
        strokeWidth="2"
      />

      {/* Inner Bevel Groove */}
      <circle
        cx="50"
        cy="50"
        r="31"
        fill="none"
        stroke="rgba(30, 5, 55, 0.55)"
        strokeWidth="1.2"
      />

      {/* Embossed Decorative Insignia */}
      <g filter="url(#sealEmbossFilter)" fill="#f3e8ff">
        {/* Crown with Pearls */}
        <path
          d="M38,30 L41,36 L50,32 L59,36 L62,30 L60,40 L40,40 Z"
          opacity="0.9"
        />
        <circle cx="38" cy="28.5" r="1.5" />
        <circle cx="50" cy="29.5" r="1.8" />
        <circle cx="62" cy="28.5" r="1.5" />

        {/* Elegant Central Royal Monogram "S" */}
        <path
          d="M57,47 C55,44 51,43.5 48,44.5 C45,45.5 44,48 45,50.5 C46.5,53.5 54,54.5 55,59 C56,63.5 52,67.5 47,67 C42.5,66.5 40,63 40.5,60 L44,60 C43.8,61.8 45.5,64 47.5,64 C49.5,64 51.5,62.2 51,60 C50,56 42,55.5 41,51 C40,46.5 43.5,42 48.5,41.5 C53,41 56,43 57.5,45.5 Z"
          fillRule="evenodd"
        />

        {/* Delicate Flanking Laurel Sprigs */}
        {/* Left Laurel */}
        <path
          d="M34,44 C33,48 33,56 37,63 M33,49 C31,48 29,49 29,51 M34,55 C32,54 30,55 30,57 M36,60 C34,60 32,61 32,63"
          stroke="#f3e8ff"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Laurel */}
        <path
          d="M66,44 C67,48 67,56 63,63 M67,49 C69,48 71,49 71,51 M66,55 C68,54 70,55 70,57 M64,60 C66,60 68,61 68,63"
          stroke="#f3e8ff"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Base Star / Gem Accent */}
        <polygon points="50,69 51.5,72 54,72.5 52,74.5 52.5,77 50,75.5 47.5,77 48,74.5 46,72.5 48.5,72" />
      </g>

      {/* Glossy Curved Highlight Specular Glint */}
      <ellipse
        cx="36"
        cy="22"
        rx="14"
        ry="6"
        transform="rotate(-28 36 22)"
        fill="#ffffff"
        opacity="0.25"
      />
    </svg>
  );
}

export default function EnvelopeLanding() {
  const [envelopeState, setEnvelopeState] = useState<"closed" | "opening" | "revealed">("closed");
  const openTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (envelopeState !== "closed") return;

    setEnvelopeState("opening");
    playEnvelopeOpenSound();

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const transitionDuration = prefersReducedMotion ? 250 : 1650;

    openTimerRef.current = setTimeout(() => {
      setEnvelopeState("revealed");
    }, transitionDuration);
  };

  const isRevealed = envelopeState === "revealed";

  return (
    <div className={`envelope-landing-stage ${envelopeState}`}>
      <div className={`envelope-motion-rig ${envelopeState}`}>
        {/* Soft Floating Ambient Shadow beneath Envelope */}
        {!isRevealed && (
          <div className={`envelope-ambient-shadow ${envelopeState === "opening" ? "fade-out" : ""}`} />
        )}

        {/* 3D Envelope Paper Shell: Back Sheet & Top Flap */}
        {!isRevealed && (
          <div className={`envelope-paper-layers ${envelopeState === "opening" ? "fade-out" : ""}`}>
            {/* Layer 1: Envelope Back Sheet */}
            <div className="envelope-back-sheet" />

            {/* Layer 2: 3D Triangular Top Flap (Hinged at top edge) */}
            <div className={`envelope-top-flap ${envelopeState === "opening" ? "open" : ""}`}>
              {/* Flap Outer Side (visible when closed) */}
              <div className="flap-face flap-face-outer" />
              {/* Flap Inner Side (visible when flipped open 180deg) */}
              <div className="flap-face flap-face-inner" />
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* THE SINGLE PERSISTENT POSTCARD INSTANCE                        */}
        {/* Physically layered inside the pocket when closed;               */}
        {/* Emerges in 3D and centers when opening;                         */}
        {/* Fully interactive and persistent when revealed!                */}
        {/* ============================================================== */}
        <div className={`envelope-postcard-carrier ${envelopeState}`}>
          <Postcard isInteractive={isRevealed} />
        </div>

        {/* Envelope Front Pocket Flaps & Wax Seal Button */}
        {!isRevealed && (
          <div className={`envelope-front-pocket-rig ${envelopeState === "opening" ? "fade-out" : ""}`}>
            {/* Layer 4: Front Pocket (Left, Right, Bottom Flaps) */}
            <div className="envelope-pocket">
              <div className="pocket-flap pocket-flap-left" />
              <div className="pocket-flap pocket-flap-right" />
              <div className="pocket-flap pocket-flap-bottom" />
            </div>

            {/* Layer 5: Interactive Purple Wax Seal Button */}
            <div className="envelope-seal-anchor">
              <button
                type="button"
                className={`wax-seal-button ${envelopeState === "opening" ? "breaking" : ""}`}
                onClick={handleOpenEnvelope}
                disabled={envelopeState !== "closed"}
                aria-label="Break the purple wax seal to open the envelope and reveal postcard"
                title="Click to break seal & open postcard"
              >
                <WaxSealGraphic />
              </button>
            </div>

            {/* Hint / Invitation Text below the closed envelope */}
            {envelopeState === "closed" && (
              <div className="envelope-invitation-hint typewriter-ink">
                ✦ Click the purple wax seal to open ✦
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
