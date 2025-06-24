# Daily Knowledge - Educational Platform

## Overview

Daily Knowledge (ידע ליום) is a Hebrew educational platform that presents engaging daily topics across various subjects including science, history, arts, and technology. The application is designed to provide age-appropriate content for different learning levels, with a focus on making complex topics accessible and interesting for Hebrew-speaking audiences.

## System Architecture

The application follows a full-stack architecture with clear separation between client and server components:

- **Frontend**: React with TypeScript, using modern UI components and RTL (Right-to-Left) layout for Hebrew content
- **Backend**: Express.js server providing REST API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Build System**: Vite for fast development and optimized production builds
- **Deployment**: Configured for Replit with autoscale deployment target

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling via Tailwind CSS
- **Styling**: Tailwind CSS with custom RTL configuration and Hebrew font support
- **Component Library**: Comprehensive UI component system following shadcn/ui patterns

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **API Design**: RESTful endpoints with proper HTTP status codes and error handling
- **Development**: Hot reload with Vite integration in development mode

### Database Schema
The application uses two main entities:
- **Users**: Basic authentication with username/password
- **Topics**: Educational content with rich metadata including:
  - Multilingual titles (Hebrew/English)
  - Content categorization (science, history, arts, technology)
  - Age group targeting (3-7, 8-14, 15+)
  - Reading time estimation
  - Tags for enhanced discoverability
  - Daily topic and popularity flags

## Data Flow

1. **Content Discovery**: Users browse topics by category, age group, or popularity
2. **Daily Content**: System highlights featured daily topics
3. **Content Consumption**: Full topic pages with formatted content and metadata
4. **Search & Filter**: Multi-dimensional filtering by category, age, and search terms
5. **Archive Access**: Complete historical content browsing

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL (via @neondatabase/serverless)
- **UI Framework**: Radix UI component primitives
- **State Management**: TanStack Query for data fetching and caching
- **Form Handling**: React Hook Form with Zod validation
- **Development**: Replit-specific tooling for development environment

### Key Libraries
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Typography**: Google Fonts (Assistant, Alef) for Hebrew text rendering
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting and manipulation

## Deployment Strategy

The application is configured for deployment on Replit with the following characteristics:

- **Development**: Local development server on port 5000 with hot reload
- **Build Process**: Vite builds the frontend, esbuild bundles the backend
- **Production**: Node.js server serving both API and static assets
- **Database**: PostgreSQL integration with automatic migration support
- **Environment**: Environment variables for database connection and other configurations

The deployment supports both development and production environments with appropriate tooling for each context.

## Changelog

```
Changelog:
- June 22, 2025. Initial setup and full platform development
- June 22, 2025. Added comprehensive search functionality with Hebrew support
- June 22, 2025. Created detailed about page explaining platform mission
- June 22, 2025. Fixed API routing issues for daily and popular topics
- June 22, 2025. Reordered homepage sections per user preference (popular topics before quick navigation)
- June 22, 2025. Integrated PostgreSQL database with full data migration and production build
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```