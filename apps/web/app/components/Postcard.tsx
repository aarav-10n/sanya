"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Synthesized vintage typewriter sound generator using Web Audio API
export const playTypewriterSound = () => {
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
    // Audio context initialization fallback
  }
};

export const STAMP_COLLECTION = [
  {
    id: "plum",
    title: "Vintage Plum Postage Stamp",
    src: "/stamps/vintage_plum_postage_stamp.svg",
  },
  {
    id: "dog",
    title: "Vintage Dog Postage Stamp",
    src: "/stamps/vintage_dog_postage_stamp.svg",
  },
  {
    id: "vintage",
    title: "Vintage Postage Stamp",
    src: "/stamps/vintage_postage_stamp.svg",
  },
];

const DEFAULT_MESSAGE =
  "sanu,\n\n" +
  "i spent the whole night regretting what i did and i never would want to repeat the same mistake again.\n" +
  "this is to make sure that you know, that i never want to intentionally hurt you and not make you regret anything.\n" +
  "tap to flip the card.\n\n" +
  "p.s. - click the stamp to change it, there's a surprise <3";

const DEFAULT_FROM = "Aarav";
const DEFAULT_ADDRESS_1 = "To: The Curious Explorer";
const DEFAULT_ADDRESS_2 = "Via: React Web / App Monorepo";
const DEFAULT_ADDRESS_3 = "Loc: github.com/aarav-10n/sanya";

const DEFAULT_BACK_MESSAGE =
  "I want to start by apologising. I'm not just saying it for the sake of it, but I genuinely mean it. I never should have yelled at you or over reacted so much unnecessarily. I could have been more understanding and I know that there are somethings that you can't control. It made me feel horrible that you had to relate what happened to your past relationship and I will never let that happen again. You mean the world to me, and I never want you to feel hurt because of me ever again. When you went silent and didn't want to talk anymore, I regretted doing everything I did. I am genuinely very sorry, I'll never do it again.\n\n" +
  "Just to make sure I don't do shit like this again, I'm gonna make a few promises and you have full rights to hold me accountable to these (pinky promise):\n" +
  "1. I promise to never yell at you ever ever again.\n" +
  "2. I promise that I won't over react again.\n" +
  "3. I promise to fix these issues once and for all.\n" +
  "4. I promise that you'll never have to get reminded of your past relationship again.\n" +
  "5. I promise that we'll never go to sleep mad at each other.\n" +
  "6. I promise that I'll always take care of you.\n" +
  "7. I promise that I'll never break your trust again.\n\n" +
  "I love you,\n" +
  "Aarav <3";

interface PostcardProps {
  isInteractive?: boolean;
  className?: string;
  message?: string;
  fromName?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  backMessage?: string;
}

