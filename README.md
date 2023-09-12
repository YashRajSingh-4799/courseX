

# CourseX (Course Selling Web App)
![Demo](./screencapture.png)
## Overview

This is a course selling web application developed using the MERN (MongoDB, Express.js, React, Node.js) stack and styled with TailwindCSS. The project allows instructors to create and manage courses, while students can browse and purchase courses.



## Features

- User Authentication: User registration and login.
- Role-based Access: Instructors and students have different access levels.
- Course Management: Instructors can create, edit, and delete courses.
- Course Purchasing: Students can browse and purchase courses.
- Payment Integration: Integration with a payment gateway for course purchases.
- User Profiles: Users can update their profiles.
- Search and Filtering: Users can search for courses and filter by category or other criteria.

## Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/YashRajSingh-4799/courseX.git
   cd courseX
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   # For the frontend (inside the client directory)
   cd client
   npm install

   # For the backend (inside the server directory)
   cd ../server
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the `server` directory and set up your environment variables, including database connection strings and API keys.

4. Start the development servers:

   ```bash
   # Start the backend server (in the server directory)
   npm start

   # Start the frontend development server (in the client directory)
   cd ../client
   npm run dev
   ```

5. Open your browser and access the application at `http://localhost:5173`.

## Contributing

Contributions are welcome! Feel free to submit bug reports or pull requests. For major changes, please open an issue first to discuss the proposed changes.







