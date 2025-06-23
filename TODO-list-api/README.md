# Personal Todo API - Complete Project Guide

## Project Overview

The Personal Todo API is a RESTful backend service that allows users to manage their daily tasks and todos. This API provides a comprehensive task management system where users can create, organize, and track their todos with different priorities and completion statuses.

## What the API Does

This API serves as the backend for a personal task management application. It handles all the core functionality needed to:

- Store and manage todo items in a MongoDB database
- Provide RESTful endpoints for creating, reading, updating, and deleting todos
- Allow advanced filtering and sorting of todos based on various criteria
- Track completion status and manage task priorities
- Provide comprehensive validation to ensure data integrity
- Generate statistics for dashboard functionality

## Todo Model Structure

### Todo Schema (Mongoose Model)

```javascript
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return !value || value >= new Date();
      },
      message: "Due date cannot be in the past",
    },
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, "Category cannot exceed 50 characters"],
    default: "general",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
todoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});
```

### Model Fields Explanation

The todo model features **8 essential fields**:

- **title** - The main task description (required, max 100 characters)
- **description** - Optional detailed description of the task (max 500 characters)
- **completed** - Boolean flag indicating if the task is done (defaults to false)
- **priority** - Task importance level: low, medium, high (defaults to medium)
- **dueDate** - Optional deadline for the task (must be future date)
- **category** - Optional category for grouping tasks (max 50 characters, defaults to "general")
- **createdAt** - Timestamp when the todo was created (auto-generated)
- **updatedAt** - Timestamp when the todo was last modified (auto-updated)

## API Routes and Endpoints

### Base URL: `/api/todos`

### 1. **GET /api/todos** - Get All Todos

- **Purpose**: Retrieve all todos with optional filtering and sorting
- **Query Parameters**:
  - `completed`: Filter by completion status (true/false)
  - `priority`: Filter by priority (low/medium/high)
  - `category`: Filter by category name
  - `sort`: Sort by field (createdAt, dueDate, priority, title)
  - `order`: Sort order (asc/desc, defaults to desc)
- **Response**: Array of todo objects with count
- **Example**: `GET /api/todos?completed=false&priority=high&sort=dueDate&order=asc`

### 2. **GET /api/todos/:id** - Get Single Todo

- **Purpose**: Retrieve a specific todo by ID
- **Parameters**: `id` - MongoDB ObjectId of the todo
- **Response**: Single todo object
- **Error**: 404 if todo not found

### 3. **POST /api/todos** - Create New Todo

- **Purpose**: Create a new todo item
- **Request Body**:
  ```json
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "priority": "high",
    "dueDate": "2024-02-15T10:00:00Z",
    "category": "work"
  }
  ```
- **Response**: Created todo object with generated ID
- **Status**: 201 Created

### 4. **PUT /api/todos/:id** - Full Update

- **Purpose**: Update an existing todo (complete replacement)
- **Parameters**: `id` - MongoDB ObjectId of the todo
- **Request Body**: Complete todo object with updates
- **Response**: Updated todo object
- **Status**: 200 OK

### 5. **PATCH /api/todos/:id** - Partial Update

- **Purpose**: Partially update a todo (specific fields only)
- **Parameters**: `id` - MongoDB ObjectId of the todo
- **Request Body**: Only the fields to update
- **Response**: Updated todo object
- **Status**: 200 OK

### 6. **DELETE /api/todos/:id** - Delete Todo

- **Purpose**: Delete a specific todo
- **Parameters**: `id` - MongoDB ObjectId of the todo
- **Response**: Success message
- **Status**: 200 OK

### 7. **PATCH /api/todos/:id/toggle** - Toggle Completion

- **Purpose**: Quick toggle for completion status
- **Parameters**: `id` - MongoDB ObjectId of the todo
- **Response**: Updated todo object with toggled completion status
- **Status**: 200 OK

### 8. **GET /api/todos/stats** - Get Statistics

- **Purpose**: Get comprehensive statistics about todos
- **Response**: Statistics object with counts and breakdowns
- **Example Response**:
  ```json
  {
    "total": 25,
    "completed": 15,
    "pending": 10,
    "completionRate": 60,
    "priorityBreakdown": {
      "high": 5,
      "medium": 12,
      "low": 8
    },
    "categoryBreakdown": {
      "work": 10,
      "personal": 8,
      "shopping": 4,
      "general": 3
    },
    "overdueTasks": 3,
    "upcomingTasks": 7
  }
  ```

## Request/Response Examples

### Creating a Todo

