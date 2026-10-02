import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  Users,
  Code2,
  BookOpen,
  HelpCircle,
  Briefcase,
  Gamepad2,
  PartyPopper,
  Coffee,
  Lightbulb,
  Radio,
  ChevronDown,
  Layers,
  ArrowRight,
  Shield,
  CheckCircle2,
  Clock,
  Terminal,
  Volume2,
  Mic,
  SlidersHorizontal,
  Flame,
} from "lucide-react";
import {
  Button,
  Input,
  Badge,
  Avatar,
  Spinner,
  Modal,
  Dropdown,
  Card,
} from "./components/ui";
import { checkHealth } from "./api/client";

const modeFilters = [
  { id: "all", name: "All", count: 48, icon: Sparkles, variant: "default" },
  { id: "study", name: "Study", count: 12, icon: BookOpen, variant: "study" },
  { id: "dsa", name: "DSA & Code", count: 14, icon: Code2, variant: "dsa" },
  { id: "doubt", name: "Doubt Clear", count: 6, icon: HelpCircle, variant: "doubt" },
  { id: "interview", name: "Interview", count: 4, icon: Briefcase, variant: "interview" },
  { id: "gaming", name: "Gaming", count: 5, icon: Gamepad2, variant: "gaming" },
  { id: "party", name: "Party", count: 3, icon: PartyPopper, variant: "party" },
  { id: "chill", name: "Chill & Hangout", count: 8, icon: Coffee, variant: "chill" },
  { id: "brainstorm", name: "Brainstorm", count: 4, icon: Lightbulb, variant: "brainstorm" },
];

const mockRooms = [
  {
    id: "room-2",
    title: "Silent Deep Work & GATE CS Prep",
    mode: "study",
    modeLabel: "Study Mode",
    accentColor: "#2563eb",
    host: "Sneha Patel",
    participants: 14,
    capacity: 20,
    uptime: "45m",
    stageInfo: "Pomodoro: 38m remaining in Focus Block #2",
    description: "Camera optional, mic muted by default. Ambient library rain audio stream active.",
    speakers: ["Sneha Patel", "Aniket R.", "Tanvi K."],
  },
  {
    id: "room-3",
    title: "React 19 & Next.js Server Actions Q&A",
    mode: "doubt",
    modeLabel: "Doubt Clear",
    accentColor: "#d97706",
    host: "Vikram Malhotra",
    participants: 9,
    capacity: 15,
    uptime: "32m",
    stageInfo: "Queue: 3 doubts open, 1 currently discussing",
    description: "Queue up your hydration bugs, caching puzzles, or server actions code for group debug.",
    speakers: ["Vikram Malhotra", "Kunal D.", "Pooja V."],
  },
  {
    id: "room-4",
    title: "System Design Mock: Designing Uber Backend",
    mode: "interview",
    modeLabel: "Interview",
    accentColor: "#0d9488",
    host: "Karan Johar",
    participants: 5,
    capacity: 8,
    uptime: "18m",
    stageInfo: "Role: Interviewer & Candidate on active stage",
    description: "Excalidraw whiteboard shared. Observers can review rubric and submit constructive feedback.",
    speakers: ["Karan Johar", "Aditya S."],
  },
  {
    id: "room-5",
    title: "Valorant Competitive 5v5 Scrims & Callouts",
    mode: "gaming",
    modeLabel: "Gaming",
    accentColor: "#6366f1",
    host: "Sahil Rawat",
    participants: 4,
    capacity: 5,
    uptime: "55m",
    stageInfo: "Need: 1 Controller / Smokes player",
    description: "Diamond / Ascendant lobby. Low ping voice comms enabled via native WebRTC mesh.",
    speakers: ["Sahil Rawat", "Dev P.", "Varun G."],
  },
  {
    id: "room-6",
    title: "Late Night College Chill & Tech Rants",
    mode: "chill",
    modeLabel: "Chill & Hangout",
    accentColor: "#ca8a04",
    host: "Rohan Das",
    participants: 11,
    capacity: 25,
    uptime: "1h 10m",
    stageInfo: "Topic: AI tools vs junior engineer job market",
    description: "Casual hangout. Unmute whenever you feel like speaking or just listen in with lofi beats.",
    speakers: ["Rohan Das", "Alok B.", "Meera T."],
  },
  {
    id: "room-7",
    title: "Open Source AI Agent Framework Brainstorm",
    mode: "brainstorm",
    modeLabel: "Brainstorm",
    accentColor: "#0284c7",
    host: "Dr. Aakash Roy",
    participants: 6,
    capacity: 12,
    uptime: "27m",
    stageInfo: "Canvas: 14 sticky notes, voting active",
    description: "Architecting a lightweight agent runtime. Adding feature cards and voting on MVP scope.",
    speakers: ["Dr. Aakash Roy", "Simran C."],
  },
];

