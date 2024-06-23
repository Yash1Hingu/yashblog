# Blogging Web Application

Welcome to the Blogging Web Application repository! This application allows users to create, read, update, and delete blogs, comment on posts, like posts, view user profiles, and share blogs on social media.

## Live Demo

Check out the live version of the application [here](https://yashblog.vercel.app/).

## Features

- **User Authentication**: Register and login securely.
- **Blog Management**: Create, read, update, and delete blog posts.
- **User Profiles**: View profiles of users including their blogs.
- **Social Sharing**: Share blogs on social media platforms.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS, Bootstrap

## Installation

To run this application locally, follow these steps:

1. Clone the repository
    ```bash
    git clone https://github.com/Yash1Hingu/yashblog.git
    cd yashblog
    ```

2. Install the dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables
    ```
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the application
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.

## Routes and Features

### React Router Routes

#### 1. **Public Routes**
- `/` - Homepage displaying all blog posts.
- `/login` - Login page for existing users.
- `/register` - Registration page for new users.

#### 2. **Authenticated Routes**
- `/home` - User home after successful login.
- `/create` - Form to create a new blog post.
- `/post/:id` - View a single blog post.
- `/user/:id` - View user profile by ID.
- `/edit/:id` - Edit an existing blog post.

### Routes and Features

#### User Routes

- **POST /register**
  - Register a new user with username, email, password, and profile image.
- **POST /login**
  - Login with username and password.
- **GET /profile**
  - Retrieve user profile information.
- **POST /logout**
  - Logout the user.

#### Blog Routes

- **POST /post**
  - Create a new blog post with title, summary, content, and cover image.
- **GET /post**
  - Get all blog posts.
- **GET /userposts/:id**
  - Get blog posts by a specific user.
- **GET /post/:id**
  - Get a single blog post by ID.
- **PUT /post**
  - Update a blog post.
- **DELETE /delete/:id**
  - Delete a blog post by ID.

#### User Profile Route

- **GET /user/:id**
  - Get user profile by ID.

## Usage

1. Register a new account or login with an existing account.
2. Create a new blog post by clicking on the "Create Blog" button.
3. View blog posts on the homepage and click on a post to read it in detail.
4. Add comments and like posts.
5. Visit user profiles to see their posts and information.
6. Share interesting blog posts on your social media accounts.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, feel free to contact me at yash23hingu@gmail.com.

---

Thank you for visiting the Blogging Web Application repository!
