"use client";

import { useState } from "react";
import { Navbar } from "@repo/ui/navbar";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "settings">("overview");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <Navbar currentApp="app" title="Acme Inc. Dashboard" />

      <div style={{ display: "flex", flex: 1, maxWidth: "1300px", margin: "0 auto", width: "100%" }}>
        {/* App Sidebar */}
        <aside
          style={{
            width: "240px",
            borderRight: "1px solid rgba(128, 128, 128, 0.15)",
            padding: "32px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#71717a", textTransform: "uppercase", paddingLeft: "12px", marginBottom: "8px" }}>
            Workspace App
          </div>

          <button
            onClick={() => setActiveTab("overview")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: activeTab === "overview" ? "rgba(0, 112, 243, 0.15)" : "transparent",
              color: activeTab === "overview" ? "#0070f3" : "#d4d4d8",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            📊 Overview
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: activeTab === "analytics" ? "rgba(0, 112, 243, 0.15)" : "transparent",
              color: activeTab === "analytics" ? "#0070f3" : "#d4d4d8",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            📈 Analytics
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: activeTab === "settings" ? "rgba(0, 112, 243, 0.15)" : "transparent",
              color: activeTab === "settings" ? "#0070f3" : "#d4d4d8",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            ⚙️ Settings
          </button>

          <div style={{ marginTop: "auto", borderTop: "1px solid rgba(128, 128, 128, 0.15)", paddingTop: "16px" }}>
            <a
              href="/"
              style={{
                display: "block",
                padding: "8px 12px",
                fontSize: "13px",
                color: "#a1a1aa",
                textDecoration: "none",
              }}
            >
              ← Return to Web
            </a>
          </div>
        </aside>

        {/* Dashboard Main View */}
        <main style={{ flex: 1, padding: "32px 40px" }}>
          {/* Top Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>Application Console</h1>
              <p style={{ color: "#a1a1aa", fontSize: "14px", margin: "4px 0 0 0" }}>
                Active workspace: <code>apps/app</code> • Running on port 3001
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <Badge variant="green">Turborepo Live</Badge>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => alert("Simulating data refresh in apps/app...")}
              >
                Refresh Data
              </Button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <Card title="Monthly Active Users" badge="+14.2%">
              <div style={{ fontSize: "2rem", fontWeight: 700, margin: "8px 0" }}>24,892</div>
              <p style={{ margin: 0, fontSize: "12px", color: "#10b981" }}>↑ 1,230 new this week</p>
            </Card>

            <Card title="Turbo Cache Hit Rate" badge="Turborepo">
              <div style={{ fontSize: "2rem", fontWeight: 700, margin: "8px 0", color: "#0070f3" }}>94.8%</div>
              <p style={{ margin: 0, fontSize: "12px", color: "#a1a1aa" }}>Average build: 1.2s</p>
            </Card>

            <Card title="Workspace Packages" badge="Local">
              <div style={{ fontSize: "2rem", fontWeight: 700, margin: "8px 0" }}>5</div>
              <p style={{ margin: 0, fontSize: "12px", color: "#a1a1aa" }}>2 apps, 3 packages</p>
            </Card>

            <Card title="API Health Status" badge="Online">
              <div style={{ fontSize: "2rem", fontWeight: 700, margin: "8px 0", color: "#10b981" }}>99.99%</div>
              <p style={{ margin: 0, fontSize: "12px", color: "#a1a1aa" }}>0 incidents in 30 days</p>
            </Card>
          </div>

          {/* Tab Specific Content */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <Card
                title="Shared Monorepo Integration"
                badge="Connected"
                description="This application imports styles, UI primitives, and TypeScript configurations across the workspace without external npm publishing."
              >
                <div style={{ marginTop: "16px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Button
                    variant="primary"
                    onClick={() => alert("Action triggered from within apps/app!")}
                  >
                    Trigger App Action
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => alert("Shared @repo/ui Button component working seamlessly!")}
                  >
                    Test Shared Component
                  </Button>
                </div>
              </Card>

              <Card title="Recent Activity" badge="Live Log">
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(128,128,128,0.1)", paddingBottom: "8px" }}>
                    <span>🔄 Next.js Fast Refresh applied</span>
                    <span style={{ color: "#71717a" }}>Just now</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(128,128,128,0.1)", paddingBottom: "8px" }}>
                    <span>📦 Workspace package <code>@repo/ui</code> loaded</span>
                    <span style={{ color: "#71717a" }}>2m ago</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>⚡ Turborepo pipeline initialized</span>
                    <span style={{ color: "#71717a" }}>5m ago</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "analytics" && (
            <Card title="Application Analytics" badge="Real-time">
              <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
                Traffic metrics split by workspace application:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span>apps/web (Marketing & Landing)</span>
                    <span>72%</span>
                  </div>
                  <div style={{ height: "8px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{ width: "72%", height: "100%", backgroundColor: "#0070f3" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span>apps/app (Dashboard & Portal)</span>
                    <span>28%</span>
                  </div>
                  <div style={{ height: "8px", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
                    <div style={{ width: "28%", height: "100%", backgroundColor: "#8b5cf6" }} />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card title="App Configuration" badge="Preferences">
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>Notification Alerts</div>
                    <div style={{ color: "#a1a1aa", fontSize: "12px" }}>Receive system updates and build notices</div>
                  </div>
                  <Button
                    size="sm"
                    variant={notificationsEnabled ? "primary" : "outline"}
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    {notificationsEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
