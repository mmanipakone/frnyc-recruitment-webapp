# FRNYC Recruitment & Retention Web App — Setup

## Immediate Preview (No Install Required)

Open `preview.html` in any browser:

```
open preview.html
```

This is a fully functional standalone prototype — all 6 missions, all pages, all interactions, localStorage persistence.

---

## Full React App (Production Build)

### Requirements
- Node.js 18+ (install from https://nodejs.org or `brew install node`)

### Install & Run

```bash
cd frnyc-recruitment-webapp-prototype
npm install
npm run dev
```

Then open: http://localhost:5173

### Build for deployment

```bash
npm run build
# Output in dist/
```

---

## What was built

### Pages
| Route | Description |
|-------|-------------|
| `/welcome` | Landing page with value prop and CTA |
| `/choose-role` | 2-step onboarding: pick role + school name |
| `/dashboard` | Main hub: next action, phase progress, focus mode |
| `/missions` | All missions with phase filter and status counts |
| `/missions/:id` | 7-step mission detail with action/output/progress |
| `/resources` | Templates, guides, examples by category |
| `/progress` | Completion rings, phase breakdown, badges |
| `/school-profile` | Edit role, school name, phase, reset |
| `/team-view` | School-wide progress table + mock team roster |

### Missions (6 complete)
1. Build Your 4-Year FRNYC Roadmap (Awareness)
2. Customize Student & Family Pathway Materials (Awareness)
3. Launch Your Student Ambassador Program (Exposure)
4. Build Your Cohort Retention Structures (Commitment)
5. Run the Student Interest Survey (Exposure)
6. Plan & Run a Family Information Session (Commitment)

### Badges (7)
- Roadmap Ready, Messaging Ready, Ambassador Ready, Funnel Built,
  Cohort Launch Ready, Family Funnel Active, Recruitment Ready

### Features
- Role-based mission ownership (5 roles)
- FRNYC AECEC framework phase tracking
- Mission dependency locking (e.g., ambassadors unlock after materials)
- 7-step mission structure: Do Now → Objective → Model → Guided Practice → Independent Practice → Share → Exit Ticket
- Focus Mode (one mission, one CTA, minimal distraction)
- Progress persistence via localStorage
- Celebration screen on mission completion
- Badge earning on completion
- Streak tracking
- Team view with mock roster + mission table
- Resources library with search and category filtering
- Responsive design (desktop sidebar + mobile nav)

---

## Before GitHub Deployment

1. Install Node.js
2. Run `npm install && npm run dev` to verify the React build
3. Test all mission flows end-to-end
4. Confirm logos/assets path (currently using relative paths — update for production)
5. Add real resource links (currently placeholder cards)
6. Approve this build, then initialize git only inside this folder

---

## GitHub Rules (Pending Approval)

- Initialize git ONLY inside `frnyc-recruitment-webapp-prototype/`
- Create a NEW separate GitHub repository
- Do NOT connect to the existing playbook repo
- Do NOT publish over the current GitHub Pages site
