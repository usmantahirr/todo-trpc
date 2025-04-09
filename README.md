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
The application is fully containerized and can be run in both production and development environments using Docker.

### Prerequisites:

- Ensure Docker and Docker Compose are installed on your system.
- Define environment variables:
   - Use a `.env.local` file in the project root or define variables directly in the `docker-compose.yml` file.
   - Example:
     ```env
     MONGODB_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/<database>?retryWrites=true&w=majority
     ```

### Running in Development Mode

1. Build the development image:

   ```bash
   docker-compose build
   ```

2. Start the development server:

   ```bash
   docker-compose up
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

This setup leverages the `development` stage defined in the `Dockerfile` and mounts the project directory for live reloading.

### Running in Production Mode

1. Build the production image with the target set to `production`:

   ```bash
   docker build -t todo-app --target runner .
   ```

2. Run the production container:

   ```bash
   docker run -p 3000:3000 -e MONGODB_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/<database>?retryWrites=true&w=majority todo-app
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000).

### Notes

- For production, ensure that sensitive environment variables (like `MONGODB_URI`) are securely managed.
- Use the following `Dockerfile` stages as needed:
   - **`base`**: Common Node.js base image for all stages.
   - **`deps`**: Handles dependencies installation.
   - **`builder`**: Builds the Next.js application.
   - **`runner`**: A lightweight production-ready image for deployment.
   - **`development`**: Optimized for local development with hot-reloading support.
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
