# Thread — Every Word Connected.

Thread is a next-generation, AI-native collaborative writing platform built for journalists, legal teams, and content creators. It reimagines the writing process by unifying structured knowledge, collaboration, validation, and workflow management into an intelligent, profession-aware workspace.

## 🚀 Overview

Thread solves the problem of disconnected workflows where writers use separate tools for drafting (Docs), feedback (Slack), and project management (Asana/Jira). This platform brings everything together natively, powered by contextual AI that reads your style guide and understands your role.

## 🌟 Key Features

*   **Profession Modes**: Tailored workspaces for **Journalists**, **Legal Professionals**, and **Writers**. The UI, widgets, and AI tools adapt based on the active mode.
*   **Role-Based Access Control**: Different views and capabilities for Lead Editors, Editors, Reviewers, Writers, Publishers, and Associates.
*   **Real-Time Collaboration**: Cursor tracking, live editing, and conflict-free concurrent editing environments.
*   **AI Writing Assistant**: Context-aware AI that can continue thoughts, generate style-matched headlines, suggest improvements, and summarize text natively.
*   **Editorial Workflow Pipeline**: Documents move through structured stages (Idea → Draft → Review → Approved → Revision → Published) with full audit trails.
*   **Knowledge Base & Research Panel**: Built-in library for style guides, factual references, and source tracking right inside the editor.
*   **Analytics Dashboard**: Visual breakdown of team productivity, publish velocity, and word counts by author.
*   **Editorial Calendar**: At-a-glance view of upcoming deadlines and publishing schedules.
*   **Multi-Tenant Organization Architecture**: Support for independent teams within a single overarching workspace.

## 🛠 Tech Stack

The application is a pure front-end demonstration built with:
*   **HTML5**: Semantic and accessible markup.
*   **Vanilla CSS3 (CSS Variables)**: Custom properties for dynamic theming (Light/Dark mode) and responsive layout design. No external CSS frameworks were used.
*   **jQuery 3.7.1**: Used for robust DOM manipulation, event handling, and animating the user interface.
*   **RemixIcon**: Lightweight, open-source icon suite for consistent visual language.
*   **Google Fonts**: `Fraunces` for headings, `DM Sans` for body copy, and `JetBrains Mono` for code blocks.

## 📁 Project Structure

```text
c:\Kunal\thread\
├── assets/
│   └── favicon.png          # App icon and favicon
├── css/
│   ├── app.css              # Styles for the main application dashboard
│   ├── index.css            # Styles for the landing page
│   └── onboarding.css       # Styles for the multi-step onboarding flow
├── js/
│   ├── app.js               # Logic for dashboard interactions, modes, roles, and UI state
│   ├── index.js             # Logic for landing page interactions, FAQ, and theme toggles
│   └── onboarding.js        # Logic for onboarding validation, step progression, and inputs
├── app.html                 # The main web application (Dashboard, Calendar, Editor)
├── index.html               # The landing / marketing page
├── onboarding.html          # The 7-step user onboarding flow
├── README.md                # Project documentation (this file)
└── WALKTHROUGH.md           # Deep-dive breakdown of all application components
```

## 💻 Getting Started

This is a static front-end application. To view and interact with the demo:
1.  Clone the repository or download the files.
2.  Open `index.html` in any modern web browser to view the landing page.
3.  Click **"Start free"** to go through the onboarding process (`onboarding.html`).
4.  Once onboarding is complete (or by navigating directly to `app.html`), you can interact with the app dashboard.

## 🎨 Design System

Thread uses a premium, modern design aesthetic:
*   **Vibrant Color Palette**: Peach, Lemon, Blush, Lavender, Mint, Sky Blue used meaningfully for labels, charts, and state indicators.
*   **Glassmorphism & Shadows**: Soft multi-layered shadow overlays for a distinct depth hierarchy.
*   **Micro-animations**: Hover states, pill toggles, and screen transitions are built with fluid cubic-bezier easing to ensure the interaction feels premium and alive.
