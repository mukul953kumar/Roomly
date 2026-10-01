# ROOMLY (LiveTogether) — Development Rules & 50-Phase Roadmap

This file contains mandatory rules and the complete 50-phase engineering roadmap for every developer and AI coding agent working on **ROOMLY** (LiveTogether).

These rules apply to the entire project.

---

# 1. READ BEFORE CODING

Before making any code change:

1. Read `PRD.md`.
2. Read this `Rules.md`.
3. Inspect the existing project structure.
4. Inspect relevant existing code.
5. Understand the current implementation.
6. Never assume that a feature does not exist without checking the codebase.

Do not blindly generate new code.

---

# 2. PHASE-BY-PHASE DEVELOPMENT

NEVER build the entire application in one step.

Only implement the currently requested phase or feature from the **50-Phase Roadmap** below.

Correct process:

```text
PRD + Rules
 ↓
Current Phase
 ↓
Small Plan (Rule 42)
 ↓
Implementation
 ↓
Testing (Rule 32)
 ↓
Clean Code Review
 ↓
Git Commit (Rule 29 - Human Message)
 ↓
Git Push (Rule 28)
 ↓
Report (Rule 43)
 ↓
Next Phase
```

Do not implement future features without explicit instruction.

---

# 3. TECHNOLOGY RULE — MERN + REAL-TIME

The project MUST use:

* **Frontend**: React.js (Vite), React Router, Tailwind CSS, Lucide React (or standard icons)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Real-Time Communication**: Socket.io (signaling & room states), WebRTC (native browser APIs / Simple-Peer for peer-to-peer audio, video, and screen sharing)
* **Authentication**: JWT (JSON Web Tokens), bcryptjs, Google OAuth

Supporting technologies:

* Git & GitHub
* Cloudinary (for profile avatars and user uploads)

Do not replace MERN with another full-stack framework (e.g. do not switch to Next.js or Nest.js unless explicitly instructed).
Do not introduce unnecessary heavy dependencies.

---

# 4. KEEP THE CODE HUMAN-READABLE

This is one of the highest-priority rules.

Code must look like code written and maintained by a thoughtful human developer.

Avoid:

* Extremely compressed code
* One-letter variable names
* Giant functions (> 60-80 lines)
* Giant components (> 250 lines)
* Clever one-liners that reduce readability
* Unnecessary abstractions
* Obfuscated logic
* Generated code that nobody can explain
* Excessive nested ternaries
* Magic numbers and magic strings
* Duplicate business logic

Prefer:

```js
const activeRoomTitle = room.name;
const isHost = room.hostId.toString() === currentUserId.toString();
```

instead of unclear variables such as:

```js
const x = r.n;
const chk = r.h === u.id;
```

Use meaningful, intention-revealing names.

---

# 5. NO AI-GENERATED CODE SMELL

The code must NOT look like blindly generated AI code.

Avoid:

* Unused imports
* Unused functions or variables
* Repeated helper functions across files
* Random comments explaining obvious syntax
* Over-engineered architecture for simple operations
* Generic boilerplate everywhere
* Inconsistent naming conventions
* Inconsistent folder structures
* Huge files containing unrelated functionality
* Fake `TODO` comments left behind
* Placeholder implementations or mock functions left in production paths

Before finishing a feature, clean the implementation thoroughly.

---

# 6. COMMENTS

Comments should explain **WHY** something exists or non-obvious logic, not simply repeat **WHAT** the code does.

Bad:

```js
// Join room
joinRoom(roomId);
```

Good:

```js
// Transfer host privileges to the oldest active participant if the original host disconnects abruptly.
```

Do not fill the codebase with unnecessary comments.

---

# 7. COMPONENT ARCHITECTURE & SIZE

React components should remain focused and understandable.

If a component becomes unnecessarily large:

```text
LiveRoom.jsx
```

it should be split into meaningful, cohesive subcomponents:

```text
LiveRoomHeader.jsx
ActivityViewport.jsx
ParticipantStrip.jsx
RoomChat.jsx
RoomControls.jsx
```

Do not split tiny 5-line pieces into dozens of separate files without reason. Use practical judgment.

---

# 8. BACKEND ARCHITECTURE & BUSINESS LOGIC

Business logic must not be mixed haphazardly across routes.