const mockFriends = [
  { name: "Arjun Mehta", room: "DSA Night Grind", mode: "dsa", avatar: "AM", isSpeaking: true },
  { name: "Priya Sharma", room: "React 19 Q&A", mode: "doubt", avatar: "PS", isSpeaking: false },
  { name: "Sneha Patel", room: "GATE CS Prep", mode: "study", avatar: "SP", isSpeaking: false },
];

export default function App() {
  const [selectedMode, setSelectedMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("DSA & Code");
  const [healthStatus, setHealthStatus] = useState({ loading: true, online: false });

  useEffect(() => {
    checkHealth()
      .then((res) => {
        setHealthStatus({
          loading: false,
          online: res.success && res.data.database.isConnected,
          data: res.data,
        });
      })
      .catch(() => {
        setHealthStatus({ loading: false, online: false });
      });
  }, []);

  const filteredRooms = mockRooms.filter((room) => {
    const matchesMode = selectedMode === "all" || room.mode === selectedMode;
    const matchesSearch =
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMode && matchesSearch;
  });

  const profileMenuItems = [
    { label: "My Profile", icon: Users, onClick: () => {} },
    { label: "My Created Rooms", icon: SlidersHorizontal, onClick: () => {} },
    { label: "Sign Out", danger: true, onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#111110] antialiased flex flex-col font-body selection:bg-[#e2dfd9]">
      <header className="fixed top-0 w-full z-40 bg-[#faf9f6] border-b border-[#e2dfd9]">
        <div className="w-full bg-[#f4f3f1] border-b border-[#e2dfd9] px-4 sm:px-8 py-1.5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs text-[#5f5e5a] font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
              <span className="font-bold text-[#111110]">1,420</span>
              <span>people collaborating in live rooms right now across 8 modes</span>
            </div>
            <div className="hidden sm:flex items-center gap-5 text-xs">
              <span className="flex items-center gap-1.5 text-[#5f5e5a]">
                <Radio className="w-3.5 h-3.5 text-[#777871]" /> Low Latency Audio Mesh
              </span>
              <span className="flex items-center gap-1.5 text-[#5f5e5a]">
                <Shield className="w-3.5 h-3.5 text-[#777871]" /> Safe by Default
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-0.5 rounded bg-white border border-[#e2dfd9]">
                <span className={`w-1.5 h-1.5 rounded-full ${healthStatus.online ? "bg-[#059669]" : "bg-[#ba1a1a]"}`} />
                API {healthStatus.online ? "Connected (MongoDB 200 OK)" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="h-16 w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-1.5 group select-none">
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#111110]">
                ROOMLY
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-4 ring-[#ffdad6]" />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("feed")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === "feed"
                    ? "bg-[#111110] text-white"
                    : "text-[#5f5e5a] hover:text-[#111110] hover:bg-[#f4f3f1]"
                }`}
              >
                Discover
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("showcase")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "showcase"
                    ? "bg-[#111110] text-white"
                    : "text-[#5f5e5a] hover:text-[#111110] hover:bg-[#f4f3f1]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>UI Primitives Catalog</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#ba1a1a] text-white">
                  Day 4
                </span>
              </button>
            </nav>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative flex items-center w-full">
              <Search className="w-4 h-4 text-[#777871] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search rooms, modes, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-12 rounded-lg bg-white border border-[#e2dfd9] text-sm text-[#111110] placeholder:text-[#777871] focus:outline-none focus:border-[#111110] transition-all"
              />
              <span className="absolute right-3 text-[11px] font-mono text-[#777871] bg-[#f4f3f1] px-1.5 py-0.5 rounded border border-[#e2dfd9]">
                ⌘K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              onClick={() => {
                setModalMode("DSA & Code");
                setIsModalOpen(true);
              }}
            >
              Start Room
            </Button>

            <button
              type="button"
              className="w-10 h-10 rounded-lg border border-[#e2dfd9] bg-white flex items-center justify-center text-[#5f5e5a] hover:text-[#111110] hover:bg-[#f4f3f1] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            <div className="h-6 w-px bg-[#e2dfd9] hidden sm:block" />

            <Dropdown
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg border border-[#e2dfd9] bg-white hover:bg-[#f4f3f1] transition-colors cursor-pointer"
                >
                  <Avatar name="Mukul Kumar" size="sm" isLive={true} />
                  <span className="text-xs font-semibold text-[#111110] hidden sm:inline">
                    Mukul
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#777871] hidden sm:inline" />
                </button>
              }
              items={profileMenuItems}
            />
          </div>
        </div>
      </header>

      <main className="w-full pt-28 pb-16 max-w-[1440px] mx-auto px-4 sm:px-8 flex-1 flex flex-col">
        {activeTab === "feed" ? (
          <div className="flex flex-col gap-8">
            <section className="pt-4 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9e8e5] text-[#464742] text-xs font-medium w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping" />
                  <span className="uppercase tracking-wider text-[11px] font-bold text-[#111110]">
                    Live Activity Mesh
                  </span>
                  <span className="text-[#777871]">/</span>
                  <span className="font-mono text-[#111110]">Asia South • 18ms</span>
                </div>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#111110] tracking-tight">
                  Good evening, Mukul. What do you want to do right now?
                </h1>
                <p className="text-base text-[#5f5e5a]">
                  People don't join a meeting; they join an activity. Pick a mode or launch your own room in seconds.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="flex flex-col text-right">
                  <span className="text-xs uppercase font-bold text-[#5f5e5a]">
                    Network Pulse
                  </span>
                  <span className="font-display font-bold text-xl text-[#111110]">
                    48 Active Hubs
                  </span>
                </div>
                <div className="h-10 w-px bg-[#e2dfd9] hidden sm:block" />
                <Button
                  variant="primary"
                  size="lg"
                  icon={Flame}
                  onClick={() => {
                    setModalMode("Instant Launch");
                    setIsModalOpen(true);
                  }}
                >
                  Instant Launch
                </Button>
              </div>
            </section>

            <div className="w-full pb-2 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                {modeFilters.map((mode) => {
                  const isSelected = selectedMode === mode.id;
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSelectedMode(mode.id)}
                      className={`h-9 px-4 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-[#111110] text-white border-[#111110] shadow-sm"
                          : "bg-white text-[#111110] border-[#e2dfd9] hover:bg-[#f4f3f1]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{mode.name}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-[#2f312f] text-white"
                            : "bg-[#efeeeb] text-[#5f5e5a]"
                        }`}
                      >
                        {mode.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white border border-[#e2dfd9] rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#059669]" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Badge variant="dsa" dot={true}>
                        DSA & Code
                      </Badge>
                      <Badge variant="live" dot={true}>
                        LIVE • 8/10 spots
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#5f5e5a] font-medium font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#777871]" />
                        <span>42m uptime</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#059669]">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Ultra-HD Voice</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h2 className="font-display font-extrabold text-2xl text-[#111110] hover:text-[#5f5e5a] transition-colors cursor-pointer">
                      Late-Night Binary Trees & Dynamic Programming Hard Grind
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-[#5f5e5a]">
                      <span className="font-bold text-[#111110] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                        Arjun Mehta
                      </span>
                      <span>•</span>
                      <span>ex-Uber Staff Eng</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-[#f4f3f1] font-mono text-[11px] text-[#111110]">
                        Rank #124 Global
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-[#f4f3f1] border border-[#e2dfd9] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#111110] text-white flex items-center justify-center shrink-0">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#5f5e5a] uppercase tracking-wider">
                          Current Problem Stage
                        </div>
                        <div className="text-sm font-bold text-[#111110]">
                          LC #124: Binary Tree Maximum Path Sum
                        </div>
                        <div className="text-xs text-[#5f5e5a] flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                          <span>Live compiler synced via Monaco WebAssembly</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white px-3 py-2 rounded-lg border border-[#e2dfd9] flex items-center gap-4 text-xs">
                      <div>
                        <div className="text-[10px] uppercase text-[#777871] font-semibold">Test Cases</div>
                        <div className="font-mono font-bold text-[#111110]">48/48 Passing</div>
                      </div>
                      <div className="w-px h-6 bg-[#e2dfd9]" />
                      <div>
                        <div className="text-[10px] uppercase text-[#777871] font-semibold">Complexity</div>
                        <div className="font-mono font-bold text-[#111110]">O(N) Space</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#e2dfd9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <Avatar name="Arjun Mehta" size="sm" isSpeaking={true} />
                      <Avatar name="Priya Sharma" size="sm" />
                      <Avatar name="Rohan Verma" size="sm" />
                      <Avatar name="Sneha Patel" size="sm" />
                    </div>
                    <span className="text-xs text-[#5f5e5a] font-medium">
                      +4 collaborative peers inside
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Mic}
                      onClick={() => {
                        setModalMode("Late-Night Binary Trees (Listen Only)");
                        setIsModalOpen(true);
                      }}
                    >
                      Listen First
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ArrowRight}
                      onClick={() => {
                        setModalMode("Late-Night Binary Trees");
                        setIsModalOpen(true);
                      }}
                    >
                      Join Room
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="bg-white border border-[#e2dfd9] rounded-xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase font-bold text-[#777871] tracking-wider">
                        Frictionless Setup
                      </span>
                      <Flame className="w-4 h-4 text-[#ba1a1a]" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#111110]">
                      Can't find your exact topic?
                    </h3>
                    <p className="text-xs text-[#5f5e5a]">
                      Spin up an ad-hoc room in 10 seconds. Select mode, invite squad, start speaking.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setModalMode("DSA Pair");
                        setIsModalOpen(true);
                      }}
                      className="h-9 px-2 rounded-lg bg-[#f4f3f1] hover:bg-[#efeeeb] text-[#111110] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#e2dfd9]"
                    >
                      <Code2 className="w-3.5 h-3.5 text-[#059669]" />
                      <span>DSA Pair</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalMode("Pomodoro Focus");
                        setIsModalOpen(true);
                      }}
                      className="h-9 px-2 rounded-lg bg-[#f4f3f1] hover:bg-[#efeeeb] text-[#111110] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#e2dfd9]"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>Pomodoro</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalMode("Mock Interview");
                        setIsModalOpen(true);
                      }}
                      className="h-9 px-2 rounded-lg bg-[#f4f3f1] hover:bg-[#efeeeb] text-[#111110] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#e2dfd9]"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#0d9488]" />
                      <span>Mock Interview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModalMode("Lofi Lounge");
                        setIsModalOpen(true);
                      }}
                      className="h-9 px-2 rounded-lg bg-[#f4f3f1] hover:bg-[#efeeeb] text-[#111110] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#e2dfd9]"
                    >
                      <Coffee className="w-3.5 h-3.5 text-[#ca8a04]" />
                      <span>Lofi Lounge</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setModalMode("Custom Room Configuration");
                      setIsModalOpen(true);
                    }}
                    className="w-full mt-4 h-10 rounded-lg bg-[#111110] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#2b2a27] transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Custom Room Configuration</span>
                  </button>
                </div>

                <div className="bg-white border border-[#e2dfd9] rounded-xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-[#111110]">
                      Friends Active
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#f4f3f1] text-[#111110] border border-[#e2dfd9]">
                      3 Online
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {mockFriends.map((friend, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-[#f4f3f1] border border-[#e2dfd9]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Avatar name={friend.name} size="sm" isSpeaking={friend.isSpeaking} />
                          <div>
                            <div className="text-xs font-bold text-[#111110]">{friend.name}</div>
                            <div className="text-[11px] text-[#5f5e5a]">{friend.room}</div>
                          </div>
                        </div>
                        <Badge variant={friend.mode} size="sm">
                          {friend.mode}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-[#111110]">
                    Live Now Radar
                  </h2>
                  <p className="text-xs text-[#5f5e5a]">
                    Active rooms ready to join right now without links or invites.
                  </p>
                </div>
                <Badge variant="live" dot={true}>
                  {filteredRooms.length} Live Sessions
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRooms.map((room) => (
                  <Card
                    key={room.id}
                    hoverEffect={true}
                    accentColor={room.accentColor}
                    className="flex flex-col justify-between h-full pt-6"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant={room.mode} dot={true}>
                          {room.modeLabel}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#5f5e5a]">
                          <Users className="w-3.5 h-3.5 text-[#777871]" />
                          <span>{room.participants}/{room.capacity}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h3 className="font-display font-bold text-base text-[#111110] line-clamp-2">
                          {room.title}
                        </h3>
                        <p className="text-xs text-[#5f5e5a] line-clamp-2">
                          {room.description}
                        </p>
                      </div>

                      {room.stageInfo && (
                        <div className="p-2.5 rounded-lg bg-[#f4f3f1] border border-[#e2dfd9] text-xs font-medium text-[#111110]">
                          {room.stageInfo}
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#e2dfd9] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          {room.speakers.map((speaker, index) => (
                            <Avatar
                              key={index}
                              name={speaker}
                              size="sm"
                              isSpeaking={index === 0}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#5f5e5a] truncate max-w-[90px]">
                          {room.host}
                        </span>
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setModalMode(room.title);
                          setIsModalOpen(true);
                        }}
                      >
                        Join Room
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Badge variant="live" dot={true}>
                Component Catalog
              </Badge>
              <h2 className="font-display font-extrabold text-3xl text-[#111110] tracking-tight">
                Warm Editorial UI Primitives
              </h2>
              <p className="text-sm text-[#5f5e5a]">
                Exact Stitch design tokens, zero-comment code, pure Tailwind CSS primitives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-[#111110]">Buttons</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="primary" isLoading={true}>Loading</Button>
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-[#111110]">Badges & Mode Chips</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="live" dot={true}>Live Now</Badge>
                  <Badge variant="study" dot={true}>Study Mode</Badge>
                  <Badge variant="dsa" dot={true}>DSA & Code</Badge>
                  <Badge variant="doubt" dot={true}>Doubt Clear</Badge>
                  <Badge variant="interview" dot={true}>Interview</Badge>
                  <Badge variant="gaming" dot={true}>Gaming</Badge>
                  <Badge variant="party" dot={true}>Party</Badge>
                  <Badge variant="chill" dot={true}>Chill & Hangout</Badge>
                  <Badge variant="brainstorm" dot={true}>Brainstorm</Badge>
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-[#111110]">Avatars & Squircles</h3>
                <div className="flex items-center gap-4">
                  <Avatar name="Mukul Kumar" size="xl" isLive={true} />
                  <Avatar name="Arjun Mehta" size="lg" isSpeaking={true} />
                  <Avatar name="Priya Sharma" size="md" />
                  <Avatar name="Sneha Patel" size="sm" />
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-[#111110]">Form Inputs</h3>
                <div className="flex flex-col gap-3">
                  <Input
                    label="Room Name"
                    placeholder="e.g. 2-Hour DSA Night Grind"
                    icon={Code2}
                  />
                  <Input
                    label="Room Capacity"
                    placeholder="Enter limit"
                    error="Capacity must be between 2 and 50 participants"
                  />
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-[#111110]">Loaders & Spinners</h3>
                <div className="flex items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-[#111110]">Interactive Modal Dialog</h3>
                <p className="text-xs text-[#5f5e5a]">
                  Accessible backdrop, escape key handler, clean header and action footer.
                </p>
                <div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setModalMode("Showcase Demo");
                      setIsModalOpen(true);
                    }}
                  >
                    Open Preview Modal
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[#e2dfd9] bg-[#faf9f6] py-6 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5f5e5a]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-[#111110]">ROOMLY</span>
            <span>—</span>
            <span>People don't join a meeting; they join an activity.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Stitch Editorial Theme</span>
            <span>•</span>
            <span className="font-mono">React + Vite + Tailwind</span>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Join ${modalMode}`}
        description="Connect with other students and developers collaborating in real-time."
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              onClick={() => setIsModalOpen(false)}
            >
              Enter Room
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="p-3.5 rounded-lg bg-[#f4f3f1] border border-[#e2dfd9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar name="Mukul Kumar" size="md" isSpeaking={true} />
              <div>
                <p className="text-xs font-bold text-[#111110]">Host Audio Ready</p>
                <p className="text-[11px] text-[#5f5e5a]">Mic & video optional by default</p>
              </div>
            </div>
            <Badge variant="live" dot={true}>Live Now</Badge>
          </div>

          <Input
            label="Your Display Name"
            placeholder="Mukul Kumar"
            defaultValue="Mukul Kumar"
          />
        </div>
      </Modal>
    </div>
  );
}
