# Contact Management API

A comprehensive RESTful API for managing personal and professional contacts with user authentication, advanced search capabilities, and organizational features.

## 🚀 Project Overview

This contact management system allows users to store, organize, and efficiently retrieve contact information with proper security measures. Built with Node.js, Express.js, and MongoDB, it provides a robust backend solution for contact management applications.

## 🛠 Technologies

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Rate Limiting**: express-rate-limit
- **Validation**: Custom middleware and Mongoose validators

## 📋 Learning Objectives

- User authentication and authorization with JWT
- Password hashing and security best practices
- Text search implementation in MongoDB
- Rate limiting and API security measures
- Middleware chaining and error handling
- RESTful API design principles

## ⏱ Estimated Completion Time

**3-4 weeks** (depending on experience level and additional features implemented)

## 🗄 Database Models

### User Model
```javascript
{
  _id: ObjectId,
  username: String (unique, required, 3-50 characters),
  email: String (unique, required, valid email format),
  password: String (required, hashed with bcrypt),
  firstName: String (required),
  lastName: String (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated),
  isActive: Boolean (default: true),
  lastLogin: Date
}
```

### Contact Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  firstName: String (required),
  lastName: String (required),
  email: String (optional, valid email format),
  phone: String (optional),
  company: String (optional),
  jobTitle: String (optional),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  birthday: Date (optional),
  notes: String (optional, max 1000 characters),
  tags: [String] (for categorization),
  groups: [ObjectId] (references to Group model),
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  isFavorite: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

### Group Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  name: String (required, unique per user),
  description: String (optional),
  color: String (hex color code for UI),
  createdAt: Date (auto-generated),
  contactCount: Number (virtual field or calculated)
}
```

## 🛣 API Routes

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | User registration |
| POST | `/login` | User login |
| POST | `/logout` | User logout |
| POST | `/refresh-token` | Refresh JWT token |
| GET | `/profile` | Get current user profile |
| PUT | `/profile` | Update user profile |
| PUT | `/change-password` | Change user password |

### Contact Routes (`/api/contacts`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all contacts (paginated, sorted, filtered) |
| POST | `/` | Create new contact |
| GET | `/:id` | Get specific contact by ID |
| PUT | `/:id` | Update contact by ID |
| DELETE | `/:id` | Delete contact by ID |
| GET | `/search` | Search contacts by name, email, phone, company |
| GET | `/favorites` | Get favorite contacts |
| PUT | `/:id/favorite` | Toggle favorite status |
| GET | `/birthday-reminders` | Get contacts with upcoming birthdays |
| POST | `/bulk-import` | Import multiple contacts (CSV/JSON) |
| GET | `/export` | Export contacts to CSV/JSON |

### Group Routes (`/api/groups`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all groups for authenticated user |
| POST | `/` | Create new group |
| GET | `/:id` | Get specific group with contacts |
| PUT | `/:id` | Update group details |
| DELETE | `/:id` | Delete group |
| POST | `/:id/contacts` | Add contacts to group |
| DELETE | `/:id/contacts/:contactId` | Remove contact from group |

### Tag Routes (`/api/tags`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all unique tags for user |
| GET | `/:tag/contacts` | Get contacts by specific tag |
| PUT | `/contacts/:id/tags` | Update tags for a contact |

## 🔒 Security Features

### Password Security
- bcrypt hashing with salt rounds (minimum 12)
- Password strength requirements
- Secure password change functionality

### JWT Implementation
- Access tokens (short-lived, 15-30 minutes)
- Refresh tokens (longer-lived, 7-30 days)
- Token blacklisting for logout functionality

### Data Protection
- User data isolation (users can only access their own contacts)
- Input sanitization and validation
- Protection against injection attacks
- XSS protection headers

## 🔍 Search Functionality

### Text Search Capabilities
- Full-text search across name, email, company, job title
- Partial matching for names and companies
- Case-insensitive search
- MongoDB text indexes on searchable fields

### Advanced Filtering
- Filter by groups
- Filter by tags
- Filter by favorite status
- Filter by date ranges (created, updated, birthday)
- Combine multiple filters

### Sorting Options
- Sort by name (first/last)
- Sort by creation date
- Sort by last updated
- Sort by company name

## 🛡 Middleware Requirements

### Authentication Middleware
- JWT token verification
- User session validation
- Route protection for authenticated endpoints

### Validation Middleware
- Input validation for all POST/PUT requests
- Email format validation
- Phone number format validation
- Required field validation

### Rate Limiting Middleware
- General API rate limiting (100 requests per 15 minutes)
- Authentication route limiting (5 login attempts per 15 minutes)
- Search endpoint limiting (50 requests per 15 minutes)

### Error Handling Middleware
- Global error handler
- 404 route handler
- Validation error formatter
- Database error handler

## 📊 API Response Formats

### Success Response Structure
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": [...]
  }
}
```

## 📄 Pagination

- Default limit of 20 contacts per page
- Maximum limit of 100 contacts per page
- Offset-based pagination with page/limit parameters
- Total count included in response metadata

## ✅ Data Validation Rules

- Email uniqueness within user's contacts
- Phone number format validation
- Name length restrictions (2-50 characters)
- Tag name restrictions (no special characters, max 20 characters)
- Required field validation for core contact information

## ⚡ Performance Optimizations

- Database indexes on frequently queried fields
- Aggregation pipelines for complex queries
- Contact count caching for groups
- Efficient pagination implementation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or cloud service)
- npm or yarn package manager

### Installation Steps
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Configure MongoDB connection
5. Run database migrations/setup
6. Start the development server: `npm run dev`

### Environment Variables
Create a `.env` file with the following variables:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
BCRYPT_SALT_ROUNDS=12
```

## 📝 Development Roadmap

### Phase 1: Foundation (Week 1)
- Set up project structure
- Implement User model and authentication
- Create basic middleware (auth, validation, error handling)

### Phase 2: Core Features (Week 2)
- Implement Contact CRUD operations
- Add search functionality
- Implement pagination and filtering

### Phase 3: Advanced Features (Week 3)
- Add Group and Tag models
- Implement advanced search and filtering
- Add bulk operations (import/export)

### Phase 4: Enhancement (Week 4)
- Optimize performance
- Add comprehensive testing
- Implement additional security measures
- Documentation and deployment preparation

## 🧪 Testing Strategy

- Unit tests for models and utilities
- Integration tests for API endpoints
- Authentication and authorization testing
- Performance testing for search operations
- Error handling and edge case testing

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [API Security Best Practices](https://owasp.org/www-project-api-security/)

## 🤝 Contributing

This is a learning project. Focus on implementing features incrementally and understanding each component thoroughly before moving to the next phase.

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed for learning.

---

**Happy Coding! 🚀**