# Thread — Detailed Application Walkthrough

This document outlines the granular components of the Thread platform, explaining their structure and interactive functionality.

---

## 1. Landing Page (`index.html`)

The entry point of the website built to convert visitors into users by showcasing platform capabilities.

### Key Components:
*   **Responsive Navigation Bar**: Includes the logo, quick jump links, a light/dark theme toggle, and CTA buttons. Collapses into a mobile menu on smaller screens.
*   **Hero Section**: Features a striking headline, a mesh gradient background, and a mock window displaying the web app interface to immediately showcase the product value.
*   **Feature Grid**: Six cards highlighting core capabilities (Collaboration, AI, Editorial Workflow, Knowledge Base).
*   **Dynamic Profession Tabs**: Interactive tabs (Writer, Journalism, Legal) that swap out content, mockups, and feature lists to demonstrate the platform’s adaptability.
*   **Interactive AI Demo**: Allows users to click on different AI commands (Continue, Improve, Shorten, Headlines) and see a simulated intelligent response typed out on the screen.
*   **Pricing & FAQ**: Interactive billing toggles (Monthly/Annual) updating prices dynamically, and collapsible accordion-style FAQs.

---

## 2. Onboarding Flow (`onboarding.html`)

A 7-step wizard to personalize the initial workspace setup before dropping the user into the main app.

### Key Components:
*   **Global Layout**: A clean, centralized card design with a dynamic top progress bar indicating the current step.
*   **Step 1 — Sign Up**: Email and password fields with a dynamic password strength meter.
*   **Step 2 — OTP Verification**: 6 individual input boxes mapping an authentication code. Auto-advances focus to the next box upon typing.
*   **Step 3 — Role & Content Types**: Grid cards to select primary roles (Journalist, Editor, Legal Pro) and multi-select tags for writing content types.
*   **Step 4 — Workspace Setup**: Organization name input that dynamically generates an accompanying URL slug in real-time.
*   **Step 5 — Profession Mode Selection**: Crucial step where the user picks their initial UI mode (Writer, Journalism, Legal). This selection carries over to the main app layout.
*   **Step 6 — Preferences**: Visual toggles for Light/Dark/System theme, customizable font selection (Fraunces, DM Sans, Georgia), and pill toggles for email notifications.
*   **Step 7 — Team Invites**: An interactive input field that creates removable chips when an email address is entered (via Enter/Comma). Includes default role assignment cards.

---

## 3. Main Application Dashboard (`app.html`)

The core workspace demonstrating an advanced interface with varied professional tools.

### A. Top Navigation Bar (Topbar)
*   **Logo & Breadcrumbs**: Indicates the current workspace name.
*   **Command Palette Search (⌘K)**: Opens an interactive modal allowing users to quickly jump between features, views, and change their active role.
*   **Profession Mode Banner**: Located directly under the topbar on the dashboard view, it offers instant switching between Journalism, Legal, and Writer modes.
*   **Role Switcher Chip**: Indicates the user's current role (e.g., Lead Editor, Publisher). Clicking it opens the Role Modal.

### B. Global Sidebar
*   **Workspace Selector**: Dropdown to switch between multiple overarching organizations.
*   **Navigation Links**: Menu items mapping to internal views (Home, Analytics, Calendar, Team). The Analytics nav item is visible/hidden depending on the active role.
*   **Document Lists**: Expandable list sections simulating recent documents and knowledge base articles. Hovering over a document reveals a "More" (`...`) action button.

### C. Views
*   **Home Dashboard View**:
    *   **KPI Metrics**: Four top-level metric cards (Total Docs, In Review, Published, Avg Review Time).
    *   **Dynamic Widgets**: The content deeply changes based on the selected Profession Mode.
        *   **Journalism Mode**: Top headlines, AP Style Monitor, and an Editorial Pipeline view.
        *   **Legal Mode**: Active Matter tracking, Risk Flag Monitor, and Recent Case Notes.
        *   **Writer Mode**: Daily Word Goal tracker (with a circular progress bar) and narrative/story idea cards.
    *   **Recent Documents**: A grid of document cards showing title, author, stage badge, and last edited timestamp.
*   **Analytics View**:
    *   Includes CSS-driven visual bar charts indicating words written per author and the breakdown of documents by their workflow status.
    *   **Team Activity Feed**: A list of recently performed actions by colleagues (e.g., "Sarah approved a draft", "Alex reviewed a contract").
*   **Editorial Calendar View**:
    *   A simulated weekly timeline grid featuring colored chips indicating document deadlines and publish dates.
    *   Includes side panels for "Publish Schedule" and "Upcoming Deadlines."
*   **Team & Roles View**:
    *   Adapts to the Profession Mode (e.g., "Litigation Team", "Compliance Team" for Legal Mode; "Editorial Board", "News Desk" for Journalism Mode).
    *   Displays cards of team members with assigned roles.

### D. The Editor & Intelligence Panel
*   **WYSIWYG Editor Mockup**: A large textarea container representing the main drafting space. Features a floating toolbar for text formatting (Bold, Italic, Link).
*   **Right-side Intelligence Panel**: Contains three distinct tabs: **AI**, **Validate**, and **Outline**.
    *   **AI Tab**: Offers suggested prompts that adapt based on the mode.
        *   *Journalist*: Fact verification, summarize quotes.
        *   *Legal*: Check citations, summarize clause.
        *   *Writer*: Continue story, brainstorm.
    *   **Validate Tab**: Contextual intelligence alerts analyzing the text.
        *   *Journalist*: Flags AP Style errors (e.g., using "%" instead of "percent").
        *   *Legal*: Flags high-risk clauses or ambiguous language.
        *   *Writer*: Checks readability scores and grammar suggestions.
    *   **Outline Tab**: A simulated sticky sidebar for document heading navigation.

---

## Technical Functioning (JavaScript Logic)
*   **Mode Switching**: Updates DOM elements handling visibility using `.addClass('active')` and `.removeClass('active')`. It also rewrites the HTML content of the Intelligence Panel based on the selected mode.
*   **Role Management**: The `switchRole(roleName)` function updates what the user can see. For instance, `if(rolesWithoutAnalytics.includes(roleName))` hides the "Analytics" navigation menu element from the sidebar.
*   **View Navigation**: The `switchView(viewId)` toggles between `#view-dashboard`, `#view-analytics`, `#view-calendar`, etc., managing the active state classes on the sidebar list items.
*   **Modals & Overlays**: Used extensively (Profile dropdown, Role Switcher, Command Palette). Handled by listening for clicks outside the element (`e.stopPropagation()`) or pressing the `Escape` key to securely close them.