export default function Postcard({
  isInteractive = true,
  className = "",
  message = DEFAULT_MESSAGE,
  fromName = DEFAULT_FROM,
  addressLine1 = DEFAULT_ADDRESS_1,
  addressLine2 = DEFAULT_ADDRESS_2,
  addressLine3 = DEFAULT_ADDRESS_3,
  backMessage = DEFAULT_BACK_MESSAGE,
}: PostcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [stampIndex, setStampIndex] = useState(0);

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
    if (!isInteractive) return;
    setIsFlipped((prev) => !prev);
    playTypewriterSound();
  };

  const currentStamp = STAMP_COLLECTION[stampIndex] ?? STAMP_COLLECTION[0]!;

  return (
    <div
      className={`postcard-wrapper ${className}`}
      inert={!isInteractive}
      aria-hidden={!isInteractive}
    >
      <div
        ref={cardInnerRef}
        className="postcard-inner"
        onClick={handleCardClick}
        style={{ cursor: isInteractive ? "pointer" : "default" }}
        title={
          isInteractive
            ? isFlipped
              ? "Tap to view message side"
              : "Tap postcard to flip"
            : undefined
        }
      >
        {/* ============================================================== */}
        {/* POSTCARD FRONT: Exact replica of reference image with inputs   */}
        {/* ============================================================== */}
        <div
          className="postcard-face postcard-back"
          style={{
            backgroundImage: "url('/postcard-back-clean.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            color: "#271f18",
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
          {/* CRISP HIGH-RESOLUTION "POSTCARD" HEADER                    */}
          {/* ---------------------------------------------------------- */}
          <div
            className="typewriter-ink"
            style={{
              position: "absolute",
              left: "4.8%",
              top: "6.8%",
              fontSize: "clamp(1.2rem, 2.7vw, 1.85rem)",
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: "#271f18",
              userSelect: "none",
            }}
          >
            P O S T C A R D
          </div>

          {/* ---------------------------------------------------------- */}
          {/* CRISP CENTRAL VERTICAL DIVIDER LINE                        */}
          {/* ---------------------------------------------------------- */}
          <div
            style={{
              position: "absolute",
              left: "49.6%",
              top: "22%",
              bottom: "12%",
              width: "1.5px",
              backgroundColor: "rgba(39, 31, 24, 0.8)",
              pointerEvents: "none",
            }}
          />

          {/* ---------------------------------------------------------- */}
          {/* LEFT SIDE: Typewriter letter (Permanent Typography)        */}
          {/* ---------------------------------------------------------- */}
          <div
            className="typewriter-ink"
            style={{
              position: "absolute",
              left: "4.8%",
              top: "17%",
              width: "43%",
              fontFamily: "var(--font-special-elite), 'Special Elite', cursive, monospace",
              fontSize: "clamp(0.64rem, 1.28vw, 0.90rem)",
              lineHeight: 1.55,
              color: "#271f18",
              letterSpacing: "0.035em",
              textShadow:
                "0 0 0.8px rgba(35, 25, 20, 0.45), 0.3px 0.3px 0px rgba(35, 25, 20, 0.25)",
              whiteSpace: "pre-wrap",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {message}
          </div>

          {/* ---------------------------------------------------------- */}
          {/* BOTTOM LEFT: "FROM:" Text + Signature                      */}
          {/* ---------------------------------------------------------- */}
          <div
            className="typewriter-ink"
            style={{
              position: "absolute",
              left: "4.8%",
              bottom: "8.5%",
              width: "41.5%",
              display: "flex",
              alignItems: "baseline",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "clamp(0.68rem, 1.35vw, 0.92rem)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#271f18",
                marginRight: "8px",
                flexShrink: 0,
              }}
            >
              F R O M :
            </span>
            <span
              style={{
                fontFamily: "var(--font-special-elite), 'Special Elite', cursive, monospace",
                fontSize: "clamp(0.68rem, 1.35vw, 0.92rem)",
                color: "#271f18",
                letterSpacing: "0.04em",
                textShadow:
                  "0 0 0.8px rgba(35, 25, 20, 0.45), 0.3px 0.3px 0px rgba(35, 25, 20, 0.25)",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {fromName}
            </span>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* TOP RIGHT: Click directly on stamp to change it            */}
          {/* ---------------------------------------------------------- */}
          <div
            onClick={(e) => {
              if (!isInteractive) return;
              e.stopPropagation();
              setStampIndex((prev) => (prev + 1) % STAMP_COLLECTION.length);
              playTypewriterSound();
            }}
            title={isInteractive ? `Stamp: ${currentStamp.title} (Click to change)` : undefined}
            style={{
              position: "absolute",
              top: "6.8%",
              right: "5.2%",
              width: "11%",
              height: "19.5%",
              cursor: isInteractive ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            {/* SVG Stamp Graphic */}
            <img
              src={currentStamp.src}
              alt={currentStamp.title}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.35))",
                transform: "rotate(-1.2deg)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />

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
          {/* RIGHT SIDE: 4 Horizontal Address Lines with crisp underlines */}
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
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(39, 31, 24, 0.85)",
              paddingBottom: "2px",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            <span
              className="typewriter-ink"
              style={{
                fontFamily: "var(--font-special-elite), 'Special Elite', cursive, monospace",
                fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                color: "#271f18",
                letterSpacing: "0.04em",
                textShadow:
                  "0 0 0.8px rgba(35, 25, 20, 0.45), 0.3px 0.3px 0px rgba(35, 25, 20, 0.25)",
                lineHeight: 1,
              }}
            >
              {addressLine1}
            </span>
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
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(39, 31, 24, 0.85)",
              paddingBottom: "2px",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            <span
              className="typewriter-ink"
              style={{
                fontFamily: "var(--font-special-elite), 'Special Elite', cursive, monospace",
                fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                color: "#271f18",
                letterSpacing: "0.04em",
                textShadow:
                  "0 0 0.8px rgba(35, 25, 20, 0.45), 0.3px 0.3px 0px rgba(35, 25, 20, 0.25)",
                lineHeight: 1,
              }}
            >
              {addressLine2}
            </span>
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
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(39, 31, 24, 0.85)",
              paddingBottom: "2px",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            <span
              className="typewriter-ink"
              style={{
                fontFamily: "var(--font-special-elite), 'Special Elite', cursive, monospace",
                fontSize: "clamp(0.65rem, 1.4vw, 0.95rem)",
                color: "#271f18",
                letterSpacing: "0.04em",
                textShadow:
                  "0 0 0.8px rgba(35, 25, 20, 0.45), 0.3px 0.3px 0px rgba(35, 25, 20, 0.25)",
                lineHeight: 1,
              }}
            >
              {addressLine3}
            </span>
          </div>

          {/* Line 4: Blank address line */}
          <div
            style={{
              position: "absolute",
              left: "56.6%",
              top: "65.5%",
              width: "34.3%",
              height: "5.5%",
              display: "flex",
              alignItems: "flex-end",
              borderBottom: "1.5px solid rgba(39, 31, 24, 0.85)",
              paddingBottom: "2px",
            }}
          />
        </div>

        {/* ============================================================== */}
        {/* POSTCARD BACK: Exact matching vintage paper with text body     */}
        {/* ============================================================== */}
        <div
          className="postcard-face postcard-front"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/postcard-back-clean.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            color: "#271f18",
          }}
        >
          {/* Warm Ambient Sheen matching front */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at 30% 25%, rgba(255, 245, 220, 0.12) 0%, transparent 60%)",
            }}
          />

          {/* Full Permanent Text Body */}
          <div
            className="typewriter-ink"
            style={{
              position: "absolute",
              left: "6.8%",
              top: "7%",
              right: "6.8%",
              bottom: "7%",
              fontFamily: "var(--font-special-elite), 'Special Elite', cursive, monospace",
              fontSize: "clamp(0.60rem, 1.18vw, 0.88rem)",
              lineHeight: 1.55,
              color: "#271f18",
              letterSpacing: "0.035em",
              textShadow:
                "0 0 0.8px rgba(35, 25, 20, 0.45), 0.3px 0.3px 0px rgba(35, 25, 20, 0.25)",
              whiteSpace: "pre-wrap",
              userSelect: "none",
              pointerEvents: "none",
              overflowY: "auto",
            }}
          >
            {backMessage}
          </div>
        </div>
      </div>

      {/* Subtle, Elegant Hint Below Postcard */}
      <div
        className="typewriter-ink"
        style={{
          marginTop: "18px",
          fontSize: "12px",
          color: "rgba(232, 216, 190, 0.5) !important",
          textShadow: "none !important",
          textAlign: "center",
          letterSpacing: "0.08em",
          pointerEvents: "none",
          opacity: isInteractive ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {isFlipped
          ? "✦ Tap postcard to flip back to letter"
          : "✦ Tap card to flip • Click stamp to change"}
      </div>
    </div>
  );
}
