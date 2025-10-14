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
*   **Library Management:**
    *   Add, edit, and delete library books using a `books.json` file for data persistence.
    *   Fields: Title, Author, Availability (Hardcopy and/or Softcopy), PDF Link.
    *   Public-facing library displays availability with a "View PDF" button for softcopies and text indicating hardcopy availability.
*   **Contact Page:** A new page at `/contact` with a form for users to send messages.
*   **Admin Layout:** A consistent layout with a sidebar for navigation and a logout button.

## Current Request: Improve Gallery Image Management

*   **Goal:** Improve the user interface for managing gallery images in the admin panel.
*   **Steps:**
    1.  **Update Admin Gallery Page:** Replaced the comma-separated text field with an interactive interface that allows admins to dynamically add, edit, and delete individual image links. - **Done**
    2.  Update the `blueprint.md` to reflect these changes. - **Done**

## Previous Plans

### Use Image Links in Gallery

*   **Goal:** Modify the gallery to use external image links instead of local uploads.
*   **Steps:** Replaced the file upload with a text field for comma-separated image URLs, created a custom image loader, and configured Next.js to use it.

### Connect Admin Panel to Public Library

*   **Goal:** Connect the admin panel to the public library so that changes made in the admin panel are reflected in the public library.
*   **Steps:** Implemented a file-based data persistence strategy using a `books.json` file and server actions.

### Implement Flexible Library Availability

*   **Goal:** Allow a book to be available as a hardcopy, a softcopy, or both.
*   **Steps:** Implemented checkboxes for availability in the admin panel and updated the public library page to reflect the new availability options.

### Implement Enhanced Library Availability

*   **Goal:** Enhance the library feature to allow admins to specify book availability as "Hardcopy" or "Softcopy" with a PDF link.
*   **Steps:** Implemented a dropdown for availability and updated the public library page accordingly.

### Fix 404 Error and Restore Public Library

*   **Goal:** Resolve a persistent 404 error caused by the accidental deletion of the public library page.
*   **Steps:** Restored the public library page, corrected navigation, and created a contact page.

### Initial Admin Panel Creation

*   **Steps:** Created the basic admin panel structure and implemented management for committees, blogs, magazines, galleries, and the library.
