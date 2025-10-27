# Bookworms of HSTU - Project Wiki & Documentation

This document serves as the central wiki and technical documentation for the "Bookworms of HSTU" web application. It outlines the project's architecture, features, and development practices.

---

## 1. Project Overview

**Bookworms of HSTU** is a web application designed for the community of readers and writers at Hajee Mohammad Danesh Science and Technology University. It aims to provide a platform for members to connect, share their work, and engage in literary discussions.

The application is built as a **Progressive Web App (PWA)**, ensuring a reliable, fast, and engaging user experience that works seamlessly across all devices, including installable desktop and mobile applications.

---

## 2. Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
*   **Language:** JavaScript
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** Global CSS (`app/globals.css`)
*   **PWA Features:**
    *   Service Worker API for offline caching.
    *   Web App Manifest for installability.
    *   Window Controls Overlay for a native desktop experience.
*   **Version Control:** Git & GitHub

---

## 3. Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── app/
│   ├── components/         # Reusable React components
│   │   └── ServiceWorkerRegistration.js # Logic to register the service worker
│   ├── globals.css         # Global stylesheets
│   ├── layout.js           # Root application layout
│   └── page.js             # Main homepage component
├── public/
│   ├── logo500x500.png     # App icon
│   ├── manifest.json       # PWA Web App Manifest
│   └── service-worker.js   # PWA Service Worker script
├── .gitignore
├── next.config.mjs
├── package.json
└── README.md
```

---

## 4. Progressive Web App (PWA) Implementation

Significant effort has been made to enhance the application with PWA features, making it installable and capable of offline operation.

### 4.1. Service Worker

*   **File:** `public/service-worker.js`
*   **Purpose:** To provide offline capabilities by intercepting network requests and serving cached assets when the user is offline.
*   **Caching Strategy:**
    1.  **On Install:** The service worker pre-caches essential static assets (`/`, `manifest.json`, key icons, and stylesheets) using a versioned cache (`bookworms-of-hstu-cache-v2`).
    2.  **On Activate:** It cleans up any old, unused caches to ensure the app uses the latest assets.
    3.  **On Fetch:** It employs a "cache-first" strategy. For any request, it first checks if a valid response exists in the cache. If not, it fetches the resource from the network, serves it to the user, and simultaneously stores a copy in the cache for future offline use.

### 4.2. Web App Manifest

*   **File:** `public/manifest.json`
*   **Purpose:** Provides the necessary metadata for the browser to recognize the application as an installable PWA.
*   **Key Properties Configured:**
    *   `name`, `short_name`, `description`: Core identity of the app.
    *   `display: "standalone"`: Opens the app in its own window, without browser UI.
    *   `id: "/"`: Provides a stable and unique identity for the PWA.
    *   `icons`: Specifies the application icon for different device sizes.
    *   `screenshots`: Provides preview images for the PWA installation prompt.
    *   `display_override: ["window-controls-overlay"]`: Enables the custom title bar feature.

### 4.3. Window Controls Overlay

*   **Purpose:** To create a more immersive and native-like experience for the **installed desktop PWA**. This feature hides the default system title bar and allows the app's content to extend into that area.
*   **Implementation:**
    1.  **Manifest:** The `"display_override": ["window-controls-overlay"]` property was added to `public/manifest.json`.
    2.  **CSS:** The `app/globals.css` file was updated to add padding to the top of the application layout, but *only* when the overlay is active. This is achieved using the `env(titlebar-area-height)` CSS variable, which dynamically adjusts to prevent app content from being hidden behind the window control buttons (minimize, maximize, close).

---

## 5. Branching & Deployment Strategy

*   **`main` Branch:** This is the primary branch representing the stable, production-ready version of the application.
*   **`alpha` Branch:** This is a development branch used for implementing and testing new features. Changes are merged from `alpha` into `main` only after they are confirmed to be stable and complete.

This workflow ensures that the `main` branch always remains in a deployable state.
