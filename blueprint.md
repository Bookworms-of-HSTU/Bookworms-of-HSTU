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
    *   A public page at `/notices` to display notices and news.
    *   Admin panel integration to add, edit, and delete notices.
    *   Data is stored in a `notices.json` file.
    *   Admins can add a date to each notice.
    *   The admin notice page has been polished with a professional and clean UI, including refined notice cards with hover effects, a sleeker modal for add/edit operations, and improved typography and spacing.
    *   Redundant titles have been removed for a cleaner look.
    *   Edit and delete buttons in the notice manager are now distinguishable with unique hover colors.
    *   Textfield overflow in the add/edit modal has been fixed.
*   **Contact Page:** A new page at `/contact` with a form for users to send messages.
*   **Admin Layout:** A consistent layout with a sidebar for navigation and a logout button.
*   **Newsletter Subscription:** A newsletter subscription form on the homepage to collect user emails.
*   **CTA Button:** The main call-to-action button on the homepage is "Join Us" and links to a placeholder URL.

## Current Request: Fix Notice Manager UI Issues

*   **Goal:** Address UI issues in the notice manager to improve usability.
*   **Steps:**
    1.  Make the edit and delete buttons distinguishable with unique hover colors. - **Done**
    2.  Fix the textfield overflow in the add/edit modal. - **Done**
    3.  Update the `blueprint.md` file to document these fixes. - **Done**

## Previous Plans

### Polish Notice Management UI

*   **Goal:** Refine the user interface of the admin's notice management page for a cleaner, more professional look.
*   **Steps:**
    1.  Remove the redundant "Manage Notices" title from the main page. - **Done**
    2.  Enhance the styling of the notice cards with hover effects and improved layout. - **Done**
    3.  Polish the add/edit modal with a sleeker design. - **Done**
    4.  Refine the overall typography and spacing for better readability. - **Done**
    5.  Update the `blueprint.md` to reflect these UI enhancements. - **Done**

### Enhance Notice Management

*   **Goal:** Add a date feature and improve the UI of the notice management system.
*   **Steps:**
    1.  Add a `date` field to each notice. - **Done**
    2.  Update the `NoticeManager` component with a date picker and a more refined, card-based layout. - **Done**
    3.  Modify the server actions to handle the new `date` field. - **Done**
    4.  Enhance the public notices page to display the date alongside each notice. - **Done**
    5.  Update the `blueprint.md` to reflect these changes. - **Done**

### Enhance Gallery with Carousel

*   **Goal:** Enhance the gallery with an interactive carousel.
*   **Steps:**
    1.  Create a reusable `Carousel.js` component with navigation and dot indicators. - **Done**
    2.  Create `Carousel.module.css` for styling. - **Done**
    3.  Update the `app/gallery/page.js` to use the new `Carousel` component instead of a static grid. - **Done**
    4.  Run linter to check for issues. - **Done**
    5.  Update the `blueprint.md` to reflect these changes. - **Done**
