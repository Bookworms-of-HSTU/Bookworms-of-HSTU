## Overview

This document outlines the plan for creating an admin panel for the website. The admin panel will provide a centralized interface for managing various aspects of the site, including committee members, blogs, magazines, gallery events, and library books.

## Plan

1.  **Create the basic admin panel structure:** Design a clear and intuitive layout for the admin panel, using a card-based design to separate different management sections. - **Done**
2.  **Implement committee member management:** Add functionality to add, edit, and delete committee members in the about section. - **Done**
    *   Create a new page at `/admin/committee` for managing committee members.
    *   Add a dropdown to select one of the three committees: "Advisory Committee", "Executive Committee", and "Trustee Board".
    *   Add a form to add new members with fields for name, position, and photo.
    *   Display a table of existing members with "Edit" and "Delete" buttons.
    *   Implement state management for the form and member data.
    *   Add a modal for editing member information.
3.  **Implement blog management:** Create a system for writing, editing, and deleting blog posts. - **Done**
    *   Create a new page at `/admin/blogs` for managing blog posts.
    *   Add a form to add new blog posts with fields for title, author, content, and a feature image.
    *   Display a table of existing blog posts with "Edit" and "Delete" buttons.
    *   Implement state management for the form and blog data.
    *   Add a modal for editing blog posts.
4.  **Implement magazine management:** Develop a feature for managing magazine issues. - **Done**
    *   Create a new page at `/admin/magazines` for managing magazine issues.
    *   Add a form to upload new magazine issues with fields for title, issue number, a PDF file, and a cover image.
    *   Display a table of existing magazine issues with "Edit" and "Delete" buttons.
    *   Implement state management for the form and magazine data.
    *   Add a modal for editing magazine issues.
5.  **Implement gallery event management:** Add tools for organizing gallery events and managing photos. - **Done**
    *   Create a new page at `/admin/gallery` for managing gallery events.
    *   Add a form to create new gallery events with fields for title, date, and multiple images.
    *   Display a table of existing events with "Edit" and "Delete" buttons.
    *   Implement state management for the form and event data.
    *   Add a modal for editing gallery events.
6.  **Implement library book management:** Create a system for managing the library's book collection. - **Done**
    *   Create a new page at `/admin/library` for managing library books.
    *   Add a form to add new books with fields for title and author.
    *   Display a table of existing books with "Edit" and "Delete" buttons.
    *   Implement state management for the form and book data.
    *   Add a modal for editing book information.
7.  **Add admin layout and logout:** Create a consistent admin layout with a sidebar and a logout button. - **Done**
    *   Create a layout component for the admin section.
    *   Add a sidebar with links to all admin pages.
    *   Include a logout button with placeholder functionality.