Standard architecture:

```text
Routes
 ↓
Controllers
 ↓
Services / Socket Handlers
 ↓
Models
```

* **Routes**: Define endpoints and apply authentication/validation middleware.
* **Controllers**: Handle HTTP request validation, extract parameters, call services, and return standard JSON responses.
* **Socket Handlers**: Handle real-time WebRTC signaling, room join/leave events, and live chat.
* **Services**: Contain reusable business logic (e.g., room lifecycle, peer management, cleanup).
* **Models**: Define Mongoose schemas with validation and indexes.

---

# 9. DATABASE RULES

Use MongoDB with Mongoose.

Database models must:

* Have clear, descriptive names (`User`, `Room`, `Doubt`, `Problem`, `Report`, `Message`)
* Have appropriate schema validation and defaults
* Have `timestamps: true` where useful
* Avoid unnecessary data duplication
* Use indexes on frequently queried fields (`mode`, `status`, `hostId`, `createdAt`)
* Never store audio/video chunks or large binary files directly in MongoDB.

---

# 10. API RULES

API endpoints must be predictable, RESTful, and consistent:

```text
GET    /api/rooms            // List discoverable rooms (with query filters)
POST   /api/rooms            // Create a new room
GET    /api/rooms/:id        // Get specific room details
PATCH  /api/rooms/:id        // Update room settings (host only)
POST   /api/rooms/:id/end    // End room lifecycle (host or admin)
```

Use meaningful HTTP status codes:
* `200 OK` / `201 Created`
* `400 Bad Request`
* `401 Unauthorized` (not logged in)
* `403 Forbidden` (logged in, but insufficient permission)
* `404 Not Found`
* `409 Conflict`
* `500 Internal Server Error`

---

# 11. VALIDATION

Never trust client-side input.

Backend validation is mandatory for:

* Authentication credentials
* Room creation inputs (name, mode, capacity limits)
* User permissions (host vs participant actions)
* Chat message length and spam rate
* Object IDs and query parameters

Frontend validation improves user experience; backend validation ensures security.

---

# 12. ROLE-BASED AUTHORIZATION

Roles defined in PRD:

1. **Guest**: View public modes & limited rooms. Cannot join, create, or chat.
2. **Registered User**: Create/join rooms, chat, audio/video, report, follow.
3. **Room Host**: Room creator. Can mute participants, kick, block from room, end room, toggle screen share permissions.
4. **Moderator**: Review reports, suspend users, close abusive rooms.
5. **Admin**: Full platform control, manage modes, user bans, analytics.

Never rely solely on hiding buttons in the UI. Backend middleware must verify authorization for every protected action.

---

# 13. SECURITY & SECRETS

* Never commit `.env` or sensitive API keys.
* Keep server-only credentials (`JWT_SECRET`, `MONGODB_URI`, etc.) completely isolated from client bundles.
* Maintain `.env.example` with blank keys for all required environment variables.
* Sanitize all text input to prevent XSS in live chat and room descriptions.
* Apply rate limiting on authentication and room creation endpoints.

---

# 14. UI RULE — HUMAN-DESIGNED, NO GENERIC AI SAAS SMELL

The UI must NOT look AI-generated.

