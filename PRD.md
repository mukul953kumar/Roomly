Product Requirements Document — Mode-Based Live Social Platform

Working Name: ROOMLY
Product Type: Real-time social + collaboration platform
Primary Audience: Students, developers, young professionals, online communities
Core Idea: People don't join a meeting; they join an activity.

Choose what you want to do → find people doing it → join a live room → do it together.

1. Product Vision

ROOMLY is a real-time platform where users can create and join purpose-driven live rooms.

Unlike traditional video-conferencing platforms where users generally need a meeting link, ROOMLY starts with intent.

A user doesn't think:

“I need a Zoom meeting.”

They think:

“I want to study with people.”

“I want to solve DSA.”

“I have a doubt.”

“I want to practice an interview.”

“I want to chill with people.”

ROOMLY connects that intent to an active room.

2. Core Product Principles

Every product decision should follow these principles.

2.1 Activity First

The activity is more important than video.

Video/audio is infrastructure.

2.2 Instant Discovery

A user should be able to find an interesting room within seconds.

2.3 User-Created Community

The platform should not depend entirely on admin-created rooms.

Users create rooms themselves.

2.4 Different Modes = Different Experiences

A DSA room should not behave exactly like a Party room.

2.5 Simple UX

A new user should understand the basic product without tutorials.

2.6 Safety by Default

Public rooms must have moderation and reporting mechanisms.

2.7 No AI-Generated-Looking Product

The UI and product should feel human-designed and purposeful.

3. Target Users
3.1 Students

Use cases:

Study together
Exam preparation
DSA
Doubt solving
Group discussion
Interview preparation
Project collaboration
3.2 Developers

Use cases:

Coding sessions
DSA practice
Code discussion
Hackathon collaboration
Open-source collaboration
3.3 Young Professionals

Use cases:

Interview practice
Brainstorming
Networking
Learning groups
Casual communities
3.4 Casual Users

Use cases:

Gaming
Party
Chill
Gossip
Watch together
4. User Roles
4.1 Guest

Can:

View landing page
View public modes
Browse limited public rooms

Cannot:

Join rooms
Create rooms
Chat
Participate

CTA:

Create Account

4.2 Registered User

Can:

Join rooms
Create rooms
Follow users
Save rooms
Chat
Use audio/video
Report users
Receive notifications
Maintain profile
4.3 Room Host

The user who creates a room.

Can:

Start/end room
Manage participants
Mute participants
Remove participant
Block participant from room
Change room settings
Moderate chat
Assign roles where supported
4.4 Moderator

Initially admin-controlled.

Can:

Review reports
Suspend users
Remove harmful content
Close rooms
Review abuse patterns
Manage platform-level moderation
4.5 Admin

Full platform control.

Can:

Manage users
Manage modes
Manage reports
Manage rooms
Manage featured content
Manage subscriptions
Review analytics
Configure platform rules
5. Authentication

Support:

Primary
Google authentication
Email/password
Email OTP
Optional later
Phone OTP

After first login:

Name
Username
Profile photo
Age confirmation
Interests
Preferred modes

The onboarding should remain short.

6. User Onboarding

After registration:

Step 1

Choose interests.

Example:

Study
DSA
Coding
Gaming
Interview
Music
Party
Chill
Step 2

Choose what the user wants to use ROOMLY for.

Example:

“What brings you here?”

Multiple selection allowed.

Step 3

Optional profile completion.

Then:

Find something to do

7. Home / Discover

This is the main product screen.

Header:

Good evening, Mukul

Then:

What do you want to do?

Mode selector:

Study
DSA
Doubt
Interview
Gaming
Party
Chill
Brainstorm
More

Then:

Live Now

Display currently active rooms.

Each room card shows:

Mode
Live status
Room name
Description
Host
Participants
Capacity
Difficulty where relevant
Join button
8. Room Discovery

Users should be able to search rooms.

Search examples:

“React”

“DSA”

“Late night study”

“Interview”

Filters:

Mode
Live now
Starting soon
Language
Difficulty
Room size
Public/private
Beginner/advanced
9. Room Types
Public Room

Anyone can discover and join.

Private Room

Accessible through invitation/link.

Invite Only

Only invited users can join.

Scheduled Room

Room has future start time.

10. Room Creation

User clicks:

Create Room

Required:

Room Name

Example:

2 Hour DSA Grind

Mode

Example:

DSA

Description

Example:

Solving medium-level array problems together.

Room Visibility
Public
Private
Invite only
Capacity

Options:

2
5
10
20
50
100

Larger capacities can be restricted depending on infrastructure.

Start
Start now
Schedule
Language

Optional.

Additional Settings
Camera optional
Mic optional
Chat enabled
Screen sharing
Participant permissions
11. Room Lifecycle

Every room follows:

Created
   ↓
Waiting
   ↓
