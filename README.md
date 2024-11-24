# Document Blinds
## Overview
Chrome extention to focus on reading, hiding parts of article you aren'n reading.
## Build
1. `pnpm install`
2. `pnpm build`
## Structure
- Using WXT, a JavaScript (TypeScript) framework for building browser extensions, along with React:
1. Background
    - Manages configuration data through `chrome.runtime`.
2. Content
    - Appends and manages blinds on the active tab.
3. Popup
    - Provides a user interface for configuration.