**Request:**
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, and fruits",
  "priority": "medium",
  "dueDate": "2024-02-10T18:00:00Z",
  "category": "shopping"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6789012345",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, and fruits",
    "completed": false,
    "priority": "medium",
    "dueDate": "2024-02-10T18:00:00.000Z",
    "category": "shopping",
    "createdAt": "2024-02-08T10:30:00.000Z",
    "updatedAt": "2024-02-08T10:30:00.000Z"
  }
}
```

### Filtering Todos

**Request:**
```http
GET /api/todos?completed=false&priority=high&sort=dueDate&order=asc
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6789012346",
      "title": "Submit project proposal",
      "description": "Final project proposal due tomorrow",
      "completed": false,
      "priority": "high",
      "dueDate": "2024-02-09T17:00:00.000Z",
      "category": "work",
      "createdAt": "2024-02-08T09:00:00.000Z",
      "updatedAt": "2024-02-08T09:00:00.000Z"
    }
  ]
}
```

### Updating a Todo (PATCH)

**Request:**
```http
PATCH /api/todos/65a1b2c3d4e5f6789012345
Content-Type: application/json

{
  "priority": "high",
  "dueDate": "2024-02-09T17:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6789012345",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, and fruits",
    "completed": false,
    "priority": "high",
    "dueDate": "2024-02-09T17:00:00.000Z",
    "category": "shopping",
    "createdAt": "2024-02-08T10:30:00.000Z",
    "updatedAt": "2024-02-08T15:45:00.000Z"
  }
}
```

## Error Handling

### Common Error Responses

#### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Title is required",
  "details": {
    "field": "title",
    "value": "",
    "reason": "Title cannot be empty"
  }
}
```

#### 400 Bad Request - Invalid ObjectId
```json
{
  "success": false,
  "error": "Invalid ID",
  "message": "Invalid todo ID format"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": "Todo not found",
  "message": "No todo found with ID: 65a1b2c3d4e5f6789012345"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Something went wrong on our end"
}
```

## Validation Rules

### Input Validation
- **Title**: Required, non-empty string, max 100 characters, trimmed
- **Description**: Optional string, max 500 characters, trimmed
- **Priority**: Must be one of: 'low', 'medium', 'high' (case-sensitive)
- **DueDate**: Must be a valid ISO date string, cannot be in the past
- **Category**: Optional string, max 50 characters, trimmed
- **Completed**: Must be boolean (true/false)
- **MongoDB ObjectId**: Must be valid 24-character hexadecimal string

### Business Rules
- New todos default to `completed: false` and `priority: "medium"`
- Default category is "general" if not specified
- Due dates are validated to ensure they're not in the past
- The `updatedAt` field is automatically updated on any modification
- Todos can exist without due dates or categories
- Priority levels are case-sensitive and must match exactly

## Project Structure

```
todo-api/
├── src/
│   ├── controllers/
│   │   └── todoController.js      # Route handlers and business logic
│   ├── models/
│   │   └── Todo.js                # Mongoose schema and model
│   ├── routes/
│   │   └── todoRoutes.js          # API route definitions
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handling
│   │   ├── validation.js          # Input validation middleware
│   │   └── auth.js                # Authentication (if needed)
│   ├── config/
│   │   └── database.js            # MongoDB connection setup
│   └── utils/
│       ├── helpers.js             # Utility functions
│       └── constants.js           # Application constants
├── tests/
│   ├── unit/
│   └── integration/
├── server.js                      # Main application entry point
├── package.json                   # Dependencies and scripts
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
└── README.md                     # Project documentation
```

## Key Implementation Features

### 1. **Complete CRUD Operations**
- Create, Read, Update, Delete functionality with proper HTTP methods
- Support for both full (PUT) and partial (PATCH) updates
- Proper HTTP status codes for all operations

### 2. **Advanced Filtering and Sorting**
- Filter by completion status, priority level, and category
- Sort by multiple fields (date, priority, title, etc.)
- Flexible query parameter parsing with defaults

### 3. **Comprehensive Data Validation**
- Server-side validation using Mongoose validators
- Custom validation for business rules (due dates, etc.)
- Detailed error messages for validation failures
- Input sanitization and trimming

### 4. **Professional Error Handling**
- Centralized error handling middleware
- Consistent error response format across all endpoints
- Appropriate HTTP status codes (400, 404, 500, etc.)
- Detailed error messages for debugging

### 5. **Consistent Response Formatting**
- Standardized API response structure with success/error flags
- Proper HTTP status codes for all scenarios
- Count information for list endpoints
- Clean JSON responses without unnecessary nesting

### 6. **Dashboard Statistics**
- Comprehensive statistics endpoint for dashboard functionality
- Breakdown by priority and category
- Completion rate calculations
- Overdue and upcoming task counts

## Learning Outcomes

This project teaches essential backend development skills:

- **REST API Design** - Proper HTTP methods, status codes, and endpoint structure
- **MongoDB Integration** - Database operations, schema design, and data modeling
- **Input Validation** - Server-side validation, sanitization, and error handling
- **Error Management** - Centralized error handling and user-friendly error messages
- **Code Organization** - Professional project structure and separation of concerns
- **API Documentation** - Creating comprehensive API documentation with examples

This implementation goes beyond basic CRUD operations to include advanced features like filtering, sorting, statistics, and comprehensive error handling, making it a professional-grade API suitable for production use.