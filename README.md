# 🛒 Shopping List — Electron Desktop App

A simple, cross-platform desktop app built with **Electron**.  
Quickly add, clear, and remove shopping list items with a custom menu, multi-window support, IPC messaging, and handy keyboard shortcuts.  
Styled with **Materialize CSS** and packaged for **Windows**, **macOS**, and **Linux**.

---

## ✨ Features
- **Add items** via a separate “Add Item” window
- **Double-click** to remove individual items
- **Clear all items** from the menu
- **Custom app menu** with keyboard shortcuts:
  - `Ctrl+N` / `Cmd+N` → Add Item
  - `Ctrl+Q` / `Cmd+Q` → Quit
  - `Ctrl+I` / `Cmd+I` → Toggle DevTools (dev mode only)
  - `Ctrl+R` → Reload (dev mode only)
- **Multi-window flow** (Main window + Add Item window)
- **IPC messaging** between windows
- **Materialize CSS** for simple styling

> ℹ️ Note: Items are stored in memory only. Closing the app clears the list.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
Clone the repo and install dependencies:

```bash
git clone https://github.com/polmayur01/shopping-list-electron.git
cd shopping-list-electron
npm install
