# Todo App

A modern, full-stack todo application built with Next.js, TypeScript, tRPC, and MongoDB. The application allows users to create, manage, and persist their todo items across sessions.

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **API Layer**: tRPC
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Development**: Docker

## Features

- Create and manage todo items
- Mark todos as complete/incomplete
- Persistent storage using MongoDB
- Modern, responsive UI
- Real-time updates
- Type-safe API with tRPC

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Docker (optional)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Setup (Optional)

To run the application using Docker:

1. Build the Docker image:

```bash
docker build -t todo-app .
```

2. Run the container:

```bash
docker run -p 3000:3000 -e MONGODB_URI=your_mongodb_connection_string todo-app
```

## Project Structure

```
/
├── app/                # Next.js app router pages
│   └── api/trpc/[trpc] # TRPC Route configs Next app router
├── components/         # Reusable UI components
├── features/           # Feature-based modules
│   └── todo/           # Todo feature implementation
│       ├── api/        # tRPC routers
│       └── components  # Feature-specific components
├── lib/                # Utilities and types
├── server/             # Backend implementation
│   └── db/             # MongoDB connection and models
├── types/              # Shared TypeScript types
└── public/             # Static assets
```

## Development Guidelines

- Follow TypeScript best practices
- Use feature-based folder structure
- Implement proper error handling
- Write clean, maintainable code
- Follow the established project structure

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
