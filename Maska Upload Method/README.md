# MASKA Tiktok Upload Method (Chrome Extension)

## Installation (Developer Mode)

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder: `Maska Upload Method`.
5. Pin/open the extension popup and use the master switch.

## Usage

1. Click the extension icon.
2. Turn the switch **ON** (`ENABLED`) to activate behavior.
3. Open TikTok Studio (`https://www.tiktok.com/tiktokstudio`...).
4. Upload your Video
5. Wait for the countdown to be done and Upload it (GG!!!)

If you wanna disabled it, Keep it **OFF** (`DISABLED`) to run without request changes.


When enabled, it injects runtime logic that modifies specific upload request payload fields before they are sent.

## What this extension does

- Adds a popup UI with an ON/OFF switch (`ENABLED` / `DISABLED`).
- Saves the switch state in `chrome.storage.local` as `sysActive`.
- Injects `app-utils.js` into TikTok Studio pages through a content script.
- Shows a visual toast on the page when the method is active.
- Intercepts both `fetch` and `XMLHttpRequest` requests containing `project/post` and conditionally edits JSON payload data.

## Main features

- **Master toggle**  
  Switch behavior instantly from the extension popup.

- **Persistent state**  
  Keeps your selected state across browser restarts via local extension storage.

- **Request processing (when active)**  
  For matching request bodies, the extension attempts to:
  - adjust `post_common_info.post_type`
  - remove `vedit_common_info.draft`
  - remove `single_post_feature_info.vedit_segment_info`

- **UI feedback**  
  Displays a short in-page toast: `✧ MASKA UPLOAD METHOD ACTIVE ✧`.

## How it works (technical flow)

1. `background.js` initializes `sysActive` to `false` on first install.
2. `main-content.js` runs on TikTok Studio pages at `document_start`.
3. `main-content.js` injects `app-utils.js` into page context (required to patch native page APIs).
4. Popup switch updates `sysActive` in storage and sends a `TOGGLE_STATE` message to the active tab.
5. Page logic receives `SysStateUpdate` events and enables/disables request modification behavior.

## Files overview

- `manifest.json` - extension configuration (MV3, permissions, content scripts, background service worker).
- `popup.html` / `popup.js` - extension popup UI and toggle logic.
- `main-content.js` - content script bridge + in-page status toast.
- `app-utils.js` - request interception and payload mutation logic.
- `background.js` - install-time default state setup.
- `icons/` - extension icons used in popup and browser UI.

## Permissions and host access

- `permissions`: `storage`
  - used only to save/read `sysActive`.

- `content_scripts.matches`:
  - `https://www.tiktok.com/tiktokstudio*`

- `web_accessible_resources.matches`:
  - `https://www.tiktok.com/*` (for `app-utils.js` injection)


## Notes and limitations

- This extension targets current TikTok Studio request patterns; if TikTok changes endpoints/payload schema, behavior may need updates.
- Request edits only run when:
  - the extension is active, and
  - request URL contains `project/post`, and
  - body is valid JSON.
- `URL.createObjectURL` is overridden while active in page context.

## Package scripts

`package.json` includes:

- `build:protect`: `node scripts/build-protect.js`

In this repository snapshot, the referenced `scripts/build-protect.js` file is not present.

## License

Copyright (c) 2026 Maska.

This project is licensed under the
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/).

You may share this work for non-commercial use with proper attribution.
Commercial use and derivative works require explicit permission.
