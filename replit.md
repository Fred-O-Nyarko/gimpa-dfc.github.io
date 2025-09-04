# Overview

This is a web-based timetable management system for GIMPA (Ghana Institute of Management and Public Administration), specifically designed for the MSc Digital Forensics and Cyber Security program. The application displays academic schedules in a clean, organized format and includes administrative functionality for updating timetable data. It's built as a modern Next.js application with both student-facing views and admin management capabilities, featuring a simple backend API that persists data to a JSON file.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Next.js 15** with App Router for modern React-based web application
- **TypeScript** for type safety and better development experience
- **Client-side components** for the main timetable display with React hooks for state management
- **Component-based architecture** with reusable UI components (Header, TimeSlot, DaySection, AdminPanel)
- **CSS-based styling** with custom global styles and Google Fonts integration
- **Responsive design** optimized for desktop and mobile viewing

## Backend Architecture
- **Next.js API Routes** providing RESTful endpoints for timetable data management
- **JSON file database** stored in `/data/timetable.json` for timetable information persistence
- **Server-side file operations** using Node.js fs module for data persistence
- **Simple authentication** using hardcoded password for admin access
- **RESTful API** with GET and POST endpoints for reading and updating timetable data

## Data Management
- **JSON data structure** with strongly typed interfaces for university info, time slots, and schedules
- **Local file storage** in `/data/timetable.json` for timetable data
- **In-memory state management** using React hooks for UI state
- **Real-time updates** between admin panel and display view

## Security Model
- **Basic password authentication** for administrative functions
- **Client-side admin panel** with form-based login
- **No caching headers** configured to ensure fresh data display
- **Type-safe API interactions** with proper error handling

## Development Configuration
- **Modern build tools** with ES modules and bundler module resolution
- **Development server** configured on port 5000
- **TypeScript strict mode** with path mapping for clean imports
- **Hot reloading** for efficient development workflow

# External Dependencies

## Core Framework Dependencies
- **Next.js 15.5.2** - Full-stack React framework for web applications
- **React 19.1.1** and **React DOM 19.1.1** - Core React libraries for UI rendering
- **TypeScript 5.2.2** - Static type checking and enhanced developer experience

## UI and Icon Libraries  
- **Lucide React 0.263.1** - Modern icon library for UI components
- **Google Fonts (Montserrat)** - Web font service for typography

## Development Tools
- **@types packages** - TypeScript definitions for Node.js, React, and React DOM
- **Sharp image optimization** - Built-in Next.js image processing (automatically included)

## File System Operations
- **Node.js fs module** - Built-in file system operations for data persistence
- **Node.js path module** - Built-in path utilities for file operations

The application has minimal external dependencies, focusing on core web technologies with a lightweight architecture that can be easily deployed and maintained.