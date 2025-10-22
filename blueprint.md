
# Project Blueprint: Bookworms of HSTU Website

## 1. Overview

This document outlines the architecture, features, and ongoing development plan for the official website of the Bookworms of HSTU, a student book club at Hajee Mohammad Danesh Science and Technology University. The project is built using Next.js with the App Router and is hosted on Vercel.

---

## 2. Implemented Features & Design

This section documents the current state of the application.

### Core Architecture
*   **Framework:** Next.js 14+ (App Router)
*   **Language:** JavaScript (React)
*   **Styling:** CSS Modules, Global CSS (`globals.css`)
*   **Deployment:** Vercel

### Design & UX
*   **Fonts:** Poppins (for general UI) and Playfair Display (for headings and emphasis) are used to create a modern and elegant feel.
*   **Layout:** The site uses a responsive layout with a main navigation bar and a consistent footer.
*   **Favicon:** `logo.png` is used as the site's favicon.

### Pages & Routing
*   `/` (Home): The main landing page.
*   `/about`: Page providing information about the club.
*   `/blog`: A section for articles and posts.
*   `/contact`: A page with contact information.
*   `/library`: A section to showcase the club's book collection.
*   `/admin`: A password-protected area for administrative tasks.

### Technical Features
*   **SEO & Social Sharing:**
    *   Dynamic metadata is generated for each page using `metadata` objects.
    *   Correct Open Graph (`og:image`, `og:title`, etc.) and Twitter Card metadata is configured using the canonical production URL (`https://bookworms-of-hstu.vercel.app`) to ensure consistent and correct link previews on all social platforms.
    *   The preview image is set to `og-image.jpg` (1200x630).
*   **Analytics:**
    *   Vercel Speed Insights is integrated for performance monitoring.
    *   Google Analytics is set up for traffic analysis.
*   **Sitemap:** A `sitemap.js` is included for better search engine indexing.

---

## 3. Current Task: Add New Content Pages

This section outlines the plan for the current development request.

### Goal
To add three new informational pages to the website: "Committee," "Magazine," and "Gallery."

### Action Plan
1.  **Create Committee Page:**
    *   Create a new route at `/committee`.
    *   Add a placeholder UI to `app/committee/page.js` with a title and a simple grid to later display member profiles.
2.  **Create Magazine Page:**
    *   Verify the existing route at `/magazine`.
    *   Update `app/magazine/page.js` with a placeholder UI to feature club publications.
3.  **Create Gallery Page:**
    *   Verify the existing route at `/gallery`.
    *   Update `app/gallery/page.js` with a placeholder UI to display a photo gallery.
4.  **Update Navigation:**
    *   Modify the `app/components/Navbar.js` component to add navigation links for "Committee," "Magazine," and "Gallery."