Live
   ↓
Ending
   ↓
Ended

A room can be automatically closed if:

Host leaves and no transfer occurs
Room remains empty for configured period
Host ends it
Admin closes it
12. Main Live Room

The room is the most important screen.

Core sections:

Main Activity Area

Depending on mode.

Participants

Show active users.

Chat

Real-time chat.

Controls
Mic
Camera
Screen share
Raise hand
Chat
Leave
Room Information
Name
Mode
Host
Participant count
13. Audio / Video

Users should be able to:

Turn camera on/off
Turn microphone on/off
Change camera
Change microphone
Speaker selection
View connection quality
Reconnect

Camera should NOT be mandatory.

Some modes should prioritize audio or activity instead.

14. Screen Sharing

Supported in relevant modes.

Use cases:

DSA

Share VS Code.

Interview

Share project.

Study

Share notes.

Doubt

Share problem.

Host controls whether participants can screen share.

15. Chat

Real-time room chat.

Supports:

Text
Emoji
Mentions
Reply
Delete own message
Host moderation

Anti-spam:

Rate limits
Repeated message detection
Temporary chat restrictions
16. Participant Management

Host can:

Mute participant
Remove participant
Block participant from room
Make participant moderator
View report option

Participant can:

Mute themselves
Hide camera
Leave room
Report user
17. STUDY MODE

Purpose:

Focused group study.

Features:

Focus Timer

Examples:

25 min
50 min
Custom
Study Goal

Example:

Complete 3 chapters.

Session Status
Focus
Break
Focus
Break
Optional
Ambient sound
Camera
Mic
Chat

Study room should visually prioritize:

timer + focus + participants

rather than video.

18. DSA / CODING MODE

Purpose:

Solve programming problems together.

Features:

Problem Panel

Shows:

Problem title
Difficulty
Description
Examples
Constraints
Collaborative Editor

Multiple users can view/edit depending on permissions.

Modes:

Individual coding
Shared editor
Execution

Where supported:

Run
Test
Submit
Discussion

Participants can discuss approaches.

Whiteboard

Optional.

Progress

Example:

Problems solved: 3/5
19. DOUBT DISCUSSION MODE

This mode is designed around questions.

User clicks:

Ask Doubt

Enters:

Explain useEffect dependency array.

Question appears in queue.

Other users can:

View
Answer
Raise hand
Mark solved

Status:

Open
Discussing
Solved

Host can organize questions.

20. INTERVIEW MODE

Purpose:

Interview practice.

Room roles:

Interviewer
Candidate
Observer

Features:

Timer
Question prompts
Screen share
Notes
Role switching

After session:

Optional feedback:

Communication
Technical explanation
Structure
Confidence-related observable behaviors

Do not present subjective AI judgments as objective facts.

21. GAMING MODE

Purpose:

Find people to play with.

Features:

Game name
Platform
Player count
Voice chat
Team formation
Ready status

Example:

Valorant
4/5 players

Need:
1 Duelist
22. PARTY MODE

Designed for casual group entertainment.

Features:

Music
Reactions
Games
Ice breakers
Polls
Party prompts

Avoid making it look like a formal meeting.

23. CHILL / GOSSIP MODE

Audio-first.

Features:

Large participant avatars
Voice-first experience
Topic
Raise hand
Reactions
Chat

Example:

Late Night College Talks

24. BRAINSTORM MODE

Purpose:

Collaborative idea generation.

Features:

Shared board
Sticky notes
Voting
Categories
Timer

Example:

Startup Ideas

Users add ideas.

Everyone votes.

Top ideas become highlighted.

25. Mode Expansion

Future modes can include:

Watch Together
Book Club
Language Practice
Music Jam
Fitness
Debate
Career Discussion
Hackathon
Project Building
Study Group
Movie Discussion

Modes should be added only after validating demand.

26. Social System

Users can:

Follow

Follow interesting users.

Save

Save rooms.

Invite

Invite friends.

Share

Share public room.

Notifications

Receive notifications for:

Followed user starts room
Saved room starts
Invitation
Room reminder
27. User Profile

Profile contains:

Photo
Name
Username
Bio
Interests
Preferred modes
Hosted rooms
Joined rooms
Followers/following
Achievements

Optional statistics:

Rooms hosted
Sessions joined
Hours participated

Avoid making it a LinkedIn clone.

28. Reputation

Do not create a simplistic “good/bad person” score.

Instead use activity-based indicators:

Rooms hosted
Sessions completed
Community participation
Reports received internally for moderation purposes

Public reputation features should be introduced carefully.

29. Notifications

Types:

Room

Your saved room is live.

Social

Arjun started a DSA room.

Invitation

Priya invited you to a Study room.

System

Your room starts in 10 minutes.

Users can control notification preferences.

30. Search

Global search should find:

