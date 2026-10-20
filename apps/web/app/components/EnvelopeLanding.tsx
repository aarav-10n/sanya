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
    const bufferSize = Math.floor(ctx.sampleRate * 0.45);
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
    filter.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.42);
    filter.Q.value = 2.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.09);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.42);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(ctx.currentTime + 0.04);
  } catch {
    // Audio initialization fallback
  }
};

/**
 * Reference Red Wax Seal with Embossed Paw Print
 */
function WaxSealGraphic() {
  return (
    <img
      src="/wax-seal-paw.png"
      alt="Paw print red wax seal"
      className="wax-seal-image"
      draggable={false}
      width={963}
      height={893}
    />
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

    const transitionDuration = prefersReducedMotion ? 300 : 1900;

    openTimerRef.current = setTimeout(() => {
      setEnvelopeState("revealed");
    }, transitionDuration);
  };

  const isRevealed = envelopeState === "revealed";

  return (
    <div className={`envelope-landing-stage ${envelopeState}`}>
      <div className={`envelope-motion-rig ${envelopeState}`}>
        {/* Layer 0: Ambient Shadow beneath Envelope */}
        {!isRevealed && (
          <div className={`envelope-ambient-shadow ${envelopeState === "opening" ? "fade-out" : ""}`} />
        )}

        {/* Layer 1: Envelope Back Sheet with Paper Texture & Kraft Lining */}
        {!isRevealed && (
          <div className={`envelope-back-sheet ${envelopeState === "opening" ? "fade-out" : ""}`}>
            <div className="envelope-interior-lining" />
            <div className="envelope-paper-texture" />
          </div>
        )}

        {/* Layer 2: The Single Persistent Postcard Instance */}
        {/* Inside pocket when closed; rises up clear of envelope and centers when opening; interactive when revealed */}
        <div className={`envelope-postcard-carrier ${envelopeState}`}>
          <Postcard isInteractive={isRevealed} />
        </div>

        {/* Layer 3: Envelope Front Pocket (100% Solid Base + Side & Bottom Flaps + Crease Lines) */}
        {!isRevealed && (
          <div className={`envelope-pocket ${envelopeState === "opening" ? "fade-out" : ""}`}>
            {/* 100% Solid opaque paper base covering entire bottom and sides */}
            <div className="pocket-solid-base">
              <div className="envelope-paper-texture" />
            </div>
            {/* Authentic paper fold flaps on top of the solid base */}
            <div className="pocket-flap pocket-flap-left">
              <div className="envelope-paper-texture" />
            </div>
            <div className="pocket-flap pocket-flap-right">
              <div className="envelope-paper-texture" />
            </div>
            <div className="pocket-flap pocket-flap-bottom">
              <div className="envelope-paper-texture" />
            </div>

            {/* Crisp defined paper crease lines and fold seams */}
            <svg
              className="envelope-crease-overlay"
              viewBox="0 0 560 370"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Bottom triangular flap scored crease lines (dark score + highlight) */}
              <path d="M0,370 L280,158 L560,370" fill="none" stroke="rgba(105, 75, 45, 0.42)" strokeWidth="1.6" />
              <path d="M0,371 L280,159 L560,371" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1" />

              {/* Left & Right diagonal fold crease lines */}
              <path d="M0,0 L280,195" fill="none" stroke="rgba(115, 85, 50, 0.28)" strokeWidth="1.2" />
              <path d="M0,1 L280,196" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.8" />
              <path d="M560,0 L280,195" fill="none" stroke="rgba(115, 85, 50, 0.28)" strokeWidth="1.2" />
              <path d="M560,1 L280,196" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.8" />

              {/* Crisp envelope perimeter border */}
              <rect x="0.5" y="0.5" width="559" height="369" rx="5.5" fill="none" stroke="rgba(150, 120, 85, 0.55)" strokeWidth="1" />
            </svg>
          </div>
        )}

        {/* Layer 4: 3D Triangular Top Flap (Hinged at top edge, seamlessly connected) */}
        {!isRevealed && (
          <div className={`envelope-top-flap ${envelopeState === "opening" ? "open fade-out" : ""}`}>
            {/* Flap Outer Side (visible when closed) */}
            <div className="flap-face flap-face-outer">
              <div className="envelope-paper-texture" />
              <svg className="flap-edge-overlay" viewBox="0 0 560 225" preserveAspectRatio="none" aria-hidden="true">
                {/* Triangular flap edge crease score & highlight */}
                <path d="M0,0 L280,225 L560,0" fill="none" stroke="rgba(100, 70, 40, 0.45)" strokeWidth="1.8" />
                <path d="M1,0 L280,223 L559,0" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1" />
                {/* Top hinge score line */}
                <line x1="0" y1="0.5" x2="560" y2="0.5" stroke="rgba(130, 95, 60, 0.4)" strokeWidth="1" />
              </svg>
            </div>
            {/* Flap Inner Side (visible when flipped open 180deg) */}
            <div className="flap-face flap-face-inner">
              <div className="envelope-paper-texture" />
            </div>
          </div>
        )}

        {/* Layer 5: Interactive Red Wax Seal Button */}
        {!isRevealed && (
          <div className={`envelope-seal-anchor ${envelopeState === "opening" ? "fade-out" : ""}`}>
            <button
              type="button"
              className={`wax-seal-button ${envelopeState === "opening" ? "breaking" : ""}`}
              onClick={handleOpenEnvelope}
              disabled={envelopeState !== "closed"}
              aria-label="Break the red wax seal to open the envelope and reveal postcard"
              title="Click to break seal & open postcard"
            >
              <WaxSealGraphic />
            </button>
          </div>
        )}

        {/* Hint / Invitation Text below the closed envelope */}
        {envelopeState === "closed" && (
          <div className="envelope-invitation-hint typewriter-ink">
            ✦ Click the wax seal to open ✦
          </div>
        )}
      </div>
    </div>
  );
}
