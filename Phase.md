# ROOMLY (LiveTogether) — 50-Day Engineering Roadmap

This document serves as the master daily tracking board for building **ROOMLY** across **50 structured days** (1 Phase = 1 Day).

Every day follows the strict process:
`Daily Plan → Implementation → Testing → Git Commit (Natural Human Message) → Git Push → Check off the box`

---

## Progress Overview
- **Total Days**: 50
- **Completed**: 0 / 50
- **Current Status**: Ready to begin Day 1

---

## Week 1: Foundation, Real-Time Signaling & User Models (Days 1–7)

- [ ] **Day 1 — Phase 1: Project Scaffolding & Setup**
  * **Goal**: Establish the base monorepo structure for `backend` and `frontend`.
  * **Backend**: Express.js server initialization, basic folder structure (`src/controllers`, `routes`, `models`, `config`), root script runner.
  * **Frontend**: Vite + React app setup, Tailwind CSS configuration, Lucide React icons, base router placeholder.
  * **Deliverable**: Both servers start independently via `npm run dev`.
  * **Commit Target**: `Set up backend Express and frontend Vite React scaffolding with Tailwind CSS`

- [ ] **Day 2 — Phase 2: Database Connection & Environment Architecture**
  * **Goal**: Connect backend to MongoDB and establish environment safety.
  * **Backend**: Mongoose connection utility with reconnect logic, centralized `config.js`, `.env.example` setup, `/api/health` endpoint.
  * **Verification**: Verify MongoDB connects on startup and `/api/health` returns status `200 OK`.
  * **Commit Target**: `Configure MongoDB connection and environment variable loader`

- [ ] **Day 3 — Phase 3: Centralized API Response & Error Handling Framework**
  * **Goal**: Build bulletproof, predictable error and response utilities.
  * **Backend**: `ApiResponse` wrapper, custom `ApiError` class, global asynchronous error handler middleware (`errorHandler.js`).
  * **Frontend**: Axios/Fetch client instance with base URL, timeout, and response interceptor.
  * **Commit Target**: `Implement centralized API response and error handling middleware`

- [ ] **Day 4 — Phase 4: Design System & Core UI Components**
  * **Goal**: Implement human-designed, accessible foundational UI primitives.
  * **Frontend**: Create `Button`, `Input`, `Modal`, `Dropdown`, `Badge`, `Avatar`, and `Spinner` components with Tailwind CSS.
  * **Verification**: Test components in a component preview route or showcase.
  * **Commit Target**: `Create foundational UI components and design system tokens`

- [ ] **Day 5 — Phase 5: WebSocket / Socket.io Server & Client Gateway**
  * **Goal**: Enable bidirectional real-time communication between client and server.
  * **Backend**: Attach Socket.io to Express HTTP server, connection/disconnection logs, basic ping-pong test.
  * **Frontend**: `SocketContext` and `socketService.js` for automatic connection, room event handlers, and reconnection handling.
  * **Commit Target**: `Set up Socket.io server and client connection service`

- [ ] **Day 6 — Phase 6: WebRTC Signaling Foundation**
  * **Goal**: Build peer-to-peer WebRTC signaling protocol over Socket.io.
  * **Backend**: Socket event listeners for `join-signal-room`, `signal-offer`, `signal-answer`, `ice-candidate`, `peer-disconnect`.
  * **Frontend**: WebRTC helper class / hooks managing `RTCPeerConnection`, local media streams, and remote stream state.
  * **Commit Target**: `Implement WebRTC signaling events and peer connection manager`

- [ ] **Day 7 — Phase 7: User Schema & Password Hashing**
  * **Goal**: Create Mongoose User model with role validation and secure password encryption.
  * **Backend**: `User` model (name, username, email, passwordHash, avatar, role [`guest`, `user`, `moderator`, `admin`], interests, preferredModes). Pre-save bcrypt hashing and password comparison method.
  * **Commit Target**: `Create User schema with bcrypt password hashing and role validation`

---

## Week 2: Authentication, Onboarding & User Profiles (Days 8–14)

