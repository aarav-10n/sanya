"use client";

import { useState } from "react";
import { Navbar } from "@repo/ui/navbar";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";

export default function Home() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <Navbar currentApp="web" title="Acme Inc. Monorepo" />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px", width: "100%" }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "inline-flex", gap: "8px", marginBottom: "16px" }}>
            <Badge variant="blue">Turborepo 2.0</Badge>
            <Badge variant="purple">Next.js 16</Badge>
            <Badge variant="green">React 19</Badge>
          </div>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "20px",
              background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Standard Web / App Monorepo
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#a1a1aa",
              maxWidth: "700px",
              margin: "0 auto 36px auto",
              lineHeight: 1.6,
            }}
          >
            A production-ready monorepo combining public marketing sites, authenticated
            web applications, and shared UI design systems with Turborepo task pipelines.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="http://localhost:3001" style={{ textDecoration: "none" }}>
              <Button size="lg" variant="primary">
                Open Web App (:3001) →
              </Button>
            </a>
            <a href="#architecture" style={{ textDecoration: "none" }}>
              <Button size="lg" variant="outline">
                View Monorepo Architecture
              </Button>
            </a>
          </div>
        </div>

        {/* Monorepo Architecture Overview */}
        <section id="architecture" style={{ marginBottom: "80px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Workspace Architecture
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "1rem" }}>
              Strict separation between runnable applications and reusable shared packages
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            <Card
              title="apps/web"
              badge="Port 3000"
              description="Public-facing marketing website built with Next.js App Router, SSR/SSG, and fast SEO landing pages."
              footer={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#10b981", fontWeight: 600 }}>Active (Current Site)</span>
                  <Badge variant="blue">Next.js</Badge>
                </div>
              }
            >
              <ul style={{ paddingLeft: "20px", margin: "12px 0 0 0", fontSize: "14px", color: "#a1a1aa" }}>
                <li>High-performance SSR & Static Generation</li>
                <li>Consumes shared components from <code>@repo/ui</code></li>
                <li>Shares linting and TypeScript presets</li>
              </ul>
            </Card>

            <Card
              title="apps/app"
              badge="Port 3001"
              description="Authenticated user portal and SaaS dashboard for account management, analytics, and app features."
              footer={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <a href="http://localhost:3001" style={{ color: "#0070f3", textDecoration: "none", fontWeight: 600 }}>
                    Launch Dashboard →
                  </a>
                  <Badge variant="purple">Next.js</Badge>
                </div>
              }
            >
              <ul style={{ paddingLeft: "20px", margin: "12px 0 0 0", fontSize: "14px", color: "#a1a1aa" }}>
                <li>Private web application / dashboard</li>
                <li>Consistent design token implementation</li>
                <li>Independent deployment & build cache</li>
              </ul>
            </Card>

            <Card
              title="packages/ui"
              badge="Shared Lib"
              description="Core design system component library consumed across all monorepo apps without duplicate code."
              footer={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#8b5cf6", fontWeight: 600 }}>Zero Build (JIT)</span>
                  <Badge variant="green">React 19</Badge>
                </div>
              }
            >
              <ul style={{ paddingLeft: "20px", margin: "12px 0 0 0", fontSize: "14px", color: "#a1a1aa" }}>
                <li>Shared <code>Button</code>, <code>Card</code>, <code>Navbar</code>, <code>Badge</code></li>
                <li>Direct source exports (no bundling step required)</li>
                <li>Fully typed with TypeScript</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Live Shared Component Sandbox */}
        <section
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(128, 128, 128, 0.15)",
            borderRadius: "16px",
            padding: "40px",
            marginBottom: "80px",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <Badge variant="amber">Interactive Demo</Badge>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginTop: "12px", marginBottom: "8px" }}>
              Shared Design System in Action
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
              These buttons and cards are imported directly from <code>@repo/ui</code>.
            </p>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
            <Button
              variant="primary"
              onClick={() => setClickCount((prev) => prev + 1)}
            >
              Clicked {clickCount} times
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert("Triggered from @repo/ui Button in apps/web!")}
            >
              Show Alert
            </Button>
            <Button
              variant="outline"
              onClick={() => setClickCount(0)}
            >
              Reset Counter
            </Button>
            <Button variant="ghost">Ghost Action</Button>
          </div>
        </section>

        {/* Developer Guide Commands */}
        <section>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "20px" }}>
            Monorepo Developer Commands
          </h2>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              border: "1px solid rgba(128, 128, 128, 0.2)",
              borderRadius: "12px",
              padding: "24px",
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "#a1a1aa" }}># Run both web and app concurrently</div>
            <div style={{ color: "#10b981" }}>npm run dev</div>
            <br />
            <div style={{ color: "#a1a1aa" }}># Build all apps and packages with Turborepo caching</div>
            <div style={{ color: "#10b981" }}>npm run build</div>
            <br />
            <div style={{ color: "#a1a1aa" }}># Run typechecking across all workspaces</div>
            <div style={{ color: "#10b981" }}>npm run check-types</div>
            <br />
            <div style={{ color: "#a1a1aa" }}># Lint every app and package</div>
            <div style={{ color: "#10b981" }}>npm run lint</div>
          </div>
        </section>
      </main>

      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid rgba(128, 128, 128, 0.15)",
          padding: "32px 24px",
          textAlign: "center",
          color: "#a1a1aa",
          fontSize: "14px",
        }}
      >
        React & Next.js Monorepo • Powered by Turborepo
      </footer>
    </div>
  );
}
