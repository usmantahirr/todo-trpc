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
The application is fully containerized, supporting both development and production environments. Follow the instructions below to configure and use Docker.

### Prerequisites

Ensure the following tools are installed on your system:
- Docker
- Docker Compose

### Running in Development Mode

1. **Create a `.env.local` file** with your MongoDB connection string (if not already present):
    ###### Note: You will only need this if you want to use (3) remote mongo instance, local is setting it up inside `package.json` file itself  
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/<database>?retryWrites=true&w=majority
   ```
2. **Start the Development Environment with local mongo**:
   ```bash
   npm run docker:up-local-mongo
   ```
3. **Start the Development Environment with remote mongo**:
   ```bash
   npm run docker:up
   ```

4. **Access the app locally**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

The development environment supports live-reloading via `nodemon` or `Next.js` hot-reloading.

### Running in Production Mode

1. **Build the Production Image**:
   ```bash
   docker build -t todo-app --target runner .
   ```

2. **Run the Production Container**:
   ```bash
   docker run -p 3000:3000 -e MONGODB_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/<database>?retryWrites=true&w=majority todo-app
   ```

3. **Access the Production App**:
   Open [http://localhost:3000](http://localhost:3000).

### Using Remote MongoDB with Docker Compose

1. Create or update `docker-compose.remote.yml` to handle your remote MongoDB URL:
   ```yaml
   version: "3.8"

   services:
     app:
       build:
         context: .
         target: runner
       ports:
         - "3000:3000"
       environment:
         NODE_ENV: production
         MONGODB_URI: your_mongodb_connection_string
   ```

2. Start the remote environment:
   ```bash
   docker-compose -f docker-compose.remote.yml up --build
   ```

---

### Notes
- For production, always manage sensitive credentials (like `MONGODB_URI`) using environment secrets or a secure vault.
- The `Dockerfile` includes support for:
    - Lightweight **production builds** using standalone mode.
    - Fully-featured **development builds** supporting live-reloading.

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
