# SCATCH - Online Premium Bag Store

## Table of Contents
- Introduction
- Features
- Technologies Used
- Installation
- Usage
- Admin Panel
- Authentication & Authorization
- Flash Messages
- Contributing

## Introduction
SCATCH is an online premium bag store built using Node.js, MongoDB, EJS, and Express. It offers a seamless shopping experience with features like user authentication, product management, and a user-friendly cart system.

## Features
- User registration and login with JWT authentication.
- Password hashing using bcrypt for enhanced security.
- Admin panel for managing products.
- Users can add products to their cart and view their cart.
- Flash messages for displaying success and error notifications.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **EJS**: Templating engine for rendering HTML.
- **jsonwebtoken**: For handling authentication.
- **bcrypt**: For hashing passwords.
- **connect-flash**: For flash messages.

## Installation
### Clone the repository:
```bash
git clone https://github.com/yourusername/SCATCH.git
```
## Navigate to the project directory:
```bash
cd SCATCH
```
## Install dependencies:
```bash
npm install
```
## Set up environment variables:
```bash
Create a .env file in the root directory.
```
## Add the following variables:
```bash
MONGODB_URI=your_mongodb_uri
JWT_KEY=your_jwt_secret
```

## Usage
## Start the application:
```bash
npm start
```
or
```bash
nodemon
```
Open your browser and navigate to 
```bash
http://localhost:3000
```

## Admin Panel
- Only accessible by admin users.
- Admins can create, update, and delete products.
- Admins cannot add items to the cart or view the cart.

## Authentication & Authorization
- User authentication is handled using JSON Web Tokens (JWT).
- Passwords are hashed using bcrypt for security.
- Admin routes are protected and can only be accessed by users with admin privileges.

## Flash Messages
- Flash messages are used to display success and error notifications to users.
- Example: If an admin tries to access the cart, a flash message will notify them that they cannot have a cart.

## Contributing
- Contributions are welcome! Please fork the repository and submit a pull request.
