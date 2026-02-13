# Smart CP Hint Extension

**Smart CP Hint Extension** is a Chrome extension that provides AI-powered hints and code suggestions for competitive programming problems from websites like **LeetCode, Codeforces, CodeChef, and AtCoder**. It uses a local large language model (LLM) backend to generate level-based hints and complete solutions.

---

## Features

- Extracts problem statements directly from the web page.
- Provides **level-wise hints**:
  - **Hint 1:** subtle hint requiring some thought.
  - **Hint 2:** easier hint, more guidance.
  - **Hint 3:** detailed hint, almost full solution.
- Generates complete code in **Python, C++, or Java**.
- Floating button on the problem page for easy access.

---

## Folder Structure

- cp_hint_extension/ # Chrome extension files
  - background.js
  - content.js
  - manifest.json
  - icon.png
  - popup.html
  - popup.js
  - style.css
- cp_hint_backend/ # Node.js backend server
  - server.js
  - package.json
  - package-lock.json
  - node_modules/

---

## Prerequisites

- **Node.js** (v18+ recommended)
- **Chrome browser** (for testing extension)
- **Local LLM** (e.g., WizardLM GGUF model) running on `127.0.0.1:7860`  
  - Make sure the model is loaded and accessible via the API endpoint.

---

## Backend Setup

1. Open terminal and navigate to `cp_hint_backend` folder:

```bash
cd cp_hint_backend
```

2. Install dependencies:

```bash
npm install
```
3. Start the backend server:

```bash
node server.js
```
The backend will run on: http://localhost:5000

---

## Chrome Extension Setup
1. Open Chrome and go to chrome://extensions/
2. Enable Developer Mode (toggle top-right)
3. Click Load unpacked
4. Select the cp_hint_extension folder
5. Open a supported competitive programming problem page
6. A floating CP Hint button should appear

---

## Usage

1. Get Hint:
- Click Get Hint for level 1, 2, or 3 hints (adjust level in popup if implemented).
2. Generate Code:
- Select your language from the dropdown (Python, C++, Java)
- Click Get Code to generate the full solution
