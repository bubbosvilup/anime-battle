# Anime Battle - Project Overview

## 📌 Project Description

**Anime Battle** is a turn-based battle game where players select a team of anime characters and assign them roles before engaging in a strategic battle against AI. The game consists of three main phases: **Start Menu, Character Selection, and Battle**. Future updates will introduce additional features like animations, sound effects, and an in-depth settings menu.

---

## 🎯 Features & Progress

### ✅ Completed

#### 📌 Updated RoleBox and Choice Logic 🎯

- Removed the **"Assign"** button in `RandomizationBox.jsx`, allowing direct role assignment.
- Added automatic role highlighting in `RoleBox.jsx`, highlighting unassigned roles.
- Improved user flow:
  - Players click directly on a role to assign the generated character.
  - Highlight disappears once a role is filled.
  - "TO BATTLE!" button activates when all roles are assigned.

#### **Start Menu UI**

- Three main buttons: `Start`, `How to Play`, `Characters`
- **Characters button opens a modal** with a character carousel
- **Audio & Settings buttons fully functional**
- **Fixed audio mute/unmute sync issue** (state updates correctly before muting)

#### **Characters Page**

- **Modal-based UI** with a **carousel**
- Displays all characters with their name, class, and special ability
- Navigation with `◀ Prev | ▶ Next` buttons
- Uses images from `public/char-cards/` for easy management
- Background blur effect on Start Menu when open
- Proper scrolling behavior (locked at first/last character)

#### **Character Selection UI**

- Two random character slots
- Randomizer button
- Skip button (one-time use per player)
- Five role selection slots (Captain, Vice Captain, Healer, Support x2)
- Character name & special move display
- Contained layout for better UI structure

#### **Battle Screen UI & Logic**

- Displays 1v1 role-based matchups
- Winner and loser indication through opacity changes
- **Battle logic implemented** based on roles and stats
- **Special moves applied correctly**
- **Battle output text area** for descriptions of match outcomes
- Animated background (GIF or CSS animations)
- Background music integration
- Improved button interactions and hover effects
- Adjustable game settings (currently volume control)

#### **How to Play Modal**

- Added a **new modal** with a simple ruleset
- Step-by-step instructions presented compactly

---

## 🏇 In Progress

### **Enhanced UI/UX**

- Refining character selection aesthetics
- Smoother transition effects for carousel and modals
- Improved mobile responsiveness

### **Settings Page**

- Additional adjustable settings (e.g., game speed, animation toggle)

---

## 💜 Upcoming Features

### **Game Logic Enhancements**

- Better character stat balancing
- Visual indication of winners/losers per matchup
- Improved battle output text for clarity

### **Audio & Visual Effects**

- Sound effects for key actions (randomizing, selecting, battle events)
- Battle animations for better engagement

### **Advanced Features (Future Scope)**

- Player customization (skins/avatars for characters)
- Multiplayer functionality
- Additional game modes and difficulty levels

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (planned integration)
- **Animations:** GSAP (planned integration)
- **Audio Handling:** Howler.js (fully functional with mute toggle)
- **Carousel Library:** Custom-built React carousel

---

## 🔧 Setup & Contribution Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/anime-battle.git
   ```

2. **Navigate into the project folder:**

   ```bash
   cd anime-battle
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Contribute by following the issue tracker and making pull requests.**

---

## 📌 Notes

- **New:** Character carousel implemented inside a modal in the Start Menu.
- **New:** Special moves now applied correctly during battles.
- Ensure `postcss.config.js` is set up for Tailwind CSS.
- Keep the component structure modular for scalability.
- Follow best practices for state management and reusability.

---

## 📢 Next Steps

🔥 **Tomorrow:** Refining animations and UI improvements for carousel and role selection.

---

🚀 **Project is now up-to-date!** 🚀

**Commit message suggestion:**

```bash
feat: implemented How to Play modal, improved battle logic, and applied special moves dynamically
```
