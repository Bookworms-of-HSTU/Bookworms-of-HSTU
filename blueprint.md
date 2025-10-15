## Overview

This document outlines the plan for creating an admin panel for the website. The admin panel will provide a centralized interface for managing various aspects of the site, including committee members, blogs, magazines, gallery events, and library books.

## Style, Design, and Features

*   **Admin Panel:** A comprehensive admin panel to manage site content.
*   **Layout:** A clean, card-based design for easy navigation.
*   **Committee Management:** Add, edit, and delete committee members.
*   **Blog Management:** Add, edit, and delete blog posts.
*   **Magazine Management:** Add, edit, and delete magazine issues.
*   **Gallery Management:**
    *   Admins can create, edit, and delete gallery events.
    *   Admins can dynamically add, edit, and delete image links for each event.
    *   A custom Next.js image loader is used for optimization.
    *   The public gallery now uses a carousel component to display event images, providing a more interactive user experience with navigation buttons and dot indicators.
*   **Library Management:**
    *   Add, edit, and delete library books using a `books.json` file for data persistence.
    *   Fields: Title, Author, Availability (Hardcopy and/or Softcopy), PDF Link.
    *   Public-facing library displays availability with a "View PDF" button for softcopies and text indicating hardcopy availability.
*   **Notice and News Management:**
    *   A public page at `/notices` to display notices and news in a full-width, single-column layout.
    *   Notices are sorted by date in descending order, showing the latest notice first.
    *   Admin panel integration to add, edit, and delete notices.
    *   Data is stored in a `notices.json` file.
    *   The admin notice page has been polished with a professional and clean UI, including refined notice cards with hover effects, a sleeker modal for add/edit operations, and improved typography and spacing.
*   **Contact Page:** A new page at `/contact` with a form for users to send messages.
*   **Admin Layout:** A consistent layout with a sidebar for navigation and a logout button.
*   **Newsletter Subscription:** A newsletter subscription form on the homepage to collect user emails.
*   **CTA Button:** The main call-to-action button on the homepage is "Join Us" and links to a placeholder URL.
*   **Navbar:**
    *   The site logo has been added to the top-left of the navbar and its size increased.
    *   The navbar background color has been changed to a dark purple (`#3B006A`).
    *   Navigation link colors have been adjusted for better visibility against the new background.

## Firebase Integration

*   **Goal:** Integrate Firebase to provide a robust backend for the application.
*   **Current Project:** `a-simple-chatapp`
*   **Previous Project:** `prince-firebase` (decommissioned due to organization policy restrictions)
*   **Steps:**
    1.  **Login to Firebase:** Successfully logged into the user's Firebase account.
    2.  **Switch Project:** Switched to the `a-simple-chatapp` project to bypass security restrictions.
    3.  **Create Web App:** Created a new web app for the project to get the necessary SDK configuration.
    4.  **Configure Firebase:** Updated the `lib/firebase.js` file with the new Firebase SDK configuration.
    5.  **Install SDK:** Installed the `firebase` package using npm.

## Firestore Data Migration

*   **Goal:** Populate the Firestore database with the existing data from the JSON files.
*   **Completed:**
    *   **Notices:** Migrated `notices.json` to a "notices" collection in Firestore. The application now fetches notice data from Firestore.

## Admin Route Refactoring

*   **Goal:** Secure the admin panel by moving all admin-related routes to a protected area that requires authentication.
*   **Implementation:**
    *   Created a `(protected)` route group within the `app/admin` directory.
    *   Implemented middleware to check for a valid user session. If a user is not authenticated, they are redirected to the login page.
*   **Moved Routes:**
    *   `/admin/committee` -> `/admin/(protected)/committee`
    *   `/admin/blogs` -> `/admin/(protected)/blogs`
    *   `/admin/magazines` -> `/admin/(protected)/magazines`
    *   `/admin/gallery` -> `/admin/(protected)/gallery`
    *   `/admin/library` -> `/admin/(protected)/library`
    *   `/admin/notices` -> `/admin/(protected)/notices`
    *   `/admin/messages` -> `/admin/(protected)/messages`
