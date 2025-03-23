# Real Estate Mobile App

A modern mobile app for browsing and searching real estate properties built with React Native and Expo.

## Demo

<p align="left">
  <img src="assets/gif/real-estate.gif" width="300" alt="App Demo" />
</p>

## Features

- 🏠 Browse featured and recommended properties
- 🔍 Search properties with filters
- 📱 View detailed property information
- 💬 See property reviews and ratings
- 👤 User profiles with authentication
- 📍 View property locations
- 🖼️ Gallery of property images
- 📱 Cross-platform support (iOS, Android)

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) with [Expo Router](https://docs.expo.dev/router/introduction/)
- **UI/Styling**: [NativeWind](https://www.nativewind.dev/) (TailwindCSS for React Native)
- **Backend**: [Appwrite](https://appwrite.io/) for authentication, database, and storage
- **Authentication**: OAuth2 with Google via Appwrite
- **State Management**: React Context API with custom hooks
- **Navigation**: File-based routing with Expo Router
- **Animation**: React Native Reanimated

## Project Structure

```
real-estate-app/
├── app/                  # Main application code (using Expo Router)
│   ├── (root)/           # Protected routes (require authentication)
│   │   ├── (tabs)/       # Tab navigation (Home, Explore, Profile)
│   │   └── properties/   # Property details pages
│   ├── _layout.tsx       # Root layout component
│   └── sign-in.tsx       # Authentication screen
├── assets/               # Static assets (images, fonts)
├── components/           # Reusable UI components
├── constants/            # App constants and static data
├── lib/                  # Utilities and API integrations
│   ├── appwrite.ts       # Appwrite SDK configuration and API methods
│   ├── data.ts           # Mock/seed data
│   ├── global-provider.tsx # Global state provider
│   └── useAppwrite.ts    # Custom hook for Appwrite data fetching
```

## Getting Started

### Prerequisites

- Node.js (LTS version)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Appwrite Account](https://appwrite.io/) for backend services

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/real-estate-app.git
   cd real-estate-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Create a `.env.local` file based on the `.env.example` and add your Appwrite credentials:

   ```
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=your_galleries_collection_id
   EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=your_reviews_collection_id
   EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=your_agents_collection_id
   EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=your_properties_collection_id
   ```

4. Start the Expo development server:
   ```bash
   npx expo start
   ```

## Appwrite Setup

1. Create a new project in Appwrite
2. Set up the following collections in your database:
   - Properties - stores property listings
   - Reviews - stores property reviews
   - Galleries - stores property images
   - Agents - stores real estate agent information
3. Configure OAuth provider (Google) for authentication
4. Set up appropriate attributes and indexes for each collection

## Key Components

- **Cards**: Displays property information in different formats (standard and featured)
- **Filters**: Filter properties by type (House, Apartment, Villa, etc.)
- **Search**: Search properties by name, address, or type
- **Comment**: Display user reviews and ratings

## Development

### Environment Variables

The app uses environment variables for configuration. Create a `.env.local` file with the required variables as shown in the installation section.

### Styling

The app uses NativeWind (TailwindCSS) for styling. Utility classes can be used directly in the components.

### Authentication

Authentication is handled via Appwrite's OAuth2 with Google. The authentication flow is set up in `lib/appwrite.ts`.

### Adding New Features

1. Create new screens in the appropriate directory under `app/`
2. Add new components in the `components/` directory
3. Update the database schema if needed
4. Add new API methods in `lib/appwrite.ts`

## License

[MIT License](LICENSE)

## Acknowledgments

- [Expo](https://expo.dev/) for providing the development framework
- [Appwrite](https://appwrite.io/) for the backend services
- [NativeWind](https://www.nativewind.dev/) for styling utilities
