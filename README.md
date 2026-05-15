# SkyBound Airlines – Distributed Flight Management Hub

SkyBound Airlines is a high-fidelity, client-side single-page application (SPA) engineered using React, Vite, and Tailwind CSS, coupled with an asynchronous mock REST API layer powered by `json-server`. 

##  Architecture & Core Components

- **MainLayout.jsx:** The persistent structural engine of the application. Manages consistent global headers and semantic layouts while leveraging React Router `useLocation` to compute navigation states and matching tree configurations.
- **Home.jsx:** The primary flight discovery and transaction module. Features dynamic in-memory client-side data streaming, a dual-layer string filtering array, and an object destructuring system for posting safe records.
- **Bookings.jsx:** Itinerary control interface that manages multi-class flight lifecycle tracking. Implements asynchronous `PATCH` mutation streams and conditional state arrays for immediate garbage collection.
- **Profile.jsx:** Identity context management dashboard providing direct read-access map views to model profiles.

##  Engineering Roles & Shared Branch Layout
- **Samuel (MainLayout Architect):** App Shell Framework & Navigation Highlights
- **Ayman (Home Page Engineer):** Flight Discovery Filtering, Sorting, & POST Transaction
- **Roy (Itinerary Manager):** Multi-Class Modification (PATCH) & Cancellation Streams (DELETE)
- **Caleb (Identity Lead):** Squad Identity Hub Mapping & User Context Views

##  Execution Guide
1. Install core runtime dependencies: `npm install`
2. Launch the JSON database server: `npx json-server --watch db.json --port 3001`
3. Spin up the client compiler: `npm run dev`

