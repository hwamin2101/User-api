# User API 🚀

Simple REST API for managing users with **Node.js**, **Express**, and **MongoDB**.

## Features
- CRUD users (Create, Read, Update, Delete)
- MongoDB connection with Mongoose
- JSON request/response
- Config via `.env`
- ESLint & Prettier for code style


## API Endpoints

* `GET /api/users` – Get all users
* `POST /api/users` – Create user
* `GET /api/users/:id` – Get user by ID
* `PUT /api/users/:id` – Update user
* `DELETE /api/users/:id` – Delete user

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