Rooms
Users
Modes
Topics

Examples:

React

DSA

IELTS

Gaming

Study

Search results should prioritize currently active rooms.

31. Reporting

Every user should have:

Report

Categories:

Harassment
Spam
Hate/abuse
Sexual content
Scams
Inappropriate behavior
Other

Optional description.

Reports go to moderation queue.

32. Blocking

Blocked users:

Cannot message user
Cannot invite user
Cannot interact normally
Should not appear in relevant discovery surfaces
33. Host Moderation

Host can:

Remove participant
Mute participant
Disable participant chat
Stop participant screen share
Close room

Host cannot override platform-level bans.

34. Admin Moderation

Admin dashboard should support:

User search
Room search
Report queue
User suspension
Permanent ban
Room termination
Moderation notes
Abuse history

Every moderation action should have an audit trail.

35. Privacy

Default principles:

Minimum collection

Only collect information necessary for the feature.

Room privacy

Public room:

Discoverable.

Private room:

Not publicly discoverable.

Invite-only:

Access controlled.

Profile privacy

Allow users to control:

Profile visibility
Online status
Follow permissions
Message permissions
36. Security

Required:

Secure authentication
Authorization checks
Rate limiting
Input validation
Secure sessions/tokens
Protection against spam
Protection against unauthorized room access
Secure file handling
Abuse monitoring

Never trust client-side permissions.

37. Recording

Recording should NOT be enabled by default.

If recording is introduced:

Explicit room-level indication
Participant notification
Clear consent/notice mechanism
Secure storage
Retention policy
Host controls
38. AI Features

AI should be an enhancement, not the main identity of the product.

Study

AI can:

Generate study plan
Summarize session notes
Create quiz
DSA

AI can:

Explain problem
Give hints
Analyze approach
Generate test cases

Important:

AI should not automatically reveal complete solutions when the room is intended for learning unless the user explicitly requests it.

Doubt

AI can:

Summarize discussion
Suggest explanations
Organize questions
Interview

AI can:

Generate questions
Summarize session
Provide structured feedback
39. AI Room Assistant

Future feature:

Each room can optionally enable:

AI Assistant

The assistant can understand room context.

Example:

User:

“Can someone explain this?”

AI can provide a concise explanation.

Host can disable AI.

40. Room Summary

At the end of supported rooms:

SESSION SUMMARY

Duration:
1h 42m

Participants:
8

Topics discussed:
Arrays
Sliding Window
Binary Search

Problems solved:
4

Notes:
...

This is particularly valuable for Study, DSA and Doubt rooms.

41. Gamification

Keep it subtle.

Possible:

Streak

5-day study streak

Achievements
First room hosted
10 rooms joined
10 DSA problems solved
First doubt answered
Milestones

Avoid aggressive points/leaderboards initially.

42. Room Discovery Ranking

Room discovery should prioritize:

Currently live
Relevant to selected mode
Matching user interests
Appropriate language
Room activity
Availability

Do not simply rank based on popularity.

A room with 3 people can be more relevant than a room with 100.

43. Scheduled Rooms

Users can schedule:

DSA Night — 10 PM

Other users can:

Remind me

When time arrives:

🔴 DSA Night is starting now.

44. Recurring Rooms

Future feature.

Example:

Every Monday–Friday at 9 PM

Room automatically appears in scheduled discovery.

Host can pause recurrence.

45. Room Capacity

Room creator chooses capacity.

System should prevent overbooking.

When full:

Room Full

Possible future:

Waitlist

46. Language

Initially:

English
Hindi

Future:

Hinglish
Regional languages

Language should be attached to rooms to improve discovery.

47. Mobile Experience

Mobile should support:

Discover
Join
Audio/video
Chat
Create room
Notifications
Profile

Room interface should adapt rather than simply shrink desktop.

48. Responsive Room Behavior

Desktop:

Activity | Video | Chat

Mobile:

Activity
   ↓
Participants
   ↓
Chat

Controls should remain reachable with one hand.

49. Error States

Examples:

Connection lost

Connection interrupted. Reconnecting…

Room full

This room has reached capacity.

Host ended room

The host ended this session.

Camera unavailable

Camera access unavailable.

Microphone denied

Microphone permission is required for voice participation.

Every error should tell users what they can do next.

50. Empty States

Example:

No DSA rooms are live right now.

Then:

Create the first room

This creates supply instead of leaving users stuck.

51. Monetization

Initially keep the basic experience free.

Potential future:

Free
Join public rooms
Create basic rooms
Basic audio/video
Chat
Premium
Larger rooms
Advanced room customization
Recurring rooms
Advanced AI tools
Advanced analytics
Private communities
Community / Organization

For:

colleges
bootcamps
developer communities
organizations

Features:

private workspace
admin controls
private rooms
analytics
moderation

