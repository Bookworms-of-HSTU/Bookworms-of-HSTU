# Project Blueprint: Bookworms of HSTU Blog

## Overview

This is a Next.js application for the "Bookworms of HSTU" community. It serves as a blog platform where administrators can create, edit, and publish posts, and visitors can read them.

## Core Features

- **Framework**: Next.js 14 with App Router
- **Styling**: Next.js CSS Modules
- **Database**: Cloud Firestore
- **Authentication**: Firebase Authentication for the admin panel.
- **Admin Panel**: A protected area (`/admin`) for managing blog posts (Create, Read, Update, Delete).
- **Public-Facing Blog**: 
  - A homepage that displays a list of recent blog posts.
  - Individual blog post pages with dynamic routing based on a URL-friendly `slug`.
- **Newsletter Signup**: A component for users to subscribe to a newsletter.

## Design & Style

- **Homepage**: Features a prominent hero section with a title, subtitle, and a "Join Us" call-to-action button.
- **Blog Post Page**: Displays a large header image, the post title, publication date, and the formatted content.
- **Visuals**: The design uses a clean layout with modern typography and a consistent color scheme.

## Current Plan: Fix Blog Post Linking

**Goal**: Resolve the "Post not found" error by correcting how links to blog posts are generated.

**Problem Analysis**: Diagnostic information revealed that links to posts were being created using the Firestore Document ID instead of the `slug` field. This caused the post page to query the database for the wrong identifier.

**Steps**:

1.  **[COMPLETED]** Create this `blueprint.md` file.
2.  **[ACTIVE]** Add a "Recent Posts" section to the homepage (`app/page.js`) that fetches all posts from Firestore.
3.  **[PENDING]** Ensure the links for each post in the new section use the `slug` field for the `href` attribute (e.g., `/blog/[slug]`).
4.  **[PENDING]** Remove the diagnostic code from `app/blog/[slug]/page.js` and restore its original functionality.
