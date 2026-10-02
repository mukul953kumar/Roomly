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
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ArrowRight,
  Shield,
  CheckCircle2,
  Activity,
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
    id: "room-1",
    title: "DSA Night Grind: LeetCode Hard Trees & Graphs",
    mode: "dsa",
    modeLabel: "DSA & Code",
    host: "Arjun Verma",
    participants: 7,
    capacity: 10,
    uptime: "1h 24m",
    difficulty: "Hard",
    description: "Collaborative problem solving on binary lifting and LCA. Shared editor open.",
    speakers: ["Arjun Verma", "Priya S.", "Rohan M."],
  },
  {
    id: "room-2",
    title: "Silent Deep Work & Gate CS Prep",
    mode: "study",
    modeLabel: "Study Mode",
    host: "Sneha Patel",
    participants: 14,
    capacity: 20,
    uptime: "45m",
    difficulty: "Silent",
    description: "50/10 Pomodoro session running. Microphones muted, ambient rain audio enabled.",
    speakers: ["Sneha Patel"],
  },
  {
    id: "room-3",
    title: "React 19 & Next.js App Router Architecture Q&A",
    mode: "doubt",
    modeLabel: "Doubt Clear",
    host: "Vikram Malhotra",
    participants: 9,
    capacity: 15,
    uptime: "32m",
    difficulty: "All Levels",
    description: "Doubt queue active. Bring your Server Actions, hydration bugs, and suspense queries.",
    speakers: ["Vikram Malhotra", "Ananya D."],
  },
  {
    id: "room-4",
    title: "System Design Mock: Designing Uber Backend",
    mode: "interview",
    modeLabel: "Interview",
    host: "Karan Johar",
    participants: 4,
    capacity: 6,
    uptime: "18m",
    difficulty: "Senior Mock",
    description: "Interviewer and candidate active on canvas. Observers welcome to take notes.",
    speakers: ["Karan Johar", "Rahul K."],
  },
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
    { label: "Settings", icon: SlidersHorizontal, onClick: () => {} },
    { label: "Sign Out", danger: true, onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col font-body selection:bg-secondary-container">
      <header className="fixed top-0 w-full z-40 bg-surface border-b border-secondary-container">
        <div className="w-full bg-surface-container-low border-b border-secondary-container px-4 sm:px-8 py-1.5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs text-on-surface-variant font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              <span className="font-semibold text-on-surface">1,420</span>
              <span>people collaborating live across 8 modes</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-secondary">
                <Radio className="w-3.5 h-3.5 text-outline" /> Low Latency WebRTC Mesh
              </span>
              <span className="flex items-center gap-1.5 text-secondary">
                <Shield className="w-3.5 h-3.5 text-outline" /> Safe by Default
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-secondary-container">
                <span className={`w-1.5 h-1.5 rounded-full ${healthStatus.online ? "bg-mode-dsa" : "bg-error"}`} />
                API {healthStatus.online ? "Connected" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        <div className="h-16 w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-1.5 group select-none">
              <span className="font-display font-extrabold text-2xl tracking-tight text-primary">
                ROOMLY
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-error ring-4 ring-error-container" />
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("feed")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === "feed"
                    ? "bg-primary text-on-primary"
                    : "text-secondary hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                Discover
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("showcase")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "showcase"
                    ? "bg-primary text-on-primary"
                    : "text-secondary hover:text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>UI Components Showcase</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-error text-on-error">
                  Day 4
                </span>
              </button>
            </nav>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <Input
              icon={Search}
              placeholder="Search rooms, modes, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
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
              className="w-9 h-9 rounded-lg border border-secondary-container bg-surface-container-lowest flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>

            <div className="h-5 w-px bg-secondary-container hidden sm:block" />

            <Dropdown
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-lg border border-secondary-container bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer"
                >
                  <Avatar name="Mukul Kumar" size="sm" isLive={true} />
                  <span className="text-xs font-semibold text-on-surface hidden sm:inline">
                    Mukul
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-outline hidden sm:inline" />
                </button>
              }
              items={profileMenuItems}
            />
          </div>
        </div>
      </header>

      <main className="w-full pt-28 pb-16 max-w-[1440px] mx-auto px-4 sm:px-8 flex-1 flex flex-col">
        {activeTab === "feed" ? (
          <div className="flex flex-col gap-6">
            <section className="pt-4 pb-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-secondary text-xs font-medium w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
                  <span className="uppercase tracking-wider text-[11px] font-semibold text-on-surface">
                    Live Activity Mesh
                  </span>
                  <span className="text-outline">/</span>
                  <span className="font-mono text-on-surface">Asia South • 18ms</span>
                </div>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                  Good evening, Mukul. What do you want to do right now?
                </h1>
                <p className="text-base text-secondary">
                  People don't join a meeting; they join an activity. Pick a mode or start your own room in seconds.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="flex flex-col text-right">
                  <span className="text-xs uppercase font-semibold text-secondary">
                    Network Pulse
                  </span>
                  <span className="font-display font-bold text-lg text-primary">
                    48 Active Rooms
                  </span>
                </div>
                <div className="h-9 w-px bg-secondary-container hidden sm:block" />
                <Button
                  variant="primary"
                  size="md"
                  icon={Plus}
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
                      className={`h-9 px-3.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-primary text-on-primary border-primary shadow-subtle"
                          : "bg-surface-container-lowest text-on-surface border-secondary-container hover:bg-surface-container-low"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{mode.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-primary-container text-on-primary"
                            : "bg-surface-container text-secondary"
                        }`}
                      >
                        {mode.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRooms.map((room) => (
                <Card key={room.id} hoverEffect={true} className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={room.mode} dot={true}>
                        {room.modeLabel}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-secondary">
                        <Users className="w-3.5 h-3.5 text-outline" />
                        <span>{room.participants}/{room.capacity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="font-display font-bold text-base text-primary line-clamp-2">
                        {room.title}
                      </h3>
                      <p className="text-xs text-secondary line-clamp-2">
                        {room.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-secondary-container flex items-center justify-between">
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
                      <span className="text-xs text-secondary truncate max-w-[100px]">
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

            {filteredRooms.length === 0 && (
              <div className="p-12 text-center flex flex-col items-center justify-center rounded-xl bg-surface-container-lowest border border-secondary-container">
                <span className="text-3xl mb-2">🔍</span>
                <h3 className="font-display font-bold text-lg text-primary mb-1">
                  No rooms matching your search
                </h3>
                <p className="text-sm text-secondary mb-4">
                  Be the first one to create a room for this activity!
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={() => {
                    setModalMode("Custom Room");
                    setIsModalOpen(true);
                  }}
                >
                  Create Room
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Badge variant="live" dot={true}>
                Component Catalog
              </Badge>
              <h2 className="font-display font-extrabold text-3xl text-primary tracking-tight">
                Warm Editorial UI Primitives
              </h2>
              <p className="text-sm text-secondary">
                Exact Stitch design tokens, zero-comment code, pure Tailwind CSS primitives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-primary">Buttons</h3>
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
                <h3 className="font-display font-bold text-base text-primary">Badges & Mode Chips</h3>
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
                <h3 className="font-display font-bold text-base text-primary">Avatars & Squircles</h3>
                <div className="flex items-center gap-4">
                  <Avatar name="Mukul Kumar" size="xl" isLive={true} />
                  <Avatar name="Arjun Verma" size="lg" isSpeaking={true} />
                  <Avatar name="Priya Sharma" size="md" />
                  <Avatar name="Sneha Patel" size="sm" />
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-primary">Form Inputs</h3>
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
                <h3 className="font-display font-bold text-base text-primary">Loaders & Spinners</h3>
                <div className="flex items-center gap-6">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </div>
              </Card>

              <Card className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-base text-primary">Interactive Modal Dialog</h3>
                <p className="text-xs text-secondary">
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

      <footer className="border-t border-secondary-container bg-surface py-6 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-primary">ROOMLY</span>
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
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-secondary-container flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar name="Mukul Kumar" size="md" isSpeaking={true} />
              <div>
                <p className="text-xs font-bold text-primary">Host Audio Ready</p>
                <p className="text-[11px] text-secondary">Mic & video optional by default</p>
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
