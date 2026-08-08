# JWT Authentication Server

## Project Name
JWT Authentication Server

## Project Overview
This is the backend service for a full-stack authentication system. It provides REST API endpoints for:

- User registration
- Email/password login
- Google social login
- JWT-based authentication
- Protected private data access

The server is built with Express.js and TypeScript, and it connects to MongoDB using Mongoose.

## What I Learned
Through this project, I learned how to:

- Build a REST API with Express and TypeScript
- Implement JWT authentication
- Hash passwords using bcrypt
- Protect routes with middleware
- Connect a Node.js server to MongoDB
- Handle both local and social login flows
- Structure a backend project using controllers, routes, and models

## What I Used
### Backend Technologies
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- dotenv
- CORS

## Features
- Create a new user
- Login with email and password
- Social login with Google provider data
- Generate JWT token after successful authentication
- Protect private routes using middleware
- Return private data only for authenticated users

## Project Structure
```bash
jwt-authentication-server/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── index.ts
│   ├── controllers/
│   │   ├── private.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   └── user.models.ts
│   ├── routes/
│   │   ├── private.route.ts
│   │   ├── routes.ts
│   │   └── user.route.ts
│   └── types/
│       └── user.interface.ts
```

## API Endpoints
### User Routes
- POST /api/v1/users/createuser
  - Create a new user
- POST /api/v1/users/loginuser
  - Login user with email and password
- POST /api/v1/users/sociallogin
  - Login or create a user using Google data

### Private Routes
- GET /api/v1/private/getPrivateData
  - Returns private data for authenticated users

## Environment Variables
Create a `.env` file in the project root:

```env
PORT=5000
DATABASE_URI=mongodb://127.0.0.1:27017/jwt-authentication
JWT_SECRET=your_jwt_secret
```

## Installation
```bash
npm install
```

## Run the Server
### Development mode
```bash
npm run dev
```

### Production build
```bash
npm run build
npm start
```

## Notes
This server works as the authentication backend for the frontend app and handles secure user authentication using JWT tokens.
