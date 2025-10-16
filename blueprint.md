# Application Blueprint

## Overview

This is a comprehensive school management system that includes a public-facing website and a secure admin panel. The public website will feature pages for the school's mission, gallery, committee, magazines, and contact information. The admin panel will allow authorized users to manage the content of these pages.

## Implemented Features

### Design and Styling
- **Global Styles**: A global stylesheet (`app/globals.css`) has been created to define a consistent color scheme, typography, and layout for the entire application.
- **Modern Design**: The application uses a modern design aesthetic with a clean and intuitive user interface.
- **Custom Components**: Reusable UI components have been created for navigation, headers, footers, and other common elements.

### Load More Functionality
- **Blog**: The blog page now features a "Load More" button that fetches and displays additional blog posts without a full page reload.
- **Notices**: The notices page now includes a "Load More" button to load and display older notices and news items.
- **Gallery**: The gallery has been enhanced with a "Load More" button to progressively load and display more image galleries.
- **Library**: The library page now has a "Load More" button to fetch and display more books from the collection.

### Newsletter Subscription
- **Firestore Integration**: The newsletter subscription functionality has been refactored to use a secure `subscribers` collection in the Firestore database, replacing the previous file-based storage system. This ensures scalability, data integrity, and enhanced security for subscriber information.

## Bug Fixes

### Duplicate Key Error
- **Affected Pages:** Gallery, Library, Notices
- **Problem:** A recurring "duplicate key" error was causing data-loading issues on several pages. This was due to React's Strict Mode in development, which caused the initial data to be fetched and rendered twice.
- **Solution:** The data-fetching logic on the affected pages has been updated to be more resilient. The initial data load now **replaces** the existing content, while subsequent "Load More" clicks **append** new data. This prevents duplicate items from being rendered and resolves the error.
