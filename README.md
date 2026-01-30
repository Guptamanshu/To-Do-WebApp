# To-Do Web App

A full-stack task management application built with React.js and Node.js/Express. This app allows users to organize their tasks into boards and manage todos with full CRUD operations.

## Features

- 🔐 **Email-based Authentication** - Secure login and registration with JWT tokens
- 📋 **Board Management** - Create, edit, and delete boards with custom colors
- ✅ **Todo Management** - Create, update, and delete todos within boards
- 🎯 **Status Tracking** - Track todo status (pending, in-progress, completed)
- 🏷️ **Priority Levels** - Set priority (low, medium, high) for todos
- 📅 **Due Dates** - Add due dates to todos
- 🎨 **Modern UI** - Beautiful, responsive user interface

## Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS3 with modern design patterns

## Project Structure

```
To-Do-App/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB models (User, Board, Todo)
│   ├── routes/          # API routes
│   ├── server.js        # Express server entry point
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── context/     # React context (AuthContext)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # React entry point
│   ├── index.html       # HTML template
│   ├── vite.config.js   # Vite configuration
│   └── package.json     # Frontend dependencies
└── README.md            # This file
```

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd To-Do-App
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your-secret-key-change-this-in-production
   JWT_EXPIRE=7d
   ```

   For MongoDB Atlas, use:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   ```

   Optionally, create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   # On Windows
   mongod

   # On macOS/Linux
   sudo systemctl start mongod
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

   For development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Board Endpoints

#### Get All Boards
```http
GET /api/boards
Authorization: Bearer <token>
```

#### Get Single Board
```http
GET /api/boards/:id
Authorization: Bearer <token>
```

#### Create Board
```http
POST /api/boards
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Board",
  "description": "Board description",
  "color": "#3B82F6"
}
```

#### Update Board
```http
PUT /api/boards/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "color": "#10B981"
}
```

#### Delete Board
```http
DELETE /api/boards/:id
Authorization: Bearer <token>
```

### Todo Endpoints

#### Get Todos by Board
```http
GET /api/boards/:boardId/todos
Authorization: Bearer <token>
```

#### Get Single Todo
```http
GET /api/todos/:id
Authorization: Bearer <token>
```

#### Create Todo
```http
POST /api/boards/:boardId/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Todo",
  "description": "Todo description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-12-31"
}
```

#### Update Todo
```http
PUT /api/todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Todo",
  "status": "in-progress",
  "priority": "high"
}
```

#### Delete Todo
```http
DELETE /api/todos/:id
Authorization: Bearer <token>
```

#### Update Todo Order
```http
PUT /api/todos/:id/order
Authorization: Bearer <token>
Content-Type: application/json

{
  "order": 5
}
```

## Usage Guide

### Getting Started

1. **Register an Account**
   - Click "Sign up" on the login page
   - Enter your name, email, and password
   - Click "Sign Up"

2. **Create Your First Board**
   - After logging in, click "Create Board"
   - Enter a title and optional description
   - Choose a color for your board
   - Click "Create"

3. **Add Todos to a Board**
   - Click on a board to open it
   - Click "Create Todo"
   - Fill in the todo details (title, description, status, priority, due date)
   - Click "Create"

4. **Manage Your Todos**
   - Click on a todo to view details
   - Use the status dropdown to change todo status
   - Click the edit icon to modify a todo
   - Click the delete icon to remove a todo
   - Use the filter buttons to view todos by status

5. **Organize Your Boards**
   - Edit board details by clicking the edit icon
   - Delete boards (and all their todos) by clicking the delete icon
   - Use the color-coded boards for visual organization

## Development

### Backend Development

The backend uses Express.js with the following structure:
- **Models**: Mongoose schemas for User, Board, and Todo
- **Controllers**: Business logic for each route
- **Routes**: API endpoint definitions
- **Middleware**: Authentication and validation

### Frontend Development

The frontend uses React with:
- **Components**: Reusable UI components
- **Pages**: Main page components
- **Context**: Global state management (AuthContext)
- **Services**: API communication layer

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```
The production build will be in the `frontend/dist` directory.

## Development Progress

This project was developed in 12 steps:

- ✅ Step 1: Project structure setup
- ✅ Step 2: Backend setup
- ✅ Step 3: Database setup
- ✅ Step 4: Authentication
- ✅ Step 5: Boards API
- ✅ Step 6: Todos API
- ✅ Step 7: Frontend setup
- ✅ Step 8: Authentication UI
- ✅ Step 9: Boards UI
- ✅ Step 10: Todos UI
- ✅ Step 11: Integration
- ✅ Step 12: Documentation

## Commit History

All development steps have been committed separately:
- Each step has its own commit with a descriptive message
- The commit history shows the incremental development process
- All commits follow the pattern: "Step X: Description"

## Security Notes

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Passwords are hashed using bcrypt
- All API routes (except auth) require authentication
- Input validation is performed on both client and server

## Future Enhancements

Potential improvements:
- Email verification
- Password reset functionality
- Todo drag-and-drop reordering
- Board sharing and collaboration
- Todo attachments
- Search and filtering
- Dark mode
- Mobile app version

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues or questions, please check the code comments or create an issue in the repository.
