# Anime Battle - Project Overview

## 📌 Project Description

**Anime Battle** is a turn-based battle game where players select a team of anime characters and assign them roles before engaging in a strategic battle against AI. The game consists of three main phases: **Start Menu, Character Selection, and Battle**. Future updates will introduce additional features like animations, sound effects, and an in-depth settings menu.

---

## 🎯 Features & Progress

### ✅ Completed

### **Start Menu UI**

- Three main buttons: `Start`, `How to Play`, `Characters`
- **Characters button now opens a modal** with a character carousel
- **Audio & Settings buttons fully functional**
- **Fixed audio mute/unmute sync issue** (state updates correctly before muting)

### **Characters Page**

- **New modal-based UI** with a **carousel**
- **Displays all characters** with their name, class, and special ability
- Navigation with `◀ Prev | ▶ Next` buttons
- **Uses images from `public/char-cards/` for easy management**
- **Background blur effect** on Start Menu when open
- **Proper scrolling behavior** (no skipping, locked at first/last character)

### **Character Selection UI**

- Two random character image slots
- Randomizer button
- Skip button (one-time use per player)
- Five role selection slots per player (Captain, Vice Captain, Healer, Support x2)
- Character name & special move display
- Contained layout for better UI structure

### **Battle Screen UI**

- Display of 1v1 role-based matchups
- Winner and loser indication placeholders
- Battle output text area for match descriptions
- Animated background (GIF or CSS animations)
- Background music integration
- Improved button interactions & hover effects
- Adjustable game settings (only volume for now)

---

## 🚧 In Progress

### **Enhanced UI/UX**

- **Refining character selection aesthetics**
- **Better transition effects for carousel & modals**
- **Improved mobile responsiveness**

### **How to Play & Settings Pages**

- Detailed rules & guide for new players

---

## 🔜 Upcoming Features

### **Game Logic Implementation**

- Random character generation with stats
- Role-based battle logic
- Visual indication of winners/losers per matchup
- Dynamic battle output text

### **Audio & Visual Effects**

- Sound effects for actions (randomizing, selecting, battle events)
- Battle animations for better engagement

### **Advanced Features (Future Scope)**

- Player customization (choose character skins/avatars)
- Multiplayer functionality
- Additional game modes & difficulty levels

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (to be integrated)
- **Animations:** GSAP (to be integrated)
- **Audio Handling:** Howler.js **(now fully working with mute toggle)**
- **Carousel Library:** Custom-built React carousel for characters

---

## 🔧 Setup & Contribution Guide

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/anime-battle.git
   ```
2. **Navigate into the project folder:**
   ```sh
   cd anime-battle
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```
5. **Contribute by following the issue tracker and making pull requests.**

---

## 📌 Notes

- **New:** Character carousel implemented inside a modal in the Start Menu.
- **Ensure `postcss.config.js` is correctly set up for Tailwind CSS.**
- **Keep component structure modular for scalability.**
- **Follow best practices for state management and component reusability.**

---

## 📢 Next Steps

🔥 **Tomorrow:** Refining animations and UI improvements for carousel & role selection.

---

🚀 **Project is now up-to-date!** 🚀

**Commit message suggestion:**

```sh

```
