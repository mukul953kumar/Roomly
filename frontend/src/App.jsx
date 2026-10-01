import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Code2, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from "lucide-react";

export default function App() {
  const [backendStatus, setBackendStatus] = useState({ loading: true, online: false });

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setBackendStatus({ loading: false, online: true, uptime: data.uptimeSeconds });
        } else {
          setBackendStatus({ loading: false, online: false });
        }
      })
      .catch(() => {
        setBackendStatus({ loading: false, online: false });
      });
  }, []);

  const coreModes = [
    {
      name: "Study Mode",
      icon: BookOpen,
      tag: "Focus",
      desc: "Synchronized Pomodoro timer, ambient sounds, and group accountability.",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      name: "DSA / Coding",
      icon: Code2,
      tag: "Practice",
      desc: "Curated problem bank, collaborative code editor, and live execution.",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      name: "Doubt Discussion",
      icon: HelpCircle,
      tag: "Collaborate",
      desc: "Queue up technical questions, raise hand to speak, and pin solutions.",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              R
            </div>
            <div>
              <span className="font-bold tracking-tight text-slate-900 text-lg">ROOMLY</span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                Phase 1 Scaffolding
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Backend Connectivity Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <span
                className={`h-2 w-2 rounded-full ${
                  backendStatus.loading
                    ? "bg-amber-400 animate-pulse"
                    : backendStatus.online
                    ? "bg-emerald-500"
                    : "bg-rose-500"
                }`}
              />
              <span className="text-slate-600">
                {backendStatus.loading
                  ? "Checking Backend..."
                  : backendStatus.online
                  ? "API Online"
                  : "API Offline"}
              </span>
            </div>

            <button className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center">
        {/* Intent Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
          <Compass className="h-3.5 w-3.5" />
          <span>Intent-Driven Social & Collaboration Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight text-center max-w-3xl leading-[1.15]">
          People don't join a meeting. <br />
          <span className="text-brand-600">They join an activity.</span>
        </h1>

        <p className="mt-5 text-lg text-slate-600 text-center max-w-2xl">
          Choose what you want to do, find like-minded people already doing it, and collaborate in real-time rooms built specifically for that activity.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition-all hover:gap-3">
            <span>Explore Live Rooms</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-xl border border-slate-200 transition-colors shadow-xs">
            <Users className="h-4 w-4 text-slate-500" />
            <span>Create a Room</span>
          </button>
        </div>

        {/* Activity Modes Cards */}
        <div className="w-full mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Activity Modes</h2>
              <p className="text-sm text-slate-500">Every mode is built with activity-specific workspace tools</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white px-3 py-1 rounded-md border border-slate-200">
              MVP Launch Modes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {coreModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div
                  key={mode.name}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${mode.badgeColor}`}>
                        {mode.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{mode.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{mode.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Live Ready</span>
                    <span className="text-brand-600 hover:text-brand-700 font-semibold cursor-pointer">
                      Preview Workspace &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture Principles Grid */}
        <div className="w-full mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-200">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Real-Time First</h4>
              <p className="text-xs text-slate-500 mt-1">Socket.io signaling + WebRTC peer connections with instant state synchronization.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Activity Centered</h4>
              <p className="text-xs text-slate-500 mt-1">Audio and video are secondary infrastructure. The activity workspace comes first.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Human Designed</h4>
              <p className="text-xs text-slate-500 mt-1">Clean, distraction-free interfaces crafted for hours of comfortable focus and collaboration.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Roomly. Mode-based social & collaboration platform.</p>
          <div className="flex items-center gap-6">
            <span>50-Day Roadmap</span>
            <span className="font-medium text-slate-700">Day 1: Project Scaffolding Complete</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