Do not put essential safety or basic communication behind a paywall.

52. Growth Loop

Core loop:

Create Room
     ↓
Share Room
     ↓
New Users Join
     ↓
Participants
     ↓
Some Create Their Own Rooms
     ↓
More Rooms
     ↓
More Users

Secondary loop:

Join Room
 ↓
Follow Host
 ↓
Host Creates Next Room
 ↓
Notification
 ↓
Return
53. Viral Sharing

Every public room gets a shareable link.

Shared preview:

🔴 LIVE

2-Hour DSA Grind

7 people are currently solving problems.

Join Room

Don't expose private room information in public previews.

54. First-Time User Experience

The user should reach useful content quickly.

Flow:

Landing
 ↓
Sign Up
 ↓
Select Interests
 ↓
Discover
 ↓
Choose Mode
 ↓
See Live Rooms
 ↓
Join

Avoid lengthy onboarding.

55. MVP — Phase 1

Build only the essential product.

Authentication
Google
Email
User
Profile
Interests
Rooms
Create
Public/private
Join
Leave
Host controls
Communication
Audio
Video
Chat
Screen share
Discovery
Modes
Live rooms
Search
Filters
Initial modes

Study

DSA

Doubt Discussion

Safety
Block
Report
Remove participant

This is the first usable product.

56. Phase 2

Add:

Study timer
DSA collaborative editor
Doubt queue
Whiteboard
Scheduled rooms
Notifications
Follow users
Saved rooms
Room history
57. Phase 3

Add:

Interview mode
Gaming mode
Chill mode
Party mode
Brainstorm mode
AI assistant
AI summaries
AI DSA assistance
58. Phase 4

Add:

Recurring rooms
Communities
Private groups
Organization accounts
College communities
Advanced moderation
Premium subscriptions
59. Phase 5

Possible long-term expansion:

Community ecosystem

Users can build communities around:

universities
coding
competitive programming
gaming
careers
hobbies

Community admins can manage their own rooms and members.

60. Core Analytics

Track product usage without collecting unnecessary personal data.

Important metrics:

Acquisition
Signups
Signup conversion
Activation
First room viewed
First room joined
First room hosted
Engagement
Rooms joined/user
Sessions/week
Average session duration
Supply
Rooms created
Rooms actually joined
Empty rooms
Retention
Day 1
Day 7
Day 30
Social
Follows
Invites
Shared rooms
Safety
Reports
Blocks
Moderation actions
61. Most Important Product Metrics

The primary metric should not simply be:

Number of registered users.

More meaningful:

Weekly Active Participants

Users who actually join or participate in a live activity.

And:

Successful Sessions

A session where:

user joined
stayed for meaningful duration
activity happened

This measures whether the platform actually provides value.

62. Product Rules

These rules should remain consistent throughout development.

Rule 1

Do not turn the product into a Zoom clone.

Rule 2

Do not build all modes simultaneously.

Rule 3

Every mode must have a reason to exist.

Rule 4

Activity-specific tools should be prioritized over decorative features.

Rule 5

Don't add AI merely because it is an AI product.

Rule 6

Don't build features before validating the user problem.

Rule 7

Public rooms require moderation.

Rule 8

Privacy should be considered from the beginning.

Rule 9

The interface must remain understandable even as modes increase.

Rule 10

Code and UI should remain human-readable and maintainable.

63. MVP Success Criteria

Before expanding beyond the initial modes, validate:

Users actually join rooms.
Users stay in rooms for meaningful sessions.
Users create rooms without being forced.
Rooms receive participants.
Users return to the same modes.
Users invite other people.
Empty-room rate decreases.
Study/DSA users repeatedly use the platform.

If users only sign up but don't join rooms, the product isn't validated.

64. Final Product Definition

ROOMLY is not:

Zoom + random features.

It is:

A live activity platform where people discover and participate in things together.

The hierarchy should always be:

INTENT
  ↓
MODE
  ↓
ROOM
  ↓
PEOPLE
  ↓
ACTIVITY
  ↓
CONNECTION

The most important experience is:

“I want to do something right now.”

ROOMLY answers:

“Here are people already doing it. Join them.”

65. Final MVP User Journey
New user
Visit website
      ↓
Create account
      ↓
Choose interests
      ↓
Discover
      ↓
See:
🔥 2-Hour DSA Grind
📚 Silent Study
❓ React Doubt Room
      ↓
Join DSA room
      ↓
Enter live room
      ↓
Enable microphone
      ↓
See other participants
      ↓
Open problem
      ↓
Discuss
      ↓
Solve
      ↓
Leave room
      ↓
Session summary
      ↓
Follow host
      ↓
Return next day
Returning user
Open ROOMLY
      ↓
"3 rooms matching your interests are live"
      ↓
Join immediately

That instant intent → room → activity loop should remain the heart of the entire product.