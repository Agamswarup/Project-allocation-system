# Project Allocation System

Welcome to the Project Allocation System! This web application allows students to apply for projects by submitting their resumes, and faculty members to post and review project applications.

## Tech Stack

- **MongoDB**: For database management
- **Express**: For handling server-side operations
- **React**: For building the user interface
- **Node.js**: For server-side JavaScript runtime
- **EmailJS**: For email-based services

## Features

- **Student Portal**:

  - Submit resume and apply for projects
  - View available projects that have not been allocated to anyone

- **Faculty Portal**:
  - Post new projects
  - Review student applications
  - Select suitable candidates for project

## Installation

### Method 1: Using Separate Terminals

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/project-allocation-system.git
   ```

2. **Navigate to the project directory**:

   ```sh
   cd project-allocation-system
   ```

3. **Backend Setup**:

   - Open a terminal and navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the server using `nodemon`:
     ```sh
     nodemon server.js
     ```

4. **Frontend Setup**:

   - Open another terminal and navigate to the `frontend` directory:
     ```sh
     cd frontend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the development server:
     ```sh
     npm run dev
     ```

5. **Set up your environment variables**:

   - Create a `.env` file in the `backend` directory.
   - Add the following variables to your `.env` file, replacing the placeholders with your actual values:
     ```env
     CLOUDINARY_CLIENT_NAME=<YOUR_CLOUDINARY_CLIENT_NAME>
     CLOUDINARY_CLIENT_API=<YOUR_CLOUDINARY_CLIENT_API>
     CLOUDINARY_CLIENT_SECRET=<YOUR_CLOUDINARY_CLIENT_SECRET>
     FRONTEND_URL=http://localhost:5173
     EMAILJS_USER_ID=your-emailjs-user-id
     EMAILJS_SERVICE_ID=your-emailjs-service-id
     EMAILJS_TEMPLATE_ID_1=your-1st-emailjs-template-id
     EMAILJS_TEMPLATE_ID_2=your-2nd-emailjs-template-id
     MONGO_URL=<Your MongoDb Url>
     JWT_SECRET_KEY="Your_jwt_secret_key"
     ```

6. **Open your browser and go to**:
   ```
   http://localhost:5173
   ```

### Method 2: Using `git clone`

1. **Clone the repository**:

2. **Navigate to the project directory**:

   ```sh
   cd project-allocation-system
   ```

3. **Backend and Frontend Setup**:

   - Install backend dependencies:
     ```sh
     cd backend
     npm install
     ```
   - Install frontend dependencies:
     ```sh
     cd ../frontend
     npm install
     ```

4. **Set up your environment variables**:

   - Create a `.env` file in the `backend` directory.
   - Add the following variables to your `.env` file, replacing the placeholders with your actual values:
     ```env
     CLOUDINARY_CLIENT_NAME=<YOUR_CLOUDINARY_CLIENT_NAME>
     CLOUDINARY_CLIENT_API=<YOUR_CLOUDINARY_CLIENT_API>
     CLOUDINARY_CLIENT_SECRET=<YOUR_CLOUDINARY_CLIENT_SECRET>
     FRONTEND_URL=http://localhost:5173
     EMAILJS_USER_ID=your-emailjs-user-id
     EMAILJS_SERVICE_ID=your-emailjs-service-id
     EMAILJS_TEMPLATE_ID_1=your-1st-emailjs-template-id
     EMAILJS_TEMPLATE_ID_2=your-2nd-emailjs-template-id
     MONGO_URL=<Your MongoDb Url>
     JWT_SECRET_KEY="Your_jwt_secret_key"
     ```

5. **Run the development servers**:

   - In the `backend` directory:
     ```sh
     nodemon server.js
     ```
   - In the `frontend` directory:
     ```sh
     npm run dev
     ```

6. **Open your browser and go to**:
   ```
   http://localhost:5173
   ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## Contact

For any inquiries, please contact us at [21uec076@lnmiit.ac.in](mailto:21uec076@lnmiit.ac.in).