The design should feel:
* Focused, clean, and intuitive
* Activity-first (the current mode's workspace is central; video/audio is secondary infrastructure)
* Professional and comfortable for hours of use (both light mode and refined dark mode)

Strictly Avoid:
* Generic purple/cyan neon gradient buttons
* Glowing borders and overused glassmorphism
* Giant floating 3D spheres or AI robot vectors
* Excessive nested rounded cards with harsh drop shadows
* Flashy animations that distract from productivity and study

---

# 15. USER FRIENDLINESS & ACTION CLARITY

Every screen must answer immediately: **"What can I do here?"**

Buttons must have clear, explicit labels:
* Good: `Create DSA Room`, `Join Study Session`, `Ask Doubt`, `Mute Mic`, `Leave Room`
* Bad: `Continue`, `Boost`, `Magic`, `Explore Now` (when context is vague)

---

# 16. RESPONSIVE DESIGN

Every screen and live room interface must be fully functional on:
* Desktop
* Tablet
* Mobile

Desktop layout:
`[ Activity Viewport | Participant Strip/Video Grid | In-Room Chat ]`

Mobile layout:
`[ Activity Viewport ]` with bottom navigation or tabbed drawers for `[ Participants ]` and `[ Chat ]`. One-hand reachable audio/mic/leave controls.

---

# 17. ERROR, LOADING, AND EMPTY STATES

* **Loading States**: Skeletons or clear loading indicators during room fetching, room joining, and signaling.
* **Error States**: Helpful, human messages (e.g., *"This room has reached maximum capacity."* instead of generic `500 Server Error`).
* **Empty States**: Dynamic prompts (e.g., *"No DSA rooms are live right now. Be the first to start a DSA grind!"* with a direct `Create Room` button).

---

# 18. GIT COMMIT RULE — NATURAL HUMAN DEVELOPER MESSAGES ONLY

Commit messages must look like messages written by a thoughtful human developer, NOT robotic or automated AI-style prefixes.

**Strict Rule:** Do NOT use prefixes like `feat:`, `fix:`, `chore:`, `refactor:`, etc.
Keep messages plain, direct, and concise, describing exactly what was implemented or changed.

Good:
* `Set up Vite client and Express server scaffolding with Tailwind CSS`
* `Add user authentication with JWT and password hashing`
* `Implement Socket.io room join and leave signaling`
* `Create live study room layout with synchronized Pomodoro timer`
* `Add host moderation controls to mute and kick participants`

Bad:
* `feat: add auth`
* `fix(room): update socket logic`
* `chore: setup config`
* `update files`
* `commit 1`

---

# 19. GIT PUSH RULE — MANDATORY COMMIT & PUSH PER MILESTONE

Whenever any phase, milestone feature, or important set of files is completed:

1. Test and verify thoroughly.
2. Review changes to ensure clean, human-readable code without AI-smell.
3. Commit with a natural human developer message.
4. Push directly to GitHub (`git push`).

Do NOT hoard multiple phases before pushing.

---

# 20. TEST BEFORE COMMIT

At minimum, verify:
* Main happy path works as expected.
* Edge cases (invalid input, unauthorized access, full capacity).
* Loading and error states render correctly.
* No console errors or uncaught promise rejections.

---

# 21. BEFORE EVERY FEATURE (PLANNING TEMPLATE)

Before writing code for any phase, provide a short plan:

```text
Phase: [Phase Number & Name]
Goal: [Brief explanation of what will be achieved]
Files likely to change: [List of file paths]
Backend changes: [Endpoints, models, socket events]
Frontend changes: [Components, state, styles]
Testing: [Specific test scenarios]
```

---

# 22. AFTER EVERY FEATURE (REPORTING TEMPLATE)

After completing any phase, provide a concise report:

```text
Implemented:
- [Item 1]
- [Item 2]

Tested:
- [What was tested and verified]

Files changed:
- [List of modified / created files]

Git commit:
- [Natural commit message used]

Git push:
- Completed

Current Phase Status:
- Phase [X] finished, ready for Phase [X+1]
```

---

# 50-PHASE COMPLETE ROADMAP

This roadmap breaks down the entire ROOMLY platform into 50 sequential, production-ready development phases.

### Foundation & Core Infrastructure (Phases 1–6)
- [ ] **Phase 1: Project Scaffolding & Setup** — Set up `backend/` (Express, Node) and `frontend/` (React, Vite, Tailwind CSS), configure `.gitignore`, `package.json` scripts, and Tailwind base tokens.
- [ ] **Phase 2: Database Connection & Environment Architecture** — Configure MongoDB connection via Mongoose, centralized config loader, environment templates (`.env.example`), and server health check endpoint.
- [ ] **Phase 3: Centralized API Response & Error Handling Framework** — Build standardized API response utility (`ApiResponse`), custom error classes (`ApiError`), and global error handling middleware.
- [ ] **Phase 4: Design System & Core UI Components** — Create reusable human-designed UI components: Button, Input, Modal, Dropdown, Badge, Avatar, Card, and Loading Spinner.
- [ ] **Phase 5: WebSocket / Socket.io Server & Client Gateway** — Set up HTTP server with Socket.io on the backend and client-side Socket provider/service for connection management and reconnection.
- [ ] **Phase 6: WebRTC Signaling Foundation** — Implement peer-to-peer signaling events via Socket.io (`offer`, `answer`, `ice-candidate`, `peer-joined`, `peer-left`).

### Authentication, User Management & Onboarding (Phases 7–12)
- [ ] **Phase 7: User Schema & Password Hashing** — Build Mongoose `User` model with roles (`guest`, `user`, `moderator`, `admin`), interests, preferred modes, bio, avatar, and bcrypt password hashing.
- [ ] **Phase 8: Authentication Endpoints (JWT)** — Implement register, login, refresh token, logout, and `/api/auth/me` endpoints with JWT verification middleware.
- [ ] **Phase 9: Frontend Auth Flows & Context** — Build `AuthContext`, login page, register page, form validation, token storage, and protected route wrappers.
- [ ] **Phase 10: Google OAuth Integration** — Add Google OAuth backend verification and frontend Google Sign-In button flow.
- [ ] **Phase 11: 3-Step User Onboarding Flow** — Build post-registration onboarding modal: Step 1 (Interests picker), Step 2 ("What brings you to ROOMLY?"), Step 3 (Profile completion).
- [ ] **Phase 12: User Profile View & Edit** — Build profile page showing user details, interests, joined/hosted room stats, and profile editing with avatar selection.

### Room Architecture, Lifecycle & Discovery (Phases 13–18)
- [ ] **Phase 13: Room Data Model & Lifecycle Schema** — Create Mongoose `Room` model: name, mode (`study`, `dsa`, `doubt`, etc.), description, visibility (`public`, `private`, `invite-only`), capacity, host, active participants, and status (`waiting`, `live`, `ended`).
- [ ] **Phase 14: Room CRUD & Lifecycle APIs** — Build room creation, room details retrieval, update settings, and end-room API endpoints with host validation.
- [ ] **Phase 15: Discovery & Live Feed APIs** — Create `/api/rooms` discovery endpoint with mode filtering, search query by name/topic, active live sorting, and pagination.
- [ ] **Phase 16: Discovery & Home Screen Frontend** — Build Discover home page with personalized greeting, "What do you want to do?" mode selector chips, search bar, and Live Now room cards.
- [ ] **Phase 17: Room Creation Workflow & Modal** — Build multi-step Create Room dialog: Mode picker, room title, description, privacy toggle, capacity selector (2, 5, 10, 20, 50), and permission checkboxes.
- [ ] **Phase 18: Discovery Empty States & Quick Actions** — Implement intent-driven empty states (e.g. *"No DSA rooms live right now"*) with a 1-click *"Start the first room"* CTA.

### Live Room Core & Real-Time Engine (Phases 19–24)
- [ ] **Phase 19: Live Room Shell & Responsive Layout** — Build the core Live Room viewport: 3-pane desktop layout (Main Activity, Participant Strip, Chat) and responsive mobile tabbed layout.
- [ ] **Phase 20: Real-Time Room Presence & Lifecycle Sync** — Integrate socket room join/leave events, live participant list sync, host migration on disconnect, and empty-room auto-close timer.
- [ ] **Phase 21: Real-Time Audio Engine** — Implement WebRTC peer audio streams, mic toggle, audio level detection / active speaker highlighting, and deafen/mute states.
- [ ] **Phase 22: Video Communication Layer** — Implement optional camera streams, video tiles grid, camera toggle, video device selection, and avatar fallback when video is disabled.
- [ ] **Phase 23: Screen Sharing Infrastructure** — Implement screen share stream capture (`getDisplayMedia`), screen share spotlight layout, and host permission checks.
- [ ] **Phase 24: In-Room Real-Time Chat** — Implement in-room socket chat: text messages, emoji support, auto-scroll, system messages (user joined/left), and rate limiting.

### Mode 1: Study Mode (Phases 25–28)
- [ ] **Phase 25: Study Mode Layout & Environment** — Create Study Mode specific viewport focusing on concentration, quiet aesthetic, minimized video avatars, and focus stats.
- [ ] **Phase 26: Synchronized Pomodoro Focus Timer** — Build room-wide synchronized focus timer (25m / 50m / custom), Focus vs Break state transitions, and audio chimes.
- [ ] **Phase 27: Study Goals & Session Checklist** — Build session goal setting module: shared room goals, individual personal checklist, and progress indicators.
- [ ] **Phase 28: Ambient Sound & Focus Atmosphere** — Add optional ambient sound player (lo-fi beats, rain, library white noise) with individual volume controls.

### Mode 2: DSA / Coding Mode (Phases 29–33)
- [ ] **Phase 29: DSA Mode Workspace Shell** — Build split-pane layout for DSA mode: Problem statement viewer on left, collaborative code editor on right, bottom output panel.
- [ ] **Phase 30: DSA Problem Model & Problem Library** — Create Mongoose `Problem` schema and problem bank (title, difficulty, description, examples, test cases, constraints) with selector drawer.
- [ ] **Phase 31: In-Browser Code Editor Integration** — Integrate Monaco Editor or CodeMirror with syntax highlighting for C++, Java, Python, and JavaScript, plus theme options.
- [ ] **Phase 32: Real-Time Collaborative Code Synchronization** — Build socket-based code syncing engine supporting shared live coding or individual workspace switching.
- [ ] **Phase 33: Mock Code Runner & Test Case Evaluator** — Build test execution UI: run sample test cases, display console output, execution time, and pass/fail indicators.

### Mode 3: Doubt Discussion Mode (Phases 34–37)
- [ ] **Phase 34: Doubt Discussion Layout & Question Queue** — Build Doubt Mode layout featuring an organized question queue side panel and active doubt discussion stage.
- [ ] **Phase 35: Ask Doubt & Queue Management** — Implement "Ask Doubt" modal, question categorization, and status tracking (`Open`, `Discussing`, `Solved`).
- [ ] **Phase 36: Interactive Doubt Solving & Speaker Handoff** — Implement "Raise Hand" queue, host speaker promotion, spotlighted question display, and mark-as-solved workflows.
- [ ] **Phase 37: Doubt Notes & Solution Pinning** — Add shared markdown solution notes panel where key explanations and code snippets can be pinned and saved.

### Safety, Moderation & Host Controls (Phases 38–41)
- [ ] **Phase 38: Host In-Room Moderation Controls** — Implement host actions: mute participant mic, disable participant video/chat, kick participant, and room lock.
- [ ] **Phase 39: In-Room & User Reporting System** — Create `Report` model and frontend report modal (harassment, spam, inappropriate behavior) routing into moderation queue.
- [ ] **Phase 40: User Blocking System** — Implement block user API, blocking state persistence, and prevention of blocked users discovering or entering each other's rooms.
- [ ] **Phase 41: Admin Moderation Dashboard** — Build admin dashboard: review report queues, view room activity, suspend users, and terminate abusive rooms.

### Social System & Viral Discovery (Phases 42–45)
- [ ] **Phase 42: Follow System & Social Graph** — Implement user follow/unfollow API, follower/following lists, and user profile social stats.
- [ ] **Phase 43: Scheduled Rooms & Calendar Reminders** — Build future room scheduling: set date/time, display in "Starting Soon" section, and "Remind Me" bookmarking.
- [ ] **Phase 44: Room Sharing & Viral Social Previews** — Generate unique shareable links with dynamic OpenGraph meta previews showing live participant counts and mode badges.
- [ ] **Phase 45: Notification Center** — Build real-time and persistent notification system: followed host started room, scheduled room starting soon, room invitations.

### Mode Expansion & Additional Modes (Phases 46–47)
- [ ] **Phase 46: Interview Practice Mode** — Build Interview Mode: interviewer/candidate/observer role assignment, timer, question prompt bank, private feedback notes.
- [ ] **Phase 47: Chill & Casual Voice Room Mode** — Build Chill/Gossip Mode: audio-first stage with enlarged participant avatars, topic header, and reaction animations.

### AI Assistance, Summaries & Polish (Phases 48–50)
- [ ] **Phase 48: Session Summary Generator** — Build automated post-room summary view: duration, participants, problems solved, doubts answered, and download/share notes.
- [ ] **Phase 49: Cost-Controlled AI Assistant Integration** — Add optional on-demand AI assistance: DSA hint generator (no full solution spoilers), study session summarizer, and doubt explainer.
- [ ] **Phase 50: Production Optimization, Security Hardening & Deployment** — Conduct security audit (Helmet, rate limits, CORS), bundle optimization, responsive QA pass, Docker/hosting configuration, and final smoke test.