- [ ] **Day 8 — Phase 8: Authentication Endpoints (JWT)**
  * **Goal**: Implement secure registration, login, refresh token, and user session verification.
  * **Backend**: Endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`. JWT signing and `verifyToken` middleware.
  * **Commit Target**: `Add JWT authentication endpoints and route protection middleware`

- [ ] **Day 9 — Phase 9: Frontend Auth Flows & Context**
  * **Goal**: Provide login and registration user interfaces with state management.
  * **Frontend**: `AuthContext`, Login page, Register page, validation helpers, token persistence in secure cookies/localStorage, and `ProtectedRoute` wrapper.
  * **Commit Target**: `Create frontend authentication pages and user session context`

- [ ] **Day 10 — Phase 10: Google OAuth Integration**
  * **Goal**: Implement 1-click Google Sign-In for frictionless student onboarding.
  * **Backend**: Google token verification endpoint (`POST /api/auth/google`), auto-account creation for new Google users.
  * **Frontend**: Google OAuth button integration and authentication callback handler.
  * **Commit Target**: `Integrate Google OAuth sign in for seamless registration`

- [ ] **Day 11 — Phase 11: 3-Step User Onboarding Flow**
  * **Goal**: Build intent-first onboarding immediately following user registration.
  * **Frontend**: 3-step modal/wizard: Step 1 (Interests: Study, DSA, Coding, Gaming, etc.), Step 2 ("What brings you here?"), Step 3 (Avatar/Bio).
  * **Backend**: `PATCH /api/users/onboarding` endpoint to save user preferences.
  * **Commit Target**: `Implement 3-step user onboarding flow with interest selection`

- [ ] **Day 12 — Phase 12: User Profile View & Edit**
  * **Goal**: User profile screen showing stats, bio, and customizable settings.
  * **Backend**: `GET /api/users/:username`, `PATCH /api/users/profile`.
  * **Frontend**: Profile screen displaying activity badges, hosted sessions, followers count, and edit profile dialog.
  * **Commit Target**: `Build user profile view and settings update interface`

- [ ] **Day 13 — Phase 13: Room Data Model & Lifecycle Schema**
  * **Goal**: Model room metadata, lifecycle states, and participant tracking.
  * **Backend**: `Room` model: name, mode (`study`, `dsa`, `doubt`, etc.), description, visibility (`public`, `private`, `invite-only`), capacity (2-100), hostId, activeParticipants array, status (`waiting`, `live`, `ended`), permissions.
  * **Commit Target**: `Create Room schema with mode support and lifecycle tracking`

- [ ] **Day 14 — Phase 14: Room CRUD & Lifecycle APIs**
  * **Goal**: Endpoints to create, update, retrieve, and terminate rooms.
  * **Backend**: `POST /api/rooms` (create), `GET /api/rooms/:id`, `PATCH /api/rooms/:id` (host only), `POST /api/rooms/:id/end` (host or admin).
  * **Commit Target**: `Add room creation and host lifecycle management endpoints`

---

## Week 3: Discovery Feed, Room Creation & Core Live Shell (Days 15–21)

- [ ] **Day 15 — Phase 15: Discovery & Live Feed APIs**
  * **Goal**: Build high-performance room discovery queries with filtering.
  * **Backend**: `GET /api/rooms` with filters: `mode`, `search`, `status=live`, pagination, and user interest matching.
  * **Commit Target**: `Implement room discovery API with search and mode filtering`

- [ ] **Day 16 — Phase 16: Discovery & Home Screen Frontend**
  * **Goal**: Primary entry screen where users find live rooms matching their intent.
  * **Frontend**: Header with greeting, "What do you want to do?" mode selector chips, live room grid with capacity badges and host avatars, search input.
  * **Commit Target**: `Build discovery home page with mode chips and live room cards`

- [ ] **Day 17 — Phase 17: Room Creation Workflow & Modal**
  * **Goal**: Intuitive dialog enabling any user to launch an activity room in seconds.
  * **Frontend**: Create Room modal with mode picker, title, description, capacity selector, privacy settings, and instant redirect to the live room.
  * **Commit Target**: `Create room creation modal with mode selection and capacity settings`

- [ ] **Day 18 — Phase 18: Discovery Empty States & Quick Actions**
  * **Goal**: Never leave users stuck when no rooms exist for a selected mode.
  * **Frontend**: Intent-specific empty states (e.g. *"No DSA rooms live right now. Be the first to start a DSA grind!"*) with a pre-filled 1-click CTA.
  * **Commit Target**: `Add dynamic empty states with quick room creation prompts`

- [ ] **Day 19 — Phase 19: Live Room Shell & Responsive Layout**
  * **Goal**: Build the primary live room viewport structure.
  * **Frontend**: Desktop 3-pane layout (`[Activity Area | Participant Strip | In-Room Chat]`) and responsive mobile tabbed navigation.
  * **Commit Target**: `Build responsive live room shell and adaptive layout viewport`

- [ ] **Day 20 — Phase 20: Real-Time Room Presence & Lifecycle Sync**
  * **Goal**: Maintain instant presence synchronization when participants join or leave.
  * **Backend & Sockets**: Handle `room:join`, `room:leave`, socket disconnect, participant count broadcasts, and host migration on sudden disconnect.
  * **Frontend**: Live participant list updates, join/leave toasts, automatic redirect if host ends room.
  * **Commit Target**: `Implement real-time room presence and participant synchronization`

- [ ] **Day 21 — Phase 21: Real-Time Audio Engine (WebRTC)**
  * **Goal**: Peer-to-peer audio communication with low latency.
  * **Frontend**: Audio stream acquisition (`getUserMedia`), microphone toggle, speaking indicator ring around avatars, audio device selector.
  * **Commit Target**: `Integrate WebRTC voice communication and speaking indicators`

---

## Week 4: Video, Screen Share, Chat & Study Mode (Days 22–28)

- [ ] **Day 22 — Phase 22: Video Communication Layer**
  * **Goal**: Optional video streams for participants who want camera presence.
  * **Frontend**: Video track toggle, video tile grid, automatic aspect ratio adjustment, camera selection, and avatar fallback when camera is off.
  * **Commit Target**: `Add optional video streaming grid and camera toggle controls`

- [ ] **Day 23 — Phase 23: Screen Sharing Infrastructure**
  * **Goal**: Screen sharing capability for notes, problems, and presentations.
  * **Frontend & WebRTC**: Screen stream capture (`getDisplayMedia`), presenter spotlight mode, host toggle for screen share permissions.
  * **Commit Target**: `Implement screen sharing stream capture and presenter spotlight`

- [ ] **Day 24 — Phase 24: In-Room Real-Time Chat**
  * **Goal**: Real-time room text chat for quick communication and links.
  * **Backend & Sockets**: `chat:message` event routing, message rate limiting, in-memory room message history.
  * **Frontend**: Chat pane, auto-scroll to bottom, timestamp, emoji support, system notifications.
  * **Commit Target**: `Build real-time in-room chat with emoji support and rate limits`

- [ ] **Day 25 — Phase 25: Study Mode Layout & Environment**
  * **Goal**: Dedicated focused environment tailored specifically for studying.
  * **Frontend**: Minimalist study viewport, distraction-free visual theme, large central focus module, compact participant strip.
  * **Commit Target**: `Create dedicated Study Mode workspace and distraction-free layout`

- [ ] **Day 26 — Phase 26: Synchronized Pomodoro Focus Timer**
  * **Goal**: Room-wide synchronized timer keeping everyone on the same study cycle.
  * **Backend & Sockets**: Synchronized timer state (`focus`, `break`), duration controls (25m / 50m / custom), start/pause/reset broadcast.
  * **Frontend**: Circular progress timer, focus status pill, gentle sound chime on transitions.
  * **Commit Target**: `Implement synchronized room Pomodoro timer with sound alerts`

- [ ] **Day 27 — Phase 27: Study Goals & Session Checklist**
  * **Goal**: Encourage accountability through visible personal and group study goals.
  * **Frontend & Sockets**: Room-wide shared goal banner + individual personal checklist with checkbox completion tracking.
  * **Commit Target**: `Add session goal checklist and individual progress tracker`

- [ ] **Day 28 — Phase 28: Ambient Sound & Focus Atmosphere**
  * **Goal**: Integrated background study sounds for immersive focus.
  * **Frontend**: Ambient audio player (Lo-Fi beats, soft rain, library noise, white noise) with client-side volume sliders.
  * **Commit Target**: `Integrate ambient focus sound player with custom volume controls`

---

## Week 5: DSA / Coding Mode & Problem Solving Platform (Days 29–35)

- [ ] **Day 29 — Phase 29: DSA Mode Workspace Shell**
  * **Goal**: Build multi-pane split workspace for collaborative coding.
  * **Frontend**: Resizable split pane: Problem description on left, Code editor on right, Output console at bottom.
  * **Commit Target**: `Build split-pane layout for DSA coding mode workspace`

- [ ] **Day 30 — Phase 30: DSA Problem Model & Problem Library**
  * **Goal**: Curated problem database for coding practice sessions.
  * **Backend**: `Problem` Mongoose model: title, difficulty (`Easy`, `Medium`, `Hard`), description, examples, constraints, hints.
  * **Frontend**: In-room problem picker drawer allowing the host or group to choose problems.
  * **Commit Target**: `Create Problem schema and in-room problem selection library`

- [ ] **Day 31 — Phase 31: In-Browser Code Editor Integration**
  * **Goal**: Professional syntax-highlighted code editor.
  * **Frontend**: Monaco Editor (or CodeMirror) integration supporting JavaScript, Python, C++, and Java with dark/light themes.
  * **Commit Target**: `Integrate in-browser code editor with multi-language syntax support`

- [ ] **Day 32 — Phase 32: Real-Time Collaborative Code Synchronization**
  * **Goal**: Live code synchronization between participants in DSA rooms.
  * **Backend & Sockets**: Code change diff broadcasts (`code:update`), debounce logic, toggle between "Shared Editor" and "Individual Editor".
  * **Frontend**: Real-time cursor presence indicator and editor sync state.
  * **Commit Target**: `Implement real-time collaborative code sync via WebSockets`

- [ ] **Day 33 — Phase 33: Mock Code Runner & Test Case Evaluator**
  * **Goal**: Enable students to run their code against problem test cases.
  * **Frontend & Backend**: Test execution simulator: run sample inputs, render stdout/stderr, execution time, and pass/fail test status.
  * **Commit Target**: `Add code runner console with sample test case evaluation`

- [ ] **Day 34 — Phase 34: Doubt Discussion Layout & Question Queue**
  * **Goal**: Workspace tailored for asking and answering technical doubts.
  * **Frontend**: Doubt mode layout featuring an organized question queue on the left and active discussion spotlight on the right.
  * **Commit Target**: `Build Doubt Discussion workspace and question queue panel`

- [ ] **Day 35 — Phase 35: Ask Doubt & Queue Management**
  * **Goal**: Enable students to post doubts and organize the resolution order.
  * **Backend**: `Doubt` model and APIs (`POST /api/rooms/:id/doubts`, `GET /api/rooms/:id/doubts`, status: `Open`, `Discussing`, `Solved`).
  * **Frontend**: "Ask Doubt" modal with tag picker and queue item cards.
  * **Commit Target**: `Implement Ask Doubt form and real-time question queue status`

---

## Week 6: Doubt Solving, Moderation & Safety (Days 36–42)

- [ ] **Day 36 — Phase 36: Interactive Doubt Solving & Speaker Handoff**
  * **Goal**: Smooth moderation for addressing questions one by one.
  * **Sockets**: "Raise Hand" queue, host promotes participant to active speaker, spotlighted active question indicator.
  * **Frontend**: Mark doubt as solved button, question timer, and speaker queue list.
  * **Commit Target**: `Add raise-hand queue and host speaker promotion for doubts`

- [ ] **Day 37 — Phase 37: Doubt Notes & Solution Pinning**
  * **Goal**: Save actionable summaries and code snippets from resolved doubts.
  * **Frontend & Backend**: Pinned solution panel allowing markdown notes, links, and code snapshots to be preserved and copied.
  * **Commit Target**: `Implement pinned solution notes and markdown explanation capture`

- [ ] **Day 38 — Phase 38: Host In-Room Moderation Controls**
  * **Goal**: Give room creators full authority to maintain productive rooms.
  * **Backend & Sockets**: Actions: Mute participant mic, disable participant video, disable participant chat, kick user from room.
  * **Frontend**: Host moderation menu accessible from any participant avatar or name.
  * **Commit Target**: `Add host participant moderation controls to mute and kick`

- [ ] **Day 39 — Phase 39: In-Room & User Reporting System**
  * **Goal**: Safety reporting mechanism for all registered participants.
  * **Backend**: `Report` model (`reporterId`, `reportedUserId`, `roomId`, `reason`, `description`, `status`). `POST /api/reports`.
  * **Frontend**: Report modal with category taxonomy (harassment, spam, inappropriate behavior).
  * **Commit Target**: `Create user and room reporting system with backend report queue`

- [ ] **Day 40 — Phase 40: User Blocking System**
  * **Goal**: Ensure users can avoid abusive individuals platform-wide.
  * **Backend**: `POST /api/users/block/:id`, `DELETE /api/users/block/:id`. Prevent blocked users from joining rooms created by each other or viewing each other's messages.
  * **Frontend**: Block button on user profiles and in-room participant menus.
  * **Commit Target**: `Implement user blocking system and discovery exclusion`

- [ ] **Day 41 — Phase 41: Admin Moderation Dashboard**
  * **Goal**: Admin portal for platform integrity and dispute resolution.
  * **Backend**: Admin protected endpoints: `GET /api/admin/reports`, `POST /api/admin/suspend-user`, `POST /api/admin/terminate-room`.
  * **Frontend**: Admin panel interface to review flagged reports, view audit history, and execute bans.
  * **Commit Target**: `Build admin moderation dashboard with report review queue`

- [ ] **Day 42 — Phase 42: Follow System & Social Graph**
  * **Goal**: Connect users so they can return when their favorite hosts start rooms.
  * **Backend**: `POST /api/users/follow/:id`, `POST /api/users/unfollow/:id`, followers/following list endpoints.
  * **Frontend**: Follow/Following button on profiles and room host cards.
  * **Commit Target**: `Add user follow system and social connection graph`

---

## Week 7 & 8: Social Growth, Additional Modes, AI & Polish (Days 43–50)

- [ ] **Day 43 — Phase 43: Scheduled Rooms & Calendar Reminders**
  * **Goal**: Enable planning sessions in advance (e.g. *"DSA Night at 10 PM"*).
  * **Backend**: Scheduled room creation (`scheduledStartTime`), `GET /api/rooms/scheduled`, "Remind Me" bookmarking endpoint.
  * **Frontend**: "Upcoming Rooms" tab on discovery page with countdown and reminder toggle.
  * **Commit Target**: `Implement scheduled rooms and user reminder subscriptions`

- [ ] **Day 44 — Phase 44: Room Sharing & Viral Social Previews**
  * **Goal**: Drive organic platform traffic via rich link sharing.
  * **Frontend & Backend**: Dynamic share links (`/room/:id`), copy link modal with 1-click clipboard action, OpenGraph meta tags previewing room title and participant count.
  * **Commit Target**: `Build room link sharing dialog and dynamic social preview cards`

- [ ] **Day 45 — Phase 45: In-App Notification Center**
  * **Goal**: Real-time alerts keeping users engaged with activities.
  * **Backend & Sockets**: In-app notification triggers (host started room, room reminder, doubt solved).
  * **Frontend**: Notification bell icon, unread counter badge, dropdown notification list with deep links.
  * **Commit Target**: `Implement in-app notification center and real-time alert triggers`

- [ ] **Day 46 — Phase 46: Interview Practice Mode**
  * **Goal**: Specialized mode for mock technical and behavioral interviews.
  * **Frontend**: Role selector (`Interviewer`, `Candidate`, `Observer`), interview timer, prompt card drawer, and private feedback rubric.
  * **Commit Target**: `Create Interview Practice mode with role assignment and prompts`

- [ ] **Day 47 — Phase 47: Chill & Casual Voice Room Mode**
  * **Goal**: Audio-first social lounge for casual discussions and hangouts.
  * **Frontend**: Large participant avatar stage with glowing audio rings, custom room topic header, and reaction emojis float animation.
  * **Commit Target**: `Build Chill voice room mode with animated avatar stage`

- [ ] **Day 48 — Phase 48: Session Summary Generator**
  * **Goal**: Reward students with an accomplishments summary upon leaving a room.
  * **Frontend & Backend**: Post-room modal: duration, participants present, problems solved, checklist items completed, with option to download or share.
  * **Commit Target**: `Implement post-session summary modal with activity statistics`

- [ ] **Day 49 — Phase 49: Cost-Controlled AI Assistant Integration**
  * **Goal**: Provide on-demand AI study hints and summaries without runaway API costs.
  * **Backend**: OpenAI/Gemini API integration with strict prompt tokens and rate limiting.
  * **Frontend**: "Get Hint" button in DSA mode (hints only, no solution spoilers), and "Summarize Session" button in Study mode.
  * **Commit Target**: `Integrate on-demand AI hint generator and session summarizer`

- [ ] **Day 50 — Phase 50: Production Optimization, Security Hardening & Deployment**
  * **Goal**: Comprehensive production readiness check, audit, and launch readiness.
  * **Backend**: Helmet security headers, Express rate limiter, CORS lockdown, production environment verification.
  * **Frontend**: Vite bundle splitting, lazy routing, asset compression, responsive mobile QA check.
  * **Commit Target**: `Apply production security hardening and build optimizations`

---

## Daily Phase Execution Checklist

Use this format every day before starting a phase:

```markdown
### Day X: [Phase Name]
- [ ] Read PRD & Rules.md
- [ ] Post small plan
- [ ] Implement backend & frontend changes
- [ ] Test happy path & edge cases
- [ ] Git commit with human developer message
- [ ] Git push
- [ ] Mark checkbox in Phase.md
```